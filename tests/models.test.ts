import { test } from "node:test";
import assert from "node:assert/strict";
import { encodeFeatures, FEATURE_DIM, trainLogistic, trainForest, computeMetrics, trainModels, scoreWithModels } from "../lib/models.ts";
import { generateTransactions } from "../lib/labs.ts";

test("encodeFeatures returns Float64Array of FEATURE_DIM with correct one-hot", () => {
  const features = encodeFeatures({ amount: 5000, hour: 14, location: "Mumbai", type: "P2P", senderBank: "SBI", receiverBank: "HDFC", newDevice: true, failedAttempts: 2 });
  assert.ok(features instanceof Float64Array);
  assert.equal(features.length, FEATURE_DIM);
  assert.equal(features[3], 1, "Mumbai one-hot at index 3");
  assert.equal(features[13], 1, "P2P one-hot at index 13");
  assert.equal(features[18], 1, "SBI one-hot at index 18");
  assert.equal(features[26]!, 1, "HDFC one-hot at index 26");
  assert.equal(features[32]!, 1, "newDevice at index 32");
  assert.ok(features[0]! > 0, "amount log-normalized > 0");
});

test("logistic regression converges (loss decreases)", () => {
  const features = Array.from({ length: 200 }, (_, i) => {
    const f = new Float64Array(4);
    f[0] = i < 100 ? 0.1 : 0.9;
    f[1] = i < 100 ? 0.2 : 0.8;
    f[2] = i < 100 ? 0 : 1;
    f[3] = i < 100 ? 0 : 1;
    return f;
  });
  const labels = Array.from({ length: 200 }, (_, i) => (i < 100 ? 0 : 1));
  const model = trainLogistic(features, labels, 0.5, 100);
  assert.ok(model.lossHistory.length >= 2);
  assert.ok(model.lossHistory[model.lossHistory.length - 1]! < model.lossHistory[0]!, "final loss should be less than initial");
});

test("decision tree splits on correct feature", () => {
  const features = Array.from({ length: 100 }, (_, i) => {
    const f = new Float64Array(3);
    f[0] = i % 2;
    f[1] = Math.random();
    f[2] = i;
    return f;
  });
  const labels = features.map((f) => (f[0]! > 0.5 ? 1 : 0));
  const forest = trainForest(features, labels, 42, 1, 1, 1, 2);
  assert.ok(forest.importance[0]! > 0, "feature 0 should have importance");
  assert.ok(forest.importance[0]! > forest.importance[1]!, "feature 0 more important than feature 1");
});

test("computeMetrics matches manual calc on 10-row set", () => {
  const probs = [0.9, 0.8, 0.7, 0.6, 0.4, 0.3, 0.2, 0.1, 0.05, 0.01];
  const labels = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
  const m = computeMetrics(probs, labels, 0.5);
  assert.equal(m.matrix[0][0], 6, "true negatives");
  assert.equal(m.matrix[0][1], 0, "false positives");
  assert.equal(m.matrix[1][0], 0, "false negatives");
  assert.equal(m.matrix[1][1], 4, "true positives");
  assert.equal(m.accuracy, 1);
  assert.equal(m.precision, 1);
  assert.equal(m.recall, 1);
  assert.equal(m.f1, 1);
  assert.ok(m.auc > 0.99, "AUC should be ~1 for perfect separation");
  assert.ok(m.rocPoints.length >= 2);
});

test("generator noise: trainModels on 2000 txns, AUC in realistic range", () => {
  const txns = generateTransactions(2000, 10, 42);
  const models = trainModels(txns, 42);
  const logisticAuc = models.logistic.metrics.auc;
  const forestAuc = models.forest.metrics.auc;
  assert.ok(logisticAuc < 0.99, `logistic AUC ${logisticAuc} should be < 0.99 (not perfectly separable)`);
  assert.ok(logisticAuc > 0.7, `logistic AUC ${logisticAuc} should be > 0.7`);
  assert.ok(forestAuc < 0.99, `forest AUC ${forestAuc} should be < 0.99 (not perfectly separable)`);
  assert.ok(forestAuc > 0.7, `forest AUC ${forestAuc} should be > 0.7`);
});

test("end-to-end: trainModels returns finite metrics, rocPoints, featureImportance", () => {
  const txns = generateTransactions(500, 10, 7);
  const models = trainModels(txns, 7);
  for (const key of ["logistic", "forest"] as const) {
    const m = models[key].metrics;
    assert.ok(Number.isFinite(m.accuracy));
    assert.ok(Number.isFinite(m.precision));
    assert.ok(Number.isFinite(m.recall));
    assert.ok(Number.isFinite(m.f1));
    assert.ok(Number.isFinite(m.auc));
    assert.ok(m.rocPoints.length >= 2, `${key} rocPoints length >= 2`);
    assert.equal(models[key].featureImportance.length, 8, `${key} featureImportance has 8 groups`);
  }
});

test("scoreWithModels updates transaction scores", () => {
  const txns = generateTransactions(200, 10, 11);
  const models = trainModels(txns, 11);
  const scored = scoreWithModels(txns, models);
  assert.equal(scored.length, txns.length);
  for (const t of scored) {
    assert.ok(Number.isFinite(t.logisticScore));
    assert.ok(Number.isFinite(t.forestScore));
    assert.ok(Number.isFinite(t.score));
    assert.ok(["LOW", "MEDIUM", "HIGH"].includes(t.risk));
  }
  const changed = scored.filter((t, i) => t.score !== txns[i]!.score);
  assert.ok(changed.length > 0, "at least some scores should change from 0");
});
