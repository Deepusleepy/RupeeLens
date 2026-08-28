import type { Transaction } from "./labs";

const LOCATIONS = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Unknown", "Foreign"];
const TYPES = ["P2P", "P2M", "Bill payment", "Recharge", "Online shopping"];
const BANKS = ["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB", "BOB"];

export const FEATURE_DIM = 34;
export const FEATURE_GROUPS = [
  { label: "Transaction amount", start: 0, end: 1 },
  { label: "Hour of day", start: 1, end: 3 },
  { label: "Location", start: 3, end: 13 },
  { label: "Transaction type", start: 13, end: 18 },
  { label: "Sender bank", start: 18, end: 25 },
  { label: "Receiver bank", start: 25, end: 32 },
  { label: "New device", start: 32, end: 33 },
  { label: "Failed attempts", start: 33, end: 34 },
];

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => ((value = Math.imul(1664525, value) + 1013904223 >>> 0) / 4294967296);
}

function oneHot(value: string, options: string[], offset: number, out: Float64Array) {
  const index = options.indexOf(value);
  if (index >= 0) out[offset + index] = 1;
}

export function encodeFeatures(txn: Pick<Transaction, "amount" | "hour" | "location" | "type" | "senderBank" | "receiverBank" | "newDevice" | "failedAttempts">): Float64Array {
  const out = new Float64Array(FEATURE_DIM);
  out[0] = Math.log1p(txn.amount) / Math.log1p(200000);
  out[1] = Math.sin(2 * Math.PI * txn.hour / 24);
  out[2] = Math.cos(2 * Math.PI * txn.hour / 24);
  oneHot(txn.location, LOCATIONS, 3, out);
  oneHot(txn.type, TYPES, 13, out);
  oneHot(txn.senderBank, BANKS, 18, out);
  oneHot(txn.receiverBank, BANKS, 25, out);
  out[32] = txn.newDevice ? 1 : 0;
  out[33] = Math.min(10, Math.max(0, txn.failedAttempts)) / 10;
  return out;
}

export function splitTrainTest<T>(items: T[], seed = 42): { train: T[]; test: T[] } {
  const random = seeded(seed);
  const indices = items.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const split = Math.floor(indices.length * 0.8);
  return { train: indices.slice(0, split).map((i) => items[i]), test: indices.slice(split).map((i) => items[i]) };
}

function sigmoid(z: number): number {
  if (z >= 0) return 1 / (1 + Math.exp(-z));
  const e = Math.exp(z);
  return e / (1 + e);
}

export type LogisticModel = { w: Float64Array; b: number; predict: (features: Float64Array) => number; lossHistory: number[] };

export function trainLogistic(features: Float64Array[], labels: number[], lr = 0.1, epochs = 400, l2 = 0.001): LogisticModel {
  const n = features.length;
  const d = features[0].length;
  const w = new Float64Array(d);
  let b = 0;
  const lossHistory: number[] = [];
  let prevLoss = Infinity;
  for (let epoch = 0; epoch < epochs; epoch++) {
    const gradW = new Float64Array(d);
    let gradB = 0;
    let loss = 0;
    for (let i = 0; i < n; i++) {
      const x = features[i];
      let z = b;
      for (let j = 0; j < d; j++) z += w[j] * x[j];
      const p = sigmoid(z);
      const err = p - labels[i];
      for (let j = 0; j < d; j++) gradW[j] += err * x[j];
      gradB += err;
      loss += labels[i] === 1 ? -Math.log(p + 1e-12) : -Math.log(1 - p + 1e-12);
    }
    for (let j = 0; j < d; j++) {
      gradW[j] = (gradW[j] + l2 * w[j]) / n;
      w[j] -= lr * gradW[j];
    }
    b -= lr * (gradB / n);
    loss = loss / n + 0.5 * l2 * w.reduce((s, v) => s + v * v, 0);
    lossHistory.push(loss);
    if (epoch > 10 && Math.abs(prevLoss - loss) < 1e-6) break;
    prevLoss = loss;
  }
  return { w, b, predict: (x: Float64Array) => { let z = b; for (let j = 0; j < d; j++) z += w[j] * x[j]; return sigmoid(z); }, lossHistory };
}

type TreeNode = { leaf: boolean; prediction?: number; feature?: number; threshold?: number; left?: TreeNode; right?: TreeNode };

