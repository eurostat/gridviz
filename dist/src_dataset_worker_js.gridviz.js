(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gridviz"] = factory();
	else
		root["gridviz"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/dataset/worker.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
self.onmessage = function (e) {
    const { type, cells, preprocess } = e.data
    if (type === 'processCells') {
        const result = processCells(cells, preprocess)
        self.postMessage({ type: 'processedCells', result })
    }
}

function processCells(cells, preprocess) {
    // If no preprocess function is provided, return the cells as they are
    if (!preprocess) {
        return cells
    }

    // Apply preprocess function to each cell if available
    const preprocessedCells = cells.map((cell) => preprocess(cell)).filter((cell) => cell !== false)
    return preprocessedCells
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2RhdGFzZXRfd29ya2VyX2pzLmdyaWR2aXouanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87O1VDVkE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7OztBQ05BO0FBQ0EsWUFBWSwwQkFBMEI7QUFDdEM7QUFDQTtBQUNBLDJCQUEyQixnQ0FBZ0M7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ncmlkdml6L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9ncmlkdml6L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dyaWR2aXovd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL2RhdGFzZXQvd29ya2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImdyaWR2aXpcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZ3JpZHZpelwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07Iiwic2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgY29uc3QgeyB0eXBlLCBjZWxscywgcHJlcHJvY2VzcyB9ID0gZS5kYXRhXHJcbiAgICBpZiAodHlwZSA9PT0gJ3Byb2Nlc3NDZWxscycpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBwcm9jZXNzQ2VsbHMoY2VsbHMsIHByZXByb2Nlc3MpXHJcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IHR5cGU6ICdwcm9jZXNzZWRDZWxscycsIHJlc3VsdCB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzQ2VsbHMoY2VsbHMsIHByZXByb2Nlc3MpIHtcclxuICAgIC8vIElmIG5vIHByZXByb2Nlc3MgZnVuY3Rpb24gaXMgcHJvdmlkZWQsIHJldHVybiB0aGUgY2VsbHMgYXMgdGhleSBhcmVcclxuICAgIGlmICghcHJlcHJvY2Vzcykge1xyXG4gICAgICAgIHJldHVybiBjZWxsc1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGx5IHByZXByb2Nlc3MgZnVuY3Rpb24gdG8gZWFjaCBjZWxsIGlmIGF2YWlsYWJsZVxyXG4gICAgY29uc3QgcHJlcHJvY2Vzc2VkQ2VsbHMgPSBjZWxscy5tYXAoKGNlbGwpID0+IHByZXByb2Nlc3MoY2VsbCkpLmZpbHRlcigoY2VsbCkgPT4gY2VsbCAhPT0gZmFsc2UpXHJcbiAgICByZXR1cm4gcHJlcHJvY2Vzc2VkQ2VsbHNcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=