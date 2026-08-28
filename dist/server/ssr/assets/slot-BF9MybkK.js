import { i as __toESM, r as __exportAll, t as require_react } from "./react-DX6OWF7o.js";
import { g as UNMATCHED_SLOT, o as notFound } from "./navigation-ZXiI9wZP.js";
import { t as require_jsx_runtime } from "./jsx-runtime-GR0p6NjG.js";
//#region node_modules/vinext/dist/shims/slot.js
var slot_exports = /* @__PURE__ */ __exportAll({
	Children: () => Children,
	ChildrenContext: () => ChildrenContext,
	ElementsContext: () => ElementsContext,
	ParallelSlot: () => ParallelSlot,
	ParallelSlotsContext: () => ParallelSlotsContext,
	Slot: () => Slot,
	UNMATCHED_SLOT: () => UNMATCHED_SLOT
});
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_ELEMENTS = Object.freeze({});
/**
* Holds resolved AppElements (not a Promise). React 19's use(Promise) during
* hydration triggers "async Client Component" for native Promises that lack
* React's internal .status property. Storing resolved values sidesteps this.
*/
var ElementsContext = import_react.createContext(EMPTY_ELEMENTS);
var ChildrenContext = import_react.createContext(null);
var ParallelSlotsContext = import_react.createContext(null);
function Slot({ id, children, parallelSlots }) {
	const elements = import_react.useContext(ElementsContext);
	if (!Object.hasOwn(elements, id)) return null;
	const element = elements[id];
	if (element === UNMATCHED_SLOT) notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallelSlotsContext.Provider, {
		value: parallelSlots ?? null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChildrenContext.Provider, {
			value: children ?? null,
			children: element
		})
	});
}
function Children() {
	return import_react.useContext(ChildrenContext);
}
function ParallelSlot({ name }) {
	return import_react.useContext(ParallelSlotsContext)?.[name] ?? null;
}
//#endregion
export { Slot as n, slot_exports as r, ElementsContext as t };