function gini(labels: number[]): number {
  if (!labels.length) return 0;
  let pos = 0;
  for (const l of labels) if (l === 1) pos++;
  const p = pos / labels.length;
  return 1 - p * p - (1 - p) * (1 - p);
}

function quantiles(values: number[], count: number): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  const out: number[] = [];
  for (let i = 1; i <= count; i++) {
    const idx = Math.floor((i / (count + 1)) * (sorted.length - 1));
    out.push(sorted[idx]);
  }
  return [...new Set(out)];
}

function buildTree(features: Float64Array[], labels: number[], depth: number, maxDepth: number, featureCount: number, thresholdCount: number, random: () => number, importance: Float64Array): TreeNode {
  const pos = labels.filter((l) => l === 1).length;
  const prediction = pos / labels.length;
  if (depth >= maxDepth || labels.length < 4 || pos === 0 || pos === labels.length) return { leaf: true, prediction };
  const allFeatures = features[0].length;
  const candidates: number[] = [];
  const used = new Set<number>();
  while (candidates.length < Math.min(featureCount, allFeatures) && candidates.length < allFeatures) {
    const f = Math.floor(random() * allFeatures);
    if (!used.has(f)) { used.add(f); candidates.push(f); }
  }
  let bestGini = gini(labels);
  let bestFeature = -1;
  let bestThreshold = 0;
  let bestLeft: number[] = [];
  let bestRight: number[] = [];
  for (const f of candidates) {
    const values = features.map((x) => x[f]);
    const thresholds = quantiles(values, thresholdCount);
    for (const thr of thresholds) {
      const left: number[] = [];
      const right: number[] = [];
      for (let i = 0; i < features.length; i++) {
        if (features[i][f] <= thr) left.push(i); else right.push(i);
      }
      if (!left.length || !right.length) continue;
      const leftLabels = left.map((i) => labels[i]);
      const rightLabels = right.map((i) => labels[i]);
      const weighted = (left.length * gini(leftLabels) + right.length * gini(rightLabels)) / labels.length;
      if (weighted < bestGini) {
        bestGini = weighted;
        bestFeature = f;
        bestThreshold = thr;
        bestLeft = left;
        bestRight = right;
      }
    }
  }
  if (bestFeature === -1) return { leaf: true, prediction };
  const parentGini = gini(labels);
  const decrease = parentGini - bestGini;
  importance[bestFeature] += decrease * labels.length;
  const leftTree = buildTree(bestLeft.map((i) => features[i]), bestLeft.map((i) => labels[i]), depth + 1, maxDepth, featureCount, thresholdCount, random, importance);
  const rightTree = buildTree(bestRight.map((i) => features[i]), bestRight.map((i) => labels[i]), depth + 1, maxDepth, featureCount, thresholdCount, random, importance);
  return { leaf: false, feature: bestFeature, threshold: bestThreshold, left: leftTree, right: rightTree };
}

function predictTree(node: TreeNode, x: Float64Array): number {
  if (node.leaf) return node.prediction ?? 0;
  if (x[node.feature!] <= node.threshold!) return predictTree(node.left!, x);
  return predictTree(node.right!, x);
}

export type ForestModel = { trees: TreeNode[]; predict: (features: Float64Array) => number; importance: Float64Array };

export function trainForest(features: Float64Array[], labels: number[], seed = 42, trees = 8, maxDepth = 4, featureCount = 6, thresholdCount = 8): ForestModel {
  const random = seeded(seed);
  const n = features.length;
  const treeList: TreeNode[] = [];
  const importance = new Float64Array(features[0].length);
  for (let t = 0; t < trees; t++) {
    const sampleFeatures: Float64Array[] = [];
    const sampleLabels: number[] = [];
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(random() * n);
      sampleFeatures.push(features[idx]);
      sampleLabels.push(labels[idx]);
    }
    treeList.push(buildTree(sampleFeatures, sampleLabels, 0, maxDepth, featureCount, thresholdCount, random, importance));
  }
  return { trees: treeList, predict: (x: Float64Array) => { let sum = 0; for (const tree of treeList) sum += predictTree(tree, x); return sum / treeList.length; }, importance };
}

export type Metrics = {
  accuracy: number; precision: number; recall: number; f1: number; auc: number;
  matrix: [[number, number], [number, number]]; rocPoints: { fpr: number; tpr: number }[];
};

