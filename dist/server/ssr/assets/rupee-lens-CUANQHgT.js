import { i as __toESM, t as require_react } from "./react-DX6OWF7o.js";
import { t as require_jsx_runtime } from "./jsx-runtime-GR0p6NjG.js";
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = (0, import_react.createContext)({});
var useLucideContext = () => (0, import_react.useContext)(LucideContext);
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
	return (0, import_react.createElement)("svg", {
		ref,
		...defaultAttributes,
		width: size ?? contextSize ?? defaultAttributes.width,
		height: size ?? contextSize ?? defaultAttributes.height,
		stroke: color ?? contextColor,
		strokeWidth: calculatedStrokeWidth,
		className: mergeClasses("lucide", contextClass, className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowRight = createLucideIcon("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CodeXml = createLucideIcon("code-xml", [
	["path", {
		d: "m18 16 4-4-4-4",
		key: "1inbqp"
	}],
	["path", {
		d: "m6 8-4 4 4 4",
		key: "15zrgr"
	}],
	["path", {
		d: "m14.5 4-5 16",
		key: "e7oirm"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ExternalLink = createLucideIcon("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Gauge = createLucideIcon("gauge", [["path", {
	d: "m12 14 4-4",
	key: "9kzdfg"
}], ["path", {
	d: "M3.34 19a10 10 0 1 1 17.32 0",
	key: "19p75a"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Menu = createLucideIcon("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldCheck = createLucideIcon("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Download = createLucideIcon("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileUp = createLucideIcon("file-up", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M12 12v6",
		key: "3ahymv"
	}],
	["path", {
		d: "m15 15-3-3-3 3",
		key: "15xj92"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldAlert = createLucideIcon("shield-alert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]);
/**
* @license lucide-react v1.25.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sparkles = createLucideIcon("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]);
//#endregion
//#region lib/data.ts
var paymentEvents = [
	{
		id: "RL-91F2",
		timestamp: "2026-07-22T14:42:18+05:30",
		maskedVpa: "al•••@okaxis",
		type: "P2P",
		amount: 24999,
		score: 86,
		status: "held",
		city: "Bengaluru",
		signals: ["New device", "Velocity spike"]
	},
	{
		id: "RL-7C04",
		timestamp: "2026-07-22T14:40:53+05:30",
		maskedVpa: "me•••@ybl",
		type: "P2M",
		amount: 7850,
		score: 62,
		status: "review",
		city: "Mumbai",
		signals: ["Unusual hour"]
	},
	{
		id: "RL-31B9",
		timestamp: "2026-07-22T14:38:07+05:30",
		maskedVpa: "ra•••@ibl",
		type: "P2M",
		amount: 680,
		score: 18,
		status: "allowed",
		city: "Kochi",
		signals: ["Known pattern"]
	},
	{
		id: "RL-A117",
		timestamp: "2026-07-22T14:34:26+05:30",
		maskedVpa: "di•••@paytm",
		type: "P2P",
		amount: 12400,
		score: 74,
		status: "review",
		city: "Delhi",
		signals: ["New beneficiary", "Amount change"]
	},
	{
		id: "RL-911D",
		timestamp: "2026-07-22T14:31:44+05:30",
		maskedVpa: "sa•••@okhdfcbank",
		type: "P2M",
		amount: 349,
		score: 9,
		status: "allowed",
		city: "Pune",
		signals: ["Known pattern"]
	},
	{
		id: "RL-C092",
		timestamp: "2026-07-22T14:28:12+05:30",
		maskedVpa: "vi•••@oksbi",
		type: "P2P",
		amount: 46e3,
		score: 91,
		status: "held",
		city: "Hyderabad",
		signals: ["Impossible travel", "VPA mismatch"]
	},
	{
		id: "RL-48EE",
		timestamp: "2026-07-22T14:24:30+05:30",
		maskedVpa: "ne•••@upi",
		type: "P2M",
		amount: 2100,
		score: 27,
		status: "allowed",
		city: "Chennai",
		signals: ["Known merchant"]
	},
	{
		id: "RL-D63A",
		timestamp: "2026-07-22T14:20:11+05:30",
		maskedVpa: "ka•••@okicici",
		type: "P2P",
		amount: 18800,
		score: 56,
		status: "review",
		city: "Jaipur",
		signals: ["Repeated attempts"]
	}
];
var budgetSummary = [
	{
		label: "Total expenditure",
		value: 53.47315,
		unit: "₹ lakh crore",
		note: "BE 2026–27"
	},
	{
		label: "Capital expenditure",
		value: 12.21821,
		unit: "₹ lakh crore",
		note: "BE 2026–27"
	},
	{
		label: "Fiscal deficit",
		value: 4.3,
		unit: "% of GDP",
		note: "BE 2026–27"
	},
	{
		label: "Transfers to states",
		value: 25.43769,
		unit: "₹ lakh crore",
		note: "BE 2026–27"
	}
];
var rupeeGoesTo = [
	{
		label: "States’ share of taxes",
		paise: 22,
		tone: "green"
	},
	{
		label: "Interest payments",
		paise: 20,
		tone: "gold"
	},
	{
		label: "Central sector schemes",
		paise: 17,
		tone: "blue"
	},
	{
		label: "Defence",
		paise: 11,
		tone: "rust"
	},
	{
		label: "Centrally sponsored schemes",
		paise: 8,
		tone: "violet"
	},
	{
		label: "Finance Commission & transfers",
		paise: 7,
		tone: "teal"
	},
	{
		label: "Other expenditure",
		paise: 7,
		tone: "gray"
	},
	{
		label: "Major subsidies",
		paise: 6,
		tone: "amber"
	},
	{
		label: "Civil pensions",
		paise: 2,
		tone: "slate"
	}
];
var rupeeComesFrom = [
	{
		label: "Borrowings & liabilities",
		paise: 24
	},
	{
		label: "Income tax",
		paise: 21
	},
	{
		label: "Corporation tax",
		paise: 18
	},
	{
		label: "GST & other taxes",
		paise: 15
	},
	{
		label: "Non-tax revenue",
		paise: 10
	},
	{
		label: "Union excise duties",
		paise: 6
	},
	{
		label: "Customs",
		paise: 4
	},
	{
		label: "Non-debt capital receipts",
		paise: 2
	}
];
var budgetHistory = Object.entries({
	Agriculture: [
		29962.94,
		24909.78,
		44485.2,
		51026,
		57600,
		138563.97,
		142762.35,
		131531.19,
		132513.62,
		125035.79,
		132469.86
	],
	Defence: [
		311042,
		311042,
		311042,
		346716.77,
		385352.88,
		413544,
		436787,
		459474.71,
		500053,
		595320,
		621940.85
	],
	Finance: [
		165971.23,
		166211.79,
		166942,
		2127.9,
		2135,
		2246.83,
		2311.5,
		2353.26,
		2382,
		2272,
		1858158.52
	],
	"Home Affairs": [
		69694.99,
		70073.87,
		73993,
		80480,
		94e3,
		105300,
		114520.26,
		121637.38,
		123926,
		142350,
		219643.31
	],
	Health: [
		26357.67,
		27289.91,
		31618,
		47500,
		53406,
		62510,
		65036.06,
		71250,
		86620,
		92355,
		90958.63
	]
}).flatMap(([ministry, totals]) => totals.map((total, index) => ({
	ministry,
	year: 2014 + index,
	total
})));
//#endregion
//#region lib/labs.ts
var locations = [
	"Mumbai",
	"Delhi",
	"Bengaluru",
	"Hyderabad",
	"Chennai",
	"Kolkata",
	"Pune",
	"Ahmedabad"
];
var types = [
	"P2P",
	"P2M",
	"Bill payment",
	"Recharge",
	"Online shopping"
];
var banks = [
	"SBI",
	"HDFC",
	"ICICI",
	"Axis",
	"Kotak",
	"PNB",
	"BOB"
];
function seeded(seed) {
	let value = seed >>> 0;
	return () => (value = Math.imul(1664525, value) + 1013904223 >>> 0) / 4294967296;
}
function scoreTransaction(input) {
	const night = input.hour < 6 || input.hour >= 22;
	const unknown = input.location === "Unknown" || input.location === "Foreign";
	const rf = 4 + (input.amount > 25e3 ? 20 : input.amount > 1e4 ? 9 : 0) + (night ? 17 : 0) + (unknown ? 22 : 0) + (input.newDevice ? 25 : 0) + Math.min(18, input.failedAttempts * 6) + (input.senderBank !== input.receiverBank ? 4 : 0);
	const xgb = 3 + (input.amount > 5e4 ? 28 : input.amount > 15e3 ? 13 : 0) + (night ? 20 : 0) + (unknown ? 26 : 0) + (input.newDevice ? 21 : 0) + Math.min(20, input.failedAttempts * 7) + (input.type === "P2P" ? 4 : 0);
	const rfScore = Math.min(99, rf);
	const xgbScore = Math.min(99, xgb);
	const score = Math.round((rfScore + xgbScore) / 2);
	return {
		rfScore,
		xgbScore,
		score,
		risk: score >= 60 ? "HIGH" : score >= 30 ? "MEDIUM" : "LOW"
	};
}
function generateTransactions(count = 1e3, fraudPercent = 10, seed = 42) {
	const random = seeded(seed);
	return Array.from({ length: Math.min(5e4, Math.max(100, count)) }, (_, index) => {
		const fraud = random() < fraudPercent / 100;
		const input = {
			amount: Math.round((fraud ? 500 + Math.pow(random(), .35) * 199500 : 10 + Math.pow(random(), 2.4) * 49990) * 100) / 100,
			hour: fraud ? [
				0,
				1,
				2,
				3,
				4,
				22,
				23
			][Math.floor(random() * 7)] : 6 + Math.floor(random() * 17),
			location: fraud && random() < .7 ? random() < .55 ? "Unknown" : "Foreign" : locations[Math.floor(random() * locations.length)],
			type: types[Math.floor(random() * types.length)],
			senderBank: banks[Math.floor(random() * banks.length)],
			receiverBank: banks[Math.floor(random() * banks.length)],
			newDevice: random() < (fraud ? .7 : .05),
			failedAttempts: fraud ? Math.floor(random() * 4) : random() < .9 ? 0 : 1
		};
		return {
			id: `TXN${String(index + 1).padStart(7, "0")}`,
			...input,
			fraud,
			...scoreTransaction(input)
		};
	});
}
var featureImportance = [
	["New device", 23],
	["Unknown location", 19],
	["Failed attempts", 17],
	["Transaction amount", 15],
	["Hour of day", 11],
	["Transaction type", 7],
	["Sender bank", 5],
	["Receiver bank", 3]
];
var modelMetrics = {
	rf: {
		accuracy: 94.1,
		precision: 89.4,
		recall: 87.1,
		f1: 88.2,
		auc: 95.7,
		matrix: [[1734, 38], [52, 176]]
	},
	xgb: {
		accuracy: 95.3,
		precision: 91.7,
		recall: 89.5,
		f1: 90.6,
		auc: 97.1,
		matrix: [[1745, 27], [43, 185]]
	}
};
function generateSecurityLogs(scale = 500, seed = 42) {
	const random = seeded(seed);
	const base = Date.UTC(2026, 6, 16, 8, 30);
	const families = [
		"Login",
		"Session",
		"Authentication",
		"Request",
		"Service"
	];
	const browsers = [
		"Chrome",
		"Firefox",
		"Safari",
		"Edge",
		"Mobile App"
	];
	const services = [
		"UPI Transfer",
		"Bill Payment",
		"Recharge",
		"Money Request",
		"QR Payment",
		"Merchant Payment"
	];
	const plans = [
		"Basic",
		"Premium",
		"Gold",
		"Enterprise"
	];
	return Array.from({ length: Math.min(5e3, Math.max(100, scale)) * 5 }, (_, index) => {
		const family = families[index % 5];
		const suspicious = random() < .16;
		const critical = suspicious && random() < .42;
		let status = "normal", value = 1, detail = "Normal activity";
		if (family === "Login") {
			status = suspicious ? "failed" : "success";
			value = suspicious ? 6 + Math.floor(random() * 8) : 1;
			detail = suspicious ? `${value} failed attempts from this source` : "Successful login";
		}
		if (family === "Session") {
			value = suspicious ? random() < .5 ? 1 : 181 + Math.floor(random() * 300) : 5 + Math.floor(random() * 55);
			status = suspicious ? "abnormal" : "normal";
			detail = `Session duration ${value} minutes`;
		}
		if (family === "Authentication") {
			value = suspicious ? 11 + Math.floor(random() * 5) : 1;
			status = suspicious ? "rejected" : "authenticated";
			detail = suspicious ? `${value} rejected authentication attempts` : "Token accepted";
		}
		if (family === "Request") {
			status = critical ? "dos_attack" : suspicious ? "blank" : "normal";
			value = critical ? 1e4 + Math.floor(random() * 4e4) : suspicious ? Math.floor(random() * 50) : 100 + Math.floor(random() * 4900);
			detail = `${status.replace("_", " ")} request · ${value} bytes`;
		}
		if (family === "Service") {
			status = critical ? "suspended" : suspicious ? "pending" : "active";
			value = 1;
			detail = `${status} UPI service subscription`;
		}
		const severity = critical ? "critical" : suspicious ? "warning" : "info";
		return {
			id: `LOG-${String(index + 1).padStart(5, "0")}`,
			family,
			timestamp: new Date(base + Math.floor(random() * 7 * 864e5)).toISOString(),
			source: `${1 + Math.floor(random() * 223)}.•••.${1 + Math.floor(random() * 254)}.${1 + Math.floor(random() * 254)}`,
			subject: family === "Session" ? `SES-••${String(index % 100).padStart(2, "0")}` : `USR-••${String(index % 100).padStart(2, "0")}`,
			status,
			value,
			detail,
			browser: family === "Login" ? browsers[Math.floor(random() * browsers.length)] : void 0,
			service: family === "Service" ? services[Math.floor(random() * services.length)] : void 0,
			plan: family === "Service" ? plans[Math.floor(random() * plans.length)] : void 0,
			severity
		};
	}).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}
function securityAnomalies(logs) {
	const count = (family, predicate) => logs.filter((log) => log.family === family && predicate(log)).length;
	return [
		{
			category: "Brute force",
			severity: "critical",
			count: count("Login", (log) => log.status === "failed" && log.value > 5),
			description: "Login sources with more than five failures"
		},
		{
			category: "Abnormal session",
			severity: "warning",
			count: count("Session", (log) => log.value < 3 || log.value > 180),
			description: "Sessions shorter than 3 or longer than 180 minutes"
		},
		{
			category: "Credential stuffing",
			severity: "critical",
			count: count("Authentication", (log) => log.value > 10),
			description: "Authentication events with more than ten retries"
		},
		{
			category: "DOS request",
			severity: "critical",
			count: count("Request", (log) => log.status === "dos_attack"),
			description: "Requests classified as denial-of-service traffic"
		},
		{
			category: "Suspended service",
			severity: "warning",
			count: count("Service", (log) => log.status === "suspended"),
			description: "Service records in suspended state"
		}
	];
}
var budgetRows = budgetHistory.map((row) => {
	const capitalShare = row.ministry === "Defence" ? .29 : row.ministry === "Home Affairs" ? .06 : row.ministry === "Health" ? .025 : .008;
	const capital = row.total * capitalShare;
	const revenue = row.total - capital;
	const pre = row.year < 2017;
	return {
		...row,
		revenue,
		capital,
		plan: pre ? row.total * .58 : null,
		nonPlan: pre ? row.total * .42 : null
	};
});
function forecastSeries(values, horizon, polynomial = false) {
	const xs = values.map((_, index) => index);
	const n = values.length;
	if (!polynomial) {
		const xm = xs.reduce((a, b) => a + b, 0) / n;
		const ym = values.reduce((a, b) => a + b, 0) / n;
		const slope = xs.reduce((sum, x, i) => sum + (x - xm) * (values[i] - ym), 0) / xs.reduce((sum, x) => sum + (x - xm) ** 2, 0);
		const intercept = ym - slope * xm;
		const fitted = xs.map((x) => intercept + slope * x);
		const residual = Math.sqrt(values.reduce((sum, y, i) => sum + (y - fitted[i]) ** 2, 0) / n);
		return Array.from({ length: horizon }, (_, i) => ({
			value: Math.max(0, intercept + slope * (n + i)),
			low: Math.max(0, intercept + slope * (n + i) - 1.96 * residual),
			high: intercept + slope * (n + i) + 1.96 * residual
		}));
	}
	const recent = values.slice(-4);
	const d1 = recent.at(-1) - recent.at(-2);
	const accel = (d1 - (recent.at(-2) - recent.at(-3))) * .35;
	const residual = Math.abs(accel) + Math.abs(d1) * .18;
	return Array.from({ length: horizon }, (_, i) => {
		const step = i + 1;
		const value = Math.max(0, values.at(-1) + d1 * step + accel * step * step);
		return {
			value,
			low: Math.max(0, value - 1.96 * residual * Math.sqrt(step)),
			high: value + 1.96 * residual * Math.sqrt(step)
		};
	});
}
function toCsv(rows) {
	if (!rows.length) return "";
	const headers = Object.keys(rows[0]);
	const quote = (value) => `"${String(value ?? "").replaceAll("\"", "\"\"")}"`;
	return [headers.join(","), ...rows.map((row) => headers.map((header) => quote(row[header])).join(","))].join("\n");
}
//#endregion
//#region app/charts.tsx
var import_jsx_runtime = require_jsx_runtime();
var palette = [
	"#145a3a",
	"#c58b2a",
	"#315d77",
	"#a64f38",
	"#7f8f6a",
	"#674c78",
	"#8b7252",
	"#477b78"
];
function TrendChart({ data, secondary, formatter = (value) => value.toLocaleString("en-IN") }) {
	const canvas = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const element = canvas.current;
		if (!element) return;
		const draw = () => {
			const width = element.clientWidth;
			const height = 250;
			const ratio = window.devicePixelRatio || 1;
			element.width = width * ratio;
			element.height = height * ratio;
			const context = element.getContext("2d");
			if (!context) return;
			context.scale(ratio, ratio);
			context.clearRect(0, 0, width, height);
			const all = [...data, ...secondary ?? []].map((item) => item.value);
			const max = Math.max(...all, 1);
			const range = max - Math.min(...all, 0) || 1;
			const x = (index, length) => 16 + index * ((width - 32) / Math.max(1, length - 1));
			const y = (value) => 14 + (max - value) / range * 205;
			context.strokeStyle = "#d8d3c6";
			context.lineWidth = 1;
			for (let i = 0; i < 4; i++) {
				const gy = 14 + i * 68;
				context.beginPath();
				context.moveTo(0, gy);
				context.lineTo(width, gy);
				context.stroke();
			}
			const plot = (series, color, dashed = false, fill = false) => {
				context.beginPath();
				series.forEach((item, index) => index ? context.lineTo(x(index, series.length), y(item.value)) : context.moveTo(x(index, series.length), y(item.value)));
				if (fill && series.length) {
					context.lineTo(x(series.length - 1, series.length), 220);
					context.lineTo(x(0, series.length), 220);
					context.closePath();
					context.fillStyle = "rgba(20,90,58,.10)";
					context.fill();
					context.beginPath();
					series.forEach((item, index) => index ? context.lineTo(x(index, series.length), y(item.value)) : context.moveTo(x(index, series.length), y(item.value)));
				}
				context.setLineDash(dashed ? [7, 6] : []);
				context.strokeStyle = color;
				context.lineWidth = 2.5;
				context.stroke();
				context.setLineDash([]);
				if (!dashed) series.forEach((item, index) => {
					context.beginPath();
					context.arc(x(index, series.length), y(item.value), 3.2, 0, Math.PI * 2);
					context.fillStyle = color;
					context.fill();
				});
			};
			plot(data, palette[0], false, true);
			if (secondary) plot(secondary, palette[2], true);
		};
		draw();
		const observer = new ResizeObserver(draw);
		observer.observe(element);
		return () => observer.disconnect();
	}, [data, secondary]);
	const last = data.at(-1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "trend-chart",
		role: "img",
		"aria-label": `Trend chart. ${data.length && last ? `${data[0].label}: ${formatter(data[0].value)} to ${last.label}: ${formatter(last.value)}` : "No data"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvas }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chart-axis",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data[0]?.label }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data[Math.floor(data.length / 2)]?.label }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.at(-1)?.label })
				]
			}),
			secondary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chart-legend",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "solid" }), " Primary"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dashed" }), " Comparison"] })]
			})
		]
	});
}
function DonutChart({ data, formatter = (value) => value.toLocaleString("en-IN") }) {
	const total = data.reduce((sum, item) => sum + Math.max(0, item.value), 0) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "donut-layout",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "donut",
			style: { background: `conic-gradient(${data.reduce((result, item, index) => {
				const next = result.cursor + Math.max(0, item.value) / total * 100;
				return {
					cursor: next,
					stops: [...result.stops, `${palette[index % palette.length]} ${result.cursor}% ${next}%`]
				};
			}, {
				cursor: 0,
				stops: []
			}).stops.join(", ")})` },
			role: "img",
			"aria-label": data.map((item) => `${item.label} ${formatter(item.value)}`).join(", "),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatter(total) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Total" })] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "donut-legend",
			children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: palette[index % palette.length] } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatter(item.value) })
			] }, item.label))
		})]
	});
}
function Histogram({ data, formatter = (value) => value.toLocaleString("en-IN") }) {
	const max = Math.max(...data.map((item) => item.value), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "histogram",
		role: "img",
		"aria-label": data.map((item) => `${item.label} ${formatter(item.value)}`).join(", "),
		children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatter(item.value) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: {
				height: `${Math.max(3, item.value / max * 100)}%`,
				background: palette[index % 4]
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })
		] }, item.label))
	});
}
function DotPlot({ data, formatter = (value) => value.toLocaleString("en-IN") }) {
	const max = Math.max(...data.map((item) => item.value), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dot-plot",
		role: "img",
		"aria-label": data.map((item) => `${item.label} ${formatter(item.value)}`).join(", "),
		children: data.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { style: {
				left: `${item.value / max * 100}%`,
				background: palette[index % palette.length]
			} }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatter(item.value) })
		] }, item.label))
	});
}
//#endregion
//#region app/workspaces.tsx
function download(filename, body, type = "text/csv") {
	const url = URL.createObjectURL(new Blob([body], { type }));
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	URL.revokeObjectURL(url);
}
function Tabs({ items, value, setValue }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "workspace-tabs",
		"aria-label": "Workspace sections",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: item === value ? "active" : "",
			onClick: () => setValue(item),
			children: item
		}, item))
	});
}
function Kpis({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lab-kpis",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.value }),
			item.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.note })
		] }, item.label))
	});
}
function Bars({ data, formatter = (value) => String(value) }) {
	const max = Math.max(...data.map((item) => Math.abs(item.value)), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lab-bars",
		children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { style: { width: `${Math.max(2, Math.abs(item.value) / max * 100)}%` } }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatter(item.value) })
		] }, item.label))
	});
}
function group(items, key) {
	const counts = /* @__PURE__ */ new Map();
	items.forEach((item) => counts.set(String(item[key]), (counts.get(String(item[key])) ?? 0) + 1));
	return [...counts].map(([label, value]) => ({
		label,
		value
	})).sort((a, b) => b.value - a.value);
}
function PaymentWorkspace() {
	const [tab, setTab] = (0, import_react.useState)("Dashboard");
	const [count, setCount] = (0, import_react.useState)(5e3);
	const [fraudPercent, setFraudPercent] = (0, import_react.useState)(10);
	const [seed, setSeed] = (0, import_react.useState)(42);
	const [transactions, setTransactions] = (0, import_react.useState)(() => generateTransactions(5e3, 10, 42));
	const [query, setQuery] = (0, import_react.useState)("");
	const [riskFilter, setRiskFilter] = (0, import_react.useState)("ALL");
	const [labelFilter, setLabelFilter] = (0, import_react.useState)("All");
	const [locationFilter, setLocationFilter] = (0, import_react.useState)("All");
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("All");
	const [deviceFilter, setDeviceFilter] = (0, import_react.useState)("All");
	const [amountMax, setAmountMax] = (0, import_react.useState)(2e5);
	const [hourStart, setHourStart] = (0, import_react.useState)(0);
	const [hourEnd, setHourEnd] = (0, import_react.useState)(23);
	const [trailQuery, setTrailQuery] = (0, import_react.useState)("");
	const [trailStatus, setTrailStatus] = (0, import_react.useState)("all");
	const [amount, setAmount] = (0, import_react.useState)(12500);
	const [hour, setHour] = (0, import_react.useState)(2);
	const [location, setLocation] = (0, import_react.useState)("Bengaluru");
	const [type, setType] = (0, import_react.useState)("P2P");
	const [senderBank, setSenderBank] = (0, import_react.useState)("SBI");
	const [receiverBank, setReceiverBank] = (0, import_react.useState)("HDFC");
	const [newDevice, setNewDevice] = (0, import_react.useState)(true);
	const [failedAttempts, setFailedAttempts] = (0, import_react.useState)(2);
	const [predictModel, setPredictModel] = (0, import_react.useState)("Both");
	const [result, setResult] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [batch, setBatch] = (0, import_react.useState)([]);
	const [model, setModel] = (0, import_react.useState)("xgb");
	const locations = [
		"Mumbai",
		"Delhi",
		"Bengaluru",
		"Hyderabad",
		"Chennai",
		"Kolkata",
		"Pune",
		"Ahmedabad",
		"Unknown",
		"Foreign"
	];
	const types = [
		"P2P",
		"P2M",
		"Bill payment",
		"Recharge",
		"Online shopping"
	];
	const banks = [
		"SBI",
		"HDFC",
		"ICICI",
		"Axis",
		"Kotak",
		"PNB",
		"BOB"
	];
	const filtered = (0, import_react.useMemo)(() => transactions.filter((item) => (riskFilter === "ALL" || item.risk === riskFilter) && (labelFilter === "All" || item.fraud === (labelFilter === "Fraud")) && (locationFilter === "All" || item.location === locationFilter) && (typeFilter === "All" || item.type === typeFilter) && (deviceFilter === "All" || item.newDevice === (deviceFilter === "New")) && item.amount <= amountMax && item.hour >= hourStart && item.hour <= hourEnd && `${item.id} ${item.location} ${item.type} ${item.senderBank} ${item.receiverBank}`.toLowerCase().includes(query.toLowerCase())), [
		transactions,
		riskFilter,
		labelFilter,
		locationFilter,
		typeFilter,
		deviceFilter,
		amountMax,
		hourStart,
		hourEnd,
		query
	]);
	const fraudCount = transactions.filter((item) => item.fraud).length;
	const detected = transactions.filter((item) => item.fraud && item.risk === "HIGH").length;
	const falsePositive = transactions.filter((item) => !item.fraud && item.risk === "HIGH").length;
	const dashboardBars = group(transactions, "location").slice(0, 10);
	function regenerate() {
		setTransactions(generateTransactions(count, fraudPercent, seed));
		setSeed((value) => value + 1);
	}
	function analyse(event) {
		event.preventDefault();
		const value = scoreTransaction({
			amount,
			hour,
			location,
			type,
			senderBank,
			receiverBank,
			newDevice,
			failedAttempts
		});
		const chosen = predictModel === "Random Forest" ? value.rfScore : predictModel === "Gradient Boosting" ? value.xgbScore : value.score;
		const risk = chosen >= 60 ? "HIGH" : chosen >= 30 ? "MEDIUM" : "LOW";
		setResult(value);
		setHistory((rows) => [{
			amount,
			score: chosen,
			risk,
			model: predictModel
		}, ...rows].slice(0, 10));
	}
	function preset(kind) {
		if (kind === "legit") {
			setAmount(850);
			setHour(13);
			setLocation("Mumbai");
			setNewDevice(false);
			setFailedAttempts(0);
		} else {
			setAmount(68e3);
			setHour(2);
			setLocation("Foreign");
			setNewDevice(true);
			setFailedAttempts(3);
		}
		setResult(null);
	}
	async function batchUpload(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		const lines = (await file.text()).trim().split(/\r?\n/);
		const headers = lines.shift()?.split(",").map((v) => v.trim()) ?? [];
		const at = (values, name) => values[headers.indexOf(name)];
		const rows = lines.slice(0, 1e3).filter(Boolean).map((line, index) => {
			const v = line.split(",").map((x) => x.trim());
			const input = {
				amount: Number(at(v, "amount")),
				hour: Number(at(v, "hour")),
				location: at(v, "location") || "Unknown",
				type: at(v, "type") || "P2P",
				senderBank: at(v, "senderBank") || "SBI",
				receiverBank: at(v, "receiverBank") || "HDFC",
				newDevice: at(v, "newDevice") === "true",
				failedAttempts: Number(at(v, "failedAttempts")) || 0
			};
			return {
				id: at(v, "id") || `CSV-${index + 1}`,
				...input,
				fraud: false,
				...scoreTransaction(input)
			};
		});
		setBatch(rows);
		event.target.value = "";
	}
	const metric = modelMetrics[model];
	const trail = paymentEvents.filter((event) => (trailStatus === "all" || event.status === trailStatus) && `${event.id} ${event.maskedVpa} ${event.city} ${event.type} ${event.signals.join(" ")}`.toLowerCase().includes(trailQuery.toLowerCase()));
	const displayedScore = result ? predictModel === "Random Forest" ? result.rfScore : predictModel === "Gradient Boosting" ? result.xgbScore : result.score : 0;
	const displayedRisk = displayedScore >= 60 ? "HIGH" : displayedScore >= 30 ? "MEDIUM" : "LOW";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "view-page lab-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "section-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Transaction intelligence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Generate, score, investigate, compare, and export synthetic UPI transaction data." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				items: [
					"Dashboard",
					"Predictor",
					"Data explorer",
					"Payment trail",
					"Batch CSV",
					"Model performance"
				],
				value: tab,
				setValue: setTab
			}),
			tab === "Dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-toolbar generator",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Transactions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: "100",
							max: "50000",
							step: "100",
							value: count,
							onChange: (e) => setCount(Number(e.target.value))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
							"Injected fraud",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "5",
								max: "30",
								value: fraudPercent,
								onChange: (e) => setFraudPercent(Number(e.target.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [fraudPercent, "%"] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "lab-primary",
							onClick: regenerate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 15 }), " Generate dataset"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { items: [
					{
						label: "Transactions",
						value: transactions.length.toLocaleString("en-IN")
					},
					{
						label: "Injected fraud",
						value: `${(fraudCount / transactions.length * 100).toFixed(1)}%`
					},
					{
						label: "Detected high risk",
						value: detected.toLocaleString("en-IN")
					},
					{
						label: "False positives",
						value: falsePositive.toLocaleString("en-IN")
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-grid two",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Transactions by location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotPlot, { data: dashboardBars })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Activity by hour" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, { data: Array.from({ length: 24 }, (_, h) => ({
								label: `${String(h).padStart(2, "0")}:00`,
								value: transactions.filter((item) => item.hour === h).length
							})) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Amount distribution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Histogram, { data: [
								[
									"Under ₹1k",
									0,
									1e3
								],
								[
									"₹1k–10k",
									1e3,
									1e4
								],
								[
									"₹10k–50k",
									1e4,
									5e4
								],
								[
									"₹50k–1L",
									5e4,
									1e5
								],
								[
									"Above ₹1L",
									1e5,
									Infinity
								]
							].map(([label, low, high]) => ({
								label: String(label),
								value: transactions.filter((item) => item.amount >= Number(low) && item.amount < Number(high)).length
							})) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Payment types" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: group(transactions, "type") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Bank activity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, { data: group(transactions, "senderBank") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Risk distribution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: group(transactions, "risk") })]
						})
					]
				})
			] }),
			tab === "Predictor" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lab-grid two",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "lab-card form-card",
						onSubmit: analyse,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lab-card-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Transaction details" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => preset("legit"),
									children: "Routine example"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => preset("fraud"),
									children: "Fraud example"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Amount", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: amount,
										onChange: (e) => setAmount(Number(e.target.value))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Hour", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0",
										max: "23",
										value: hour,
										onChange: (e) => setHour(Number(e.target.value))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Location", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: location,
										onChange: (e) => setLocation(e.target.value),
										children: locations.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: v }, v))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Payment type", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: type,
										onChange: (e) => setType(e.target.value),
										children: types.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: v }, v))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Sender bank", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: senderBank,
										onChange: (e) => setSenderBank(e.target.value),
										children: banks.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: v }, v))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Receiver bank", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: receiverBank,
										onChange: (e) => setReceiverBank(e.target.value),
										children: banks.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: v }, v))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Failed attempts", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "0",
										max: "10",
										value: failedAttempts,
										onChange: (e) => setFailedAttempts(Number(e.target.value))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Model", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: predictModel,
										onChange: (e) => setPredictModel(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Both" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Random Forest" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Gradient Boosting" })
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "check-label",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: newDevice,
											onChange: (e) => setNewDevice(e.target.checked)
										}), " New device"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "lab-primary",
								type: "submit",
								children: "Analyse transaction"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lab-card result-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [predictModel, " result"] }), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `big-risk ${displayedRisk.toLowerCase()}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [displayedScore, "%"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [displayedRisk, " RISK"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { items: [{
								label: "Random forest",
								value: `${result.rfScore}%`
							}, {
								label: "Gradient boost",
								value: `${result.xgbScore}%`
							}] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "explanation-list",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: hour < 6 || hour >= 22 ? "flag" : "clear",
										children: hour < 6 || hour >= 22 ? "Unusual transaction hour" : "Normal transaction hour"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: location === "Unknown" || location === "Foreign" ? "flag" : "clear",
										children: location === "Unknown" || location === "Foreign" ? "High-review location" : "Known location"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: newDevice ? "flag" : "clear",
										children: newDevice ? "New device" : "Known device"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: failedAttempts >= 2 ? "flag" : "clear",
										children: [failedAttempts, " failed attempts"]
									})
								]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "lab-empty",
							children: "Enter a scenario or load an example."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lab-card span-two",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lab-card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Session history" }), history.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => download("risk-history.csv", toCsv(history)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " Export"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setHistory([]),
								children: "Clear history"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactTable, { rows: history })]
					})
				]
			}),
			tab === "Data explorer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-toolbar filters",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "search-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Search ID, bank, location, or type",
								value: query,
								onChange: (e) => setQuery(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Injected label", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: labelFilter,
							onChange: (e) => setLabelFilter(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Fraud" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Legitimate" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Risk", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: riskFilter,
							onChange: (e) => setRiskFilter(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "ALL" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "HIGH" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "MEDIUM" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "LOW" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Location", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: locationFilter,
							onChange: (e) => setLocationFilter(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All" }), locations.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: v }, v))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Type", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: typeFilter,
							onChange: (e) => setTypeFilter(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All" }), types.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: v }, v))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Device", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: deviceFilter,
							onChange: (e) => setDeviceFilter(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "New" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Known" })
							]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "range-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
							"Maximum amount ₹",
							amountMax.toLocaleString("en-IN"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "1000",
								max: "200000",
								step: "1000",
								value: amountMax,
								onChange: (e) => setAmountMax(Number(e.target.value))
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
							"Hours ",
							hourStart,
							":00–",
							hourEnd,
							":00",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "0",
								max: "23",
								value: hourStart,
								onChange: (e) => setHourStart(Math.min(Number(e.target.value), hourEnd))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "0",
								max: "23",
								value: hourEnd,
								onChange: (e) => setHourEnd(Math.max(Number(e.target.value), hourStart))
							})] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "text-action",
							onClick: () => download("filtered-transactions.csv", toCsv(filtered)),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }),
								" Export ",
								filtered.length.toLocaleString("en-IN")
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-grid two",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Filtered risk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: group(filtered, "risk") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Filtered locations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotPlot, { data: group(filtered, "location").slice(0, 8) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Filtered payment types" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: group(filtered, "type") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Filtered hours" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, { data: Array.from({ length: 24 }, (_, h) => ({
								label: `${h}:00`,
								value: filtered.filter((item) => item.hour === h).length
							})) })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionTable, { rows: filtered.slice(0, 250) })
			] }),
			tab === "Payment trail" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-toolbar filters",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "search-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Search masked VPA, city, signal, or event",
								value: trailQuery,
								onChange: (e) => setTrailQuery(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Decision", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: trailStatus,
							onChange: (e) => setTrailStatus(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "held",
									children: "Held"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "review",
									children: "Review"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "allowed",
									children: "Allowed"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "text-action",
							onClick: () => download("masked-payment-trail.csv", toCsv(trail)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " Export trail"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { items: [
					{
						label: "Matched events",
						value: String(trail.length)
					},
					{
						label: "Total value",
						value: `₹${trail.reduce((sum, event) => sum + event.amount, 0).toLocaleString("en-IN")}`
					},
					{
						label: "Average risk",
						value: String(Math.round(trail.reduce((sum, event) => sum + event.score, 0) / Math.max(1, trail.length)))
					},
					{
						label: "Held",
						value: String(trail.filter((event) => event.status === "held").length)
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "compact-table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "compact-table wide",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Event" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Time" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Masked VPA" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "City" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Type" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Amount" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Signals" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Score" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Decision" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: trail.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.id }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(event.timestamp).toLocaleTimeString("en-IN") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.maskedVpa }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.city }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.type }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["₹", event.amount.toLocaleString("en-IN")] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.signals.join(", ") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.score }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `risk-tag ${event.status === "held" ? "high" : event.status === "review" ? "medium" : "low"}`,
								children: event.status
							}) })
						] }, event.id)) })]
					})
				})
			] }),
			tab === "Batch CSV" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lab-grid two",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lab-card upload-zone",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 28 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Analyse a transaction CSV" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Required columns: amount, hour, location, type, senderBank, receiverBank, newDevice, failedAttempts. Up to 1,000 rows." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => download("transaction-template.csv", "id,amount,hour,location,type,senderBank,receiverBank,newDevice,failedAttempts\nTXN-1,12500,2,Mumbai,P2P,SBI,HDFC,true,2"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " Template"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "lab-primary",
								children: ["Choose CSV", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: ".csv,text/csv",
									onChange: batchUpload
								})]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lab-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Batch result" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { items: [{
								label: "Rows",
								value: String(batch.length)
							}, {
								label: "High risk",
								value: String(batch.filter((row) => row.risk === "HIGH").length)
							}] }),
							batch.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "text-action",
								onClick: () => download("batch-results.csv", toCsv(batch)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " Export scored rows"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "span-two",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionTable, { rows: batch.slice(0, 250) })
					})
				]
			}),
			tab === "Model performance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "model-switch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: model === "rf" ? "active" : "",
						onClick: () => setModel("rf"),
						children: "Random Forest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: model === "xgb" ? "active" : "",
						onClick: () => setModel("xgb"),
						children: "Gradient Boosting"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { items: [
					{
						label: "Accuracy",
						value: `${metric.accuracy}%`
					},
					{
						label: "Precision",
						value: `${metric.precision}%`
					},
					{
						label: "Recall",
						value: `${metric.recall}%`
					},
					{
						label: "F1 score",
						value: `${metric.f1}%`
					},
					{
						label: "ROC AUC",
						value: `${metric.auc}%`
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactTable, { rows: [{
					model: "Random Forest",
					...modelMetrics.rf
				}, {
					model: "Gradient Boosting",
					...modelMetrics.xgb
				}].map(({ model: name, accuracy, precision, recall, f1, auc }) => ({
					model: name,
					accuracy,
					precision,
					recall,
					f1,
					auc
				})) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-grid two",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Confusion matrix" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "confusion",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["True negative", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: metric.matrix[0][0] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["False positive", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: metric.matrix[0][1] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["False negative", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: metric.matrix[1][0] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["True positive", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: metric.matrix[1][1] })] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Feature importance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
								data: featureImportance.map(([label, value]) => ({
									label,
									value
								})),
								formatter: (value) => `${value}%`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card span-two",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "ROC curve" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "roc-chart",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "diagonal" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: model }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"Area under curve: ",
										metric.auc,
										"%"
									] })
								]
							})]
						})
					]
				})
			] })
		]
	});
}
function CompactTable({ rows }) {
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "lab-empty",
		children: "No rows yet."
	});
	const headers = Object.keys(rows[0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "compact-table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "compact-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: header }, header)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.slice(0, 100).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: String(row[header]) }, header)) }, index)) })]
		})
	});
}
function TransactionTable({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "compact-table-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "compact-table wide",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Amount" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Hour" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Location" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Type" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Banks" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Device" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "RF" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "XGB" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Risk" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.id }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["₹", row.amount.toLocaleString("en-IN")] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [row.hour, ":00"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.location }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.type }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
					row.senderBank,
					" → ",
					row.receiverBank
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.newDevice ? "New" : "Known" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.rfScore }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.xgbScore }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `risk-tag ${row.risk.toLowerCase()}`,
					children: row.risk
				}) })
			] }, row.id)) })]
		}), !rows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "lab-empty",
			children: "No matching transactions."
		})]
	});
}
function SecurityWorkspace() {
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [scale, setScale] = (0, import_react.useState)(500);
	const [seed, setSeed] = (0, import_react.useState)(42);
	const [logs, setLogs] = (0, import_react.useState)(() => generateSecurityLogs(500));
	const [family, setFamily] = (0, import_react.useState)("Login");
	const anomalies = securityAnomalies(logs);
	const critical = logs.filter((log) => log.severity === "critical").length;
	const warnings = logs.filter((log) => log.severity === "warning").length;
	const risk = Math.min(100, Math.round((critical * 1.4 + warnings * .45) / logs.length * 100));
	const familyLogs = logs.filter((log) => log.family === family);
	function regenerate() {
		setLogs(generateSecurityLogs(scale, seed));
		setSeed((value) => value + 1);
	}
	async function uploadFamily(event, selectedFamily) {
		const file = event.target.files?.[0];
		if (!file) return;
		const lines = (await file.text()).trim().split(/\r?\n/);
		const headers = lines.shift()?.split(",").map((x) => x.trim()) ?? [];
		const parsed = lines.filter(Boolean).map((line, index) => {
			const values = line.split(",");
			const record = Object.fromEntries(headers.map((header, i) => [header, values[i]?.trim()]));
			const status = record.status || record.login_status || record.auth_status || record.request_type || "imported";
			const value = Number(record.value || record.duration_minutes || record.attempt_count || record.payload_size || 1);
			const suspicious = status === "failed" || status === "unauthenticated" || status === "dos_attack" || status === "suspended" || value > 10;
			return {
				id: record.id || `IMPORT-${selectedFamily}-${index + 1}`,
				family: selectedFamily,
				timestamp: record.timestamp || record.start_time || (/* @__PURE__ */ new Date()).toISOString(),
				source: record.ip_address || "imported",
				subject: record.user_id || record.session_id || "imported",
				status,
				value,
				detail: record.failure_reason || `${selectedFamily} CSV row`,
				severity: suspicious ? "warning" : "info"
			};
		});
		setLogs((current) => [...current.filter((log) => log.family !== selectedFamily), ...parsed]);
		event.target.value = "";
	}
	const report = `RUPEELENS SECURITY ANALYSIS\nRisk score: ${risk}/100\nEvents: ${logs.length}\nCritical: ${critical}\nWarnings: ${warnings}\n\nANOMALIES\n${anomalies.map((item) => `${item.category}: ${item.count} - ${item.description}`).join("\n")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "view-page lab-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "section-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Security-log analysis" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Generate or upload five related log families, detect attack patterns, drill into activity, and export the evidence." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				items: [
					"Overview",
					"Deep dive",
					"Anomalies",
					"Import & export"
				],
				value: tab,
				setValue: setTab
			}),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-toolbar generator",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Rows per log family", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: "100",
						max: "5000",
						step: "100",
						value: scale,
						onChange: (e) => setScale(Number(e.target.value))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "lab-primary",
						onClick: regenerate,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 15 }), " Generate & analyse"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { items: [
					{
						label: "Composite risk",
						value: `${risk}/100`,
						note: risk >= 50 ? "Critical" : risk >= 30 ? "High" : risk >= 15 ? "Medium" : "Low"
					},
					{
						label: "Log events",
						value: logs.length.toLocaleString("en-IN")
					},
					{
						label: "Critical",
						value: critical.toLocaleString("en-IN")
					},
					{
						label: "Warnings",
						value: warnings.toLocaleString("en-IN")
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-grid two",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Events by family" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotPlot, { data: group(logs, "family") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Severity distribution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: group(logs, "severity") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Login status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: group(logs.filter((log) => log.family === "Login"), "status") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Login browsers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, { data: group(logs.filter((log) => log.family === "Login"), "browser") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Authentication status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: group(logs.filter((log) => log.family === "Authentication"), "status") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Request types" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotPlot, { data: group(logs.filter((log) => log.family === "Request"), "status") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Session duration bands" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Histogram, { data: [
								["Under 3 min", (log) => log.value < 3],
								["3–60 min", (log) => log.value >= 3 && log.value <= 60],
								["61–180 min", (log) => log.value > 60 && log.value <= 180],
								["Over 180 min", (log) => log.value > 180]
							].map(([label, predicate]) => ({
								label: String(label),
								value: logs.filter((log) => log.family === "Session" && predicate(log)).length
							})) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Service status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: group(logs.filter((log) => log.family === "Service"), "status") })]
						})
					]
				})
			] }),
			tab === "Deep dive" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "model-switch",
					children: [
						"Login",
						"Session",
						"Authentication",
						"Request",
						"Service"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: family === item ? "active" : "",
						onClick: () => setFamily(item),
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { items: [
					{
						label: "Events",
						value: familyLogs.length.toLocaleString("en-IN")
					},
					{
						label: "Critical",
						value: String(familyLogs.filter((log) => log.severity === "critical").length)
					},
					{
						label: "Warnings",
						value: String(familyLogs.filter((log) => log.severity === "warning").length)
					},
					{
						label: family === "Session" ? "Average minutes" : "Average value",
						value: (familyLogs.reduce((sum, log) => sum + log.value, 0) / Math.max(1, familyLogs.length)).toFixed(1)
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-grid two",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lab-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Status breakdown" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { data: group(familyLogs, "status") })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lab-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Hourly activity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, { data: Array.from({ length: 24 }, (_, hour) => ({
							label: `${hour}:00`,
							value: familyLogs.filter((log) => new Date(log.timestamp).getUTCHours() === hour).length
						})) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityTable, { rows: familyLogs.slice(0, 300) })
			] }),
			tab === "Anomalies" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "anomaly-list",
					children: anomalies.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: item.severity,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 19 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: item.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.description })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.count })
						]
					}, item.category))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-grid two",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Top suspicious sources" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DotPlot, { data: group(logs.filter((log) => log.severity !== "info"), "source").slice(0, 10) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Attack activity by hour" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, { data: Array.from({ length: 24 }, (_, hour) => ({
								label: `${hour}:00`,
								value: logs.filter((log) => log.severity !== "info" && new Date(log.timestamp).getUTCHours() === hour).length
							})) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card span-two",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Attack heatmap · day × hour" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "attack-heatmap",
								children: [
									"Wed",
									"Thu",
									"Fri",
									"Sat",
									"Sun",
									"Mon",
									"Tue"
								].map((day, dayIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: day }), Array.from({ length: 24 }, (_, hour) => {
									const value = logs.filter((log) => log.severity !== "info" && Math.floor((new Date(log.timestamp).getTime() - Date.UTC(2026, 6, 16, 8, 30)) / 864e5) === dayIndex && new Date(log.timestamp).getUTCHours() === hour).length;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										title: `${day} ${hour}:00 · ${value}`,
										style: { opacity: .2 + Math.min(.8, value / Math.max(1, scale / 30)) }
									}, hour);
								})] }, day))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityTable, { rows: logs.filter((log) => log.severity !== "info").slice(0, 300) })
			] }),
			tab === "Import & export" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "upload-family-grid",
				children: [
					"Login",
					"Session",
					"Authentication",
					"Request",
					"Service"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 20 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [item, " CSV"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Replace the synthetic ",
						item.toLowerCase(),
						" log."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: ".csv,text/csv",
						onChange: (event) => uploadFamily(event, item)
					})
				] }, item))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "export-grid",
				children: [[
					"Login",
					"Session",
					"Authentication",
					"Request",
					"Service"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => download(`${item.toLowerCase()}-logs.csv`, toCsv(logs.filter((log) => log.family === item))),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }),
						" ",
						item,
						" logs"
					]
				}, item)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => download("security-summary.txt", report, "text/plain"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Text report"]
				})]
			})] })
		]
	});
}
function SecurityTable({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "compact-table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "compact-table wide",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Time" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Family" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Source" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Subject" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Detail" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Severity" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.id }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(row.timestamp).toLocaleTimeString("en-IN") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.family }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.source }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.subject }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.status }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.detail }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `risk-tag ${row.severity}`,
					children: row.severity
				}) })
			] }, row.id)) })]
		})
	});
}
function BudgetWorkspace() {
	const [tab, setTab] = (0, import_react.useState)("Dashboard");
	const [rows, setRows] = (0, import_react.useState)(budgetRows);
	const ministries = [...new Set(rows.map((row) => row.ministry))];
	const years = [...new Set(rows.map((row) => row.year))].sort();
	const [startYear, setStartYear] = (0, import_react.useState)(2014);
	const [endYear, setEndYear] = (0, import_react.useState)(2024);
	const [excludeFinance, setExcludeFinance] = (0, import_react.useState)(true);
	const [logScale, setLogScale] = (0, import_react.useState)(false);
	const [ministry, setMinistry] = (0, import_react.useState)("Defence");
	const [horizon, setHorizon] = (0, import_react.useState)(4);
	const [forecastModel, setForecastModel] = (0, import_react.useState)("Polynomial");
	const [compareModels, setCompareModels] = (0, import_react.useState)(false);
	const [comparison, setComparison] = (0, import_react.useState)([
		"Agriculture",
		"Defence",
		"Health"
	]);
	const [comparisonMode, setComparisonMode] = (0, import_react.useState)("Absolute");
	const [query, setQuery] = (0, import_react.useState)("Top 5 ministries");
	const [queryResult, setQueryResult] = (0, import_react.useState)(null);
	const [rupeeFlow, setRupeeFlow] = (0, import_react.useState)("to");
	const dashboardRows = rows.filter((row) => row.year >= startYear && row.year <= endYear && (!excludeFinance || row.ministry !== "Finance"));
	const selectedRows = rows.filter((row) => row.ministry === ministry).sort((a, b) => a.year - b.year);
	const latest = Math.max(...dashboardRows.map((row) => row.year));
	const latestRows = dashboardRows.filter((row) => row.year === latest);
	const totalLatest = latestRows.reduce((sum, row) => sum + row.total, 0);
	const forecasts = forecastSeries(selectedRows.map((row) => row.total), horizon, forecastModel === "Polynomial");
	const otherForecasts = forecastSeries(selectedRows.map((row) => row.total), horizon, forecastModel !== "Polynomial");
	function viewValue(series, row, index) {
		if (comparisonMode === "Indexed") return row.total / series[0].total * 100;
		if (comparisonMode === "YoY %") return index ? (row.total / series[index - 1].total - 1) * 100 : 0;
		if (comparisonMode === "Budget share %") {
			const yearTotal = rows.filter((item) => item.year === row.year).reduce((sum, item) => sum + item.total, 0);
			return row.total / yearTotal * 100;
		}
		return row.total;
	}
	function runQuery() {
		const lower = query.toLowerCase();
		const yearMatch = lower.match(/20\d{2}/);
		const year = yearMatch ? Number(yearMatch[0]) : null;
		const topMatch = lower.match(/top\s+(\d+)/);
		const top = topMatch ? Number(topMatch[1]) : 5;
		const found = ministries.find((item) => lower.includes(item.toLowerCase()) || item === "Defence" && /(army|military|defense)/.test(lower) || item === "Agriculture" && /farm/.test(lower));
		if (lower.includes("compare")) {
			const matched = ministries.filter((item) => lower.includes(item.toLowerCase()));
			const picked = matched.length >= 2 ? matched : comparison.slice(0, 2);
			setQueryResult({
				title: `Comparison: ${picked.join(" and ")}`,
				data: picked.map((item) => ({
					label: item,
					value: rows.filter((row) => row.ministry === item).at(-1)?.total ?? 0
				}))
			});
		} else if (found && /(trend|over time|allocation)/.test(lower)) setQueryResult({
			title: `${found} allocation trend`,
			data: rows.filter((row) => row.ministry === found).map((row) => ({
				label: `${row.year}`,
				value: row.total
			}))
		});
		else if (lower.includes("growing") || lower.includes("growth")) setQueryResult({
			title: "Cumulative allocation growth",
			data: ministries.map((item) => {
				const series = rows.filter((row) => row.ministry === item);
				return {
					label: item,
					value: (series.at(-1).total / series[0].total - 1) * 100
				};
			}).sort((a, b) => b.value - a.value)
		});
		else {
			const targetYear = year ?? Math.max(...years);
			const ranked = rows.filter((row) => row.year === targetYear).sort((a, b) => b.total - a.total).slice(0, top);
			setQueryResult({
				title: `Top ${top} ministries in ${targetYear}–${String(targetYear + 1).slice(-2)}`,
				data: ranked.map((row) => ({
					label: row.ministry,
					value: row.total
				}))
			});
		}
	}
	async function uploadBudget(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		const lines = (await file.text()).trim().split(/\r?\n/);
		const headers = lines.shift()?.split(",").map((x) => x.trim().toLowerCase()) ?? [];
		const value = (parts, ...names) => parts[headers.findIndex((header) => names.includes(header))];
		const parsed = lines.filter(Boolean).map((line) => {
			const parts = line.split(",");
			const total = Number(value(parts, "total", "total plan & non-plan"));
			return {
				ministry: value(parts, "ministry", "ministry name"),
				year: Number((value(parts, "year", "numeric_year") || "").slice(0, 4)),
				total,
				revenue: Number(value(parts, "revenue", "revenue (plan)")) || total * .75,
				capital: Number(value(parts, "capital", "capital (plan)")) || total * .25,
				plan: null,
				nonPlan: null
			};
		}).filter((row) => row.ministry && Number.isFinite(row.year) && Number.isFinite(row.total));
		if (parsed.length) setRows(parsed);
		event.target.value = "";
	}
	const yearlySummary = years.map((year) => ({
		year,
		total: rows.filter((row) => row.year === year).reduce((sum, row) => sum + row.total, 0)
	}));
	const ministrySummary = ministries.map((item) => {
		const series = rows.filter((row) => row.ministry === item);
		return {
			ministry: item,
			first: series[0]?.total ?? 0,
			latest: series.at(-1)?.total ?? 0,
			growth: series.length ? (series.at(-1).total / series[0].total - 1) * 100 : 0
		};
	});
	const pivot = years.map((year) => Object.fromEntries([["year", year], ...ministries.map((item) => [item, rows.find((row) => row.year === year && row.ministry === item)?.total ?? ""])]));
	function excelExport() {
		download("budget-data.xls", `<table><tr>${[
			"Ministry",
			"Year",
			"Total",
			"Revenue",
			"Capital",
			"Plan",
			"Non-Plan"
		].map((h) => `<th>${h}</th>`).join("")}</tr>${rows.map((row) => `<tr><td>${row.ministry}</td><td>${row.year}</td><td>${row.total}</td><td>${row.revenue}</td><td>${row.capital}</td><td>${row.plan ?? ""}</td><td>${row.nonPlan ?? ""}</td></tr>`).join("")}</table>`, "application/vnd.ms-excel");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "view-page lab-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "section-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Budget analytics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Explore, compare, forecast, query, upload, and export ministry allocations alongside the official 2026–27 Budget Estimates." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				items: [
					"Dashboard",
					"2026–27 overview",
					"Ministry drill-down",
					"Forecasting",
					"Comparison",
					"Smart Query",
					"Export"
				],
				value: tab,
				setValue: setTab
			}),
			tab === "Dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-toolbar filters",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["From", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: startYear,
							onChange: (e) => setStartYear(Number(e.target.value)),
							children: years.map((year) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: year }, year))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["To", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: endYear,
							onChange: (e) => setEndYear(Number(e.target.value)),
							children: years.map((year) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: year }, year))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "check-label",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: excludeFinance,
								onChange: (e) => setExcludeFinance(e.target.checked)
							}), " Exclude Finance outlier"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "check-label",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: logScale,
								onChange: (e) => setLogScale(e.target.checked)
							}), " Log scale"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { items: [
					{
						label: "Latest visible year",
						value: `${latest}–${String(latest + 1).slice(-2)}`
					},
					{
						label: "Visible allocation",
						value: `₹${(totalLatest / 1e5).toFixed(2)}L Cr`
					},
					{
						label: "Ministries",
						value: String(latestRows.length)
					},
					{
						label: "Largest allocation",
						value: latestRows.sort((a, b) => b.total - a.total)[0]?.ministry ?? "-"
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-grid two",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Total allocation by year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
								data: years.filter((year) => year >= startYear && year <= endYear).map((year) => ({
									label: `${year}`,
									value: dashboardRows.filter((row) => row.year === year).reduce((sum, row) => sum + (logScale ? Math.log10(row.total + 1) : row.total), 0)
								})),
								formatter: (value) => logScale ? value.toFixed(1) : `₹${(value / 1e5).toFixed(2)}L`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Latest-year share" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, {
								data: latestRows.map((row) => ({
									label: row.ministry,
									value: row.total / totalLatest * 100
								})),
								formatter: (value) => `${value.toFixed(1)}%`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card span-two",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Year-on-year heatmap" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "heatmap",
									children: ministries.filter((item) => !excludeFinance || item !== "Finance").map((item) => {
										const series = dashboardRows.filter((row) => row.ministry === item);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item }), series.map((row, index) => {
											const yoy = index ? (row.total / series[index - 1].total - 1) * 100 : 0;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: { background: yoy > 20 ? "#9fc2ad" : yoy < 0 ? "#e5c0b7" : "#e7e1d1" },
												title: `${row.year}: ${yoy.toFixed(1)}%`,
												children: yoy.toFixed(0)
											}, row.year);
										})] }, item);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "chart-note",
									children: "Policy timeline: Plan/Non-Plan classification ended in FY2017–18; FY2020–21 reflects pandemic-era spending; Finance FY2024–25 is a structural source-data outlier."
								})
							]
						})
					]
				})
			] }),
			tab === "2026–27 overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "source-banner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Official source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Government of India · Ministry of Finance · Budget at a Glance 2026–27" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.indiabudget.gov.in/doc/budget_at_glance/bag1.pdf",
						target: "_blank",
						rel: "noreferrer",
						children: "Open PDF"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "budget-metrics",
					children: budgetSummary.map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: metric.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [metric.unit.startsWith("₹") ? "₹" : "", metric.value.toFixed(metric.value < 10 ? 1 : 2)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							metric.unit.replace("₹ ", ""),
							" · ",
							metric.note
						] })
					] }, metric.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "lab-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lab-card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Where each rupee ", rupeeFlow === "to" ? "goes" : "comes from"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setRupeeFlow("to"),
								children: "Goes to"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setRupeeFlow("from"),
								children: "Comes from"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, {
							data: (rupeeFlow === "to" ? rupeeGoesTo : rupeeComesFrom).map((item) => ({
								label: item.label,
								value: item.paise
							})),
							formatter: (value) => `${value}p`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "chart-note",
							children: "Rounded paise per rupee; source rounding and netting can affect totals. Budget Estimates are not actual spending."
						})
					]
				})
			] }),
			tab === "Ministry drill-down" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lab-toolbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Ministry", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: ministry,
						onChange: (e) => setMinistry(e.target.value),
						children: ministries.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpis, { items: [
					{
						label: "Latest allocation",
						value: `₹${(selectedRows.at(-1)?.total ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })} Cr`
					},
					{
						label: "Revenue",
						value: `₹${(selectedRows.at(-1)?.revenue ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })} Cr`
					},
					{
						label: "Capital",
						value: `₹${(selectedRows.at(-1)?.capital ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })} Cr`
					},
					{
						label: "Cumulative growth",
						value: `${((selectedRows.at(-1).total / selectedRows[0].total - 1) * 100).toFixed(1)}%`
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lab-grid two",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Total trend" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
								data: selectedRows.map((row) => ({
									label: `${row.year}`,
									value: row.total
								})),
								formatter: (value) => `₹${(value / 1e3).toFixed(0)}k`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Revenue vs capital" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
								data: [{
									label: "Revenue",
									value: selectedRows.at(-1)?.revenue ?? 0
								}, {
									label: "Capital",
									value: selectedRows.at(-1)?.capital ?? 0
								}],
								formatter: (value) => `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Year-on-year growth" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
								data: selectedRows.map((row, index) => ({
									label: `${row.year}`,
									value: index ? (row.total / selectedRows[index - 1].total - 1) * 100 : 0
								})),
								formatter: (value) => `${value.toFixed(1)}%`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Budget share trend" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
								data: selectedRows.map((row) => ({
									label: `${row.year}`,
									value: row.total / rows.filter((item) => item.year === row.year).reduce((sum, item) => sum + item.total, 0) * 100
								})),
								formatter: (value) => `${value.toFixed(1)}%`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card span-two",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Plan and Non-Plan · pre-2017 only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
								data: selectedRows.filter((row) => row.plan !== null).flatMap((row) => [{
									label: `${row.year} Plan`,
									value: row.plan ?? 0
								}, {
									label: `${row.year} Non-Plan`,
									value: row.nonPlan ?? 0
								}]),
								formatter: (value) => `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactTable, { rows: selectedRows })
			] }),
			tab === "Forecasting" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lab-toolbar filters",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Ministry", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: ministry,
						onChange: (e) => setMinistry(e.target.value),
						children: ministries.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
						"Horizon",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: "1",
							max: "7",
							value: horizon,
							onChange: (e) => setHorizon(Number(e.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [horizon, " years"] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Model", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: forecastModel,
						onChange: (e) => setForecastModel(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Linear" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Polynomial" })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "check-label",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: compareModels,
							onChange: (e) => setCompareModels(e.target.checked)
						}), " Compare models"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lab-grid two",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "lab-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [forecastModel, " forecast with 95% band"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
						data: forecasts.map((item, index) => ({
							label: `${2025 + index}–${String(2026 + index).slice(-2)}`,
							value: item.value
						})),
						secondary: compareModels ? otherForecasts.map((item, index) => ({
							label: `${2025 + index}`,
							value: item.value
						})) : void 0,
						formatter: (value) => `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "lab-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Forecast table" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactTable, { rows: forecasts.map((item, index) => ({
							year: `${2025 + index}–${String(2026 + index).slice(-2)}`,
							estimate: Math.round(item.value),
							lower95: Math.round(item.low),
							upper95: Math.round(item.high)
						})) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "chart-note",
							children: "Directional only. Eleven annual observations cannot support a precise fiscal forecast."
						})
					]
				})]
			})] }),
			tab === "Comparison" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "comparison-picker",
					children: ministries.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: comparison.includes(item),
							onChange: (e) => setComparison((current) => e.target.checked ? [...current, item] : current.filter((value) => value !== item))
						}),
						" ",
						item
					] }, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "model-switch",
					children: [
						"Absolute",
						"Indexed",
						"YoY %",
						"Budget share %"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: comparisonMode === item ? "active" : "",
						onClick: () => setComparisonMode(item),
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lab-grid two",
					children: comparison.map((item) => {
						const series = rows.filter((row) => row.ministry === item);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: item }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
								data: series.map((row, index) => ({
									label: `${row.year}`,
									value: viewValue(series, row, index)
								})),
								formatter: (value) => comparisonMode === "Absolute" ? `₹${(value / 1e3).toFixed(0)}k` : `${value.toFixed(1)}${comparisonMode.includes("%") ? "%" : ""}`
							})]
						}, item);
					})
				})
			] }),
			tab === "Smart Query" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "query-presets",
					children: [
						"Top 5 ministries",
						"Defence trend",
						"Fastest growing after 2018",
						"Budget in 2021",
						"Compare Defence and Health"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setQuery(item),
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "smart-query",
					onSubmit: (event) => {
						event.preventDefault();
						runQuery();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Ask about rankings, trends, years, growth, or comparisons"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "lab-primary",
							children: "Run query"
						})
					]
				}),
				queryResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "lab-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: queryResult.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
						data: queryResult.data,
						formatter: (value) => queryResult.title.includes("growth") ? `${value.toFixed(1)}%` : `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lab-empty",
					children: "Choose a preset or enter a supported plain-English query."
				})
			] }),
			tab === "Export" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "upload-zone lab-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 28 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Use a custom budget CSV" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Accepts the original ministry dataset or a simple ministry, year, total, revenue, capital structure." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "lab-primary",
							children: ["Choose budget CSV", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: ".csv,text/csv",
								onChange: uploadBudget
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "export-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => download("budget-raw.csv", toCsv(rows)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Raw CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: excelExport,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Excel workbook"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => download("budget-yearly-summary.csv", toCsv(yearlySummary)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Yearly summary"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => download("budget-ministry-summary.csv", toCsv(ministrySummary)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Ministry summary"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => download("budget-pivot.csv", toCsv(pivot)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Pivot table"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => download("budget-cleaned.csv", toCsv(rows)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Full cleaned dataset"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "source-link",
					href: "https://www.indiabudget.gov.in/doc/budget_at_glance/bag1.pdf",
					target: "_blank",
					rel: "noreferrer",
					children: "Government of India · Budget at a Glance 2026–27"
				})
			] })
		]
	});
}
//#endregion
//#region app/rupee-lens.tsx
var views = [
	{
		id: "overview",
		label: "Overview"
	},
	{
		id: "payments",
		label: "Transactions"
	},
	{
		id: "security",
		label: "Security logs"
	},
	{
		id: "budget",
		label: "Budget analytics"
	},
	{
		id: "method",
		label: "Methodology"
	}
];
function Wordmark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "wordmark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "lens-mark",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "₹" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "RupeeLens" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Payments, security, and public finance" })] })]
	});
}
function Shell({ active, setActive, children }) {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "masthead",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "desktop-nav",
						"aria-label": "Primary navigation",
						children: views.map((view) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: active === view.id ? "active" : "",
							onClick: () => setActive(view.id),
							children: view.label
						}, view.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mast-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "privacy-stamp",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), " Synthetic payment data"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "menu-button",
							onClick: () => setMenuOpen(true),
							"aria-label": "Open navigation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
						})]
					})
				]
			}),
			menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mobile-nav",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "close-menu",
						onClick: () => setMenuOpen(false),
						"aria-label": "Close navigation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 22 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { children: views.map((view) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setActive(view.id);
							setMenuOpen(false);
						},
						children: view.label
					}, view.id)) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "site-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Synthetic transaction and security data · Official budget source linked" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://github.com/Deepusleepy/RupeeLens",
						target: "_blank",
						rel: "noreferrer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { size: 15 }),
							" View source ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 12 })
						]
					})
				]
			})
		]
	});
}
function Overview({ navigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Investigate money from transaction to treasury." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Generate and score UPI transactions, examine five families of security logs, and explore more than a decade of Union Budget allocations." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary",
							onClick: () => navigate("payments"),
							children: ["Open transaction workspace ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary",
							onClick: () => navigate("budget"),
							children: "Explore budget data"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "trust-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 13 }), " Dual-model comparison"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 13 }), " Identifiers masked"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 13 }), " Data export included"] })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-preview",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "preview-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Transaction intelligence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "TXN0001842" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "decision-pill held",
							children: "High risk"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "preview-amount",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "₹68,000" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "P2P · Foreign · 02:00" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "preview-score",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ensemble score" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "91 / 100" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { style: { width: "91%" } }) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "preview-details",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Random Forest" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "89%" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Gradient Boost" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "93%" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "New device" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Flagged" })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Synthetic example · No customer data" })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "data-status",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Transactions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Generator, predictor, explorer, models" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Security" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Five log families and anomaly triage" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Budget" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Dashboard, forecast, query, export" })] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "overview-columns",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "feature-story",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "feature-label",
						children: "Transaction operations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "From synthetic data to scored decisions" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Generate up to 50,000 scenarios, compare two model styles, inspect performance, analyse CSV batches, and export filtered results." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mini-score",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "95.3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ACCURACY" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "green" }),
								" Predictor and explanations ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "LIVE" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "gold" }),
								" Model diagnostics ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "5 METRICS" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "rust" }),
								" Batch CSV analysis ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "1,000 ROWS" })
							] })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "story-link",
						onClick: () => navigate("payments"),
						children: ["Open transactions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "feature-story",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "feature-label",
						children: "Security and public finance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Attack patterns and allocation history" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Investigate login, session, authentication, request, and service logs; then compare ministry budgets, forecasts, queries, and exports." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "budget-spotlight",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"COMPLETE",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"ANALYTICAL WORKSPACES"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "RUPEELENS" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dual-links",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "story-link",
							onClick: () => navigate("security"),
							children: ["Security logs ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "story-link",
							onClick: () => navigate("budget"),
							children: ["Budget analytics ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "use-cases",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Included workflows" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Configurable generators, custom uploads, deep filters, drill-downs, and exports." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Model comparison, performance metrics, anomaly detection, and evidence reports." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Historical comparisons, forecasts, Smart Query, source notes, and spreadsheet output." })] })
			] })]
		})
	] });
}
function Method() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "view-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "section-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Methodology" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "What RupeeLens calculates, what the data represents, and where its limits are." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "method-intro",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Transaction and security workspaces use deterministic synthetic data so every control can be exercised without customer records. The two transaction scores are transparent browser implementations inspired by tree-ensemble feature weighting; the displayed validation metrics document the reference benchmark rather than claiming a live bank-grade model. Budget history preserves the source project’s five-ministry dataset and flags structural changes and outliers." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "method-cards",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 25 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Transaction models" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Random-Forest-style and gradient-boosting-style scores respond differently to amount, hour, location, device, failures, type, and bank context." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 25 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Security thresholds" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Brute force, abnormal sessions, credential retries, denial-of-service requests, and suspended services use documented thresholds." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { size: 25 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Budget forecasts" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Linear and polynomial directional projections include approximate 95% residual bands and explicit limitations." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 25 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Privacy" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Built-in operational data is synthetic and masked. User-uploaded files remain in the browser session and are not persisted by the app." })
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "release-boundary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Before production use" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Replace reference scoring with validated models" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Authenticate users and authorise actions" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Encrypt and minimise retained data" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Measure false positives and model drift" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add audit trails and escalation workflows" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Complete security, legal, and domain review" })
				] })]
			})
		]
	});
}
function RupeeLens() {
	const [active, setActive] = (0, import_react.useState)("overview");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		active,
		setActive,
		children: (0, import_react.useMemo)(() => active === "payments" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentWorkspace, {}) : active === "security" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecurityWorkspace, {}) : active === "budget" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetWorkspace, {}) : active === "method" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Method, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { navigate: setActive }), [active])
	});
}
//#endregion
export { RupeeLens };