export function computeMetrics(probabilities: number[], labels: number[], threshold = 0.5): Metrics {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (let i = 0; i < labels.length; i++) {
    const pred = probabilities[i] >= threshold ? 1 : 0;
    if (pred === 1 && labels[i] === 1) tp++;
    else if (pred === 1 && labels[i] === 0) fp++;
    else if (pred === 0 && labels[i] === 1) fn++;
    else tn++;
  }
  const accuracy = (tp + tn) / labels.length;
  const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  const f1 = precision + recall > 0 ? 2 * precision * recall / (precision + recall) : 0;
  const indexed = probabilities.map((p, i) => ({ p, label: labels[i] })).sort((a, b) => b.p - a.p);
  const totalPos = labels.filter((l) => l === 1).length;
  const totalNeg = labels.length - totalPos;
  let cumTp = 0, cumFp = 0;
  const rocPoints: { fpr: number; tpr: number }[] = [{ fpr: 0, tpr: 0 }];
  for (const { label } of indexed) {
    if (label === 1) cumTp++; else cumFp++;
    rocPoints.push({ fpr: cumFp / Math.max(1, totalNeg), tpr: cumTp / Math.max(1, totalPos) });
  }
  let auc = 0;
  for (let i = 1; i < rocPoints.length; i++) {
    auc += (rocPoints[i].fpr - rocPoints[i - 1].fpr) * (rocPoints[i].tpr + rocPoints[i - 1].tpr) / 2;
  }
  return { accuracy, precision, recall, f1, auc, matrix: [[tn, fp], [fn, tp]], rocPoints };
}

export function aggregateImportance(raw: Float64Array): { label: string; value: number }[] {
  const grouped = FEATURE_GROUPS.map((g) => {
    let sum = 0;
    for (let i = g.start; i < g.end; i++) sum += raw[i];
    return { label: g.label, value: sum };
  });
  const total = grouped.reduce((s, g) => s + g.value, 0) || 1;
  return grouped.map((g) => ({ label: g.label, value: g.value / total * 100 }));
}

export type ModelResult = { metrics: Metrics; predict: (input: Pick<Transaction, "amount" | "hour" | "location" | "type" | "senderBank" | "receiverBank" | "newDevice" | "failedAttempts">) => number; featureImportance: { label: string; value: number }[] };
export type TrainedModels = { logistic: ModelResult; forest: ModelResult };

export function trainModels(transactions: Transaction[], seed = 42): TrainedModels {
  const { train, test } = splitTrainTest(transactions, seed);
  const trainFeatures = train.map((t) => encodeFeatures(t));
  const trainLabels = train.map((t) => (t.fraud ? 1 : 0));
  const testFeatures = test.map((t) => encodeFeatures(t));
  const testLabels = test.map((t) => (t.fraud ? 1 : 0));
  const logistic = trainLogistic(trainFeatures, trainLabels);
  const forest = trainForest(trainFeatures, trainLabels, seed);
  const logisticProbs = testFeatures.map((x) => logistic.predict(x));
  const forestProbs = testFeatures.map((x) => forest.predict(x));
  const logisticMetrics = computeMetrics(logisticProbs, testLabels);
  const forestMetrics = computeMetrics(forestProbs, testLabels);
  const logisticImportance = aggregateImportance(logistic.w.map((v) => Math.abs(v)));
  const forestImportance = aggregateImportance(forest.importance);
  return {
    logistic: { metrics: logisticMetrics, predict: (input) => logistic.predict(encodeFeatures(input)), featureImportance: logisticImportance },
    forest: { metrics: forestMetrics, predict: (input) => forest.predict(encodeFeatures(input)), featureImportance: forestImportance },
  };
}

export function scoreWithModels(transactions: Transaction[], models: TrainedModels): Transaction[] {
  return transactions.map((t) => {
    const l = models.logistic.predict(t);
    const f = models.forest.predict(t);
    const score = Math.round((l + f) / 2 * 99);
    const risk: Transaction["risk"] = score >= 60 ? "HIGH" : score >= 30 ? "MEDIUM" : "LOW";
    return { ...t, logisticScore: Math.round(l * 99), forestScore: Math.round(f * 99), score, risk };
  });
}
