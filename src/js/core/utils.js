//utility functions for gridviz 

let loading_spinner;
let loading_bar;
let loading_text;

/**
 * @description CSS3 animation spinner
 *@function createLoadingSpinner
 */
export function createLoadingSpinner(container, type) {
  loading_spinner = document.createElement("div");
  loading_spinner.id = "gridviz-loading-spinner";
  loading_spinner.classList.add("lds-" + type);
  let child1 = document.createElement("div");
  loading_spinner.appendChild(child1);
  let child2 = document.createElement("div");
  loading_spinner.appendChild(child2);
  let child3 = document.createElement("div");
  loading_spinner.appendChild(child3);
  let child4 = document.createElement("div");
  loading_spinner.appendChild(child4);
  container.appendChild(loading_spinner);
}

export function createProgressBar(container) {
  // <div id="myProgress">
  // <div id="myBar"></div>
  // </div>
  loading_bar = document.createElement("div");
  loading_bar.id = "gridviz-progress-bar";
  let child1 = document.createElement("div");
  child1.id = "gridviz-progress-bar-bar"
  loading_bar.appendChild(child1);
  container.appendChild(loading_bar);
}


export function createLoadingText(container) {
  // <div id="myProgress">
  // <div id="myBar"></div>
  // </div>
  loading_text = document.createElement("div");
  loading_text.id = "gridviz-loading-text";
  loading_text.innerHTML = "Large grids can take a while to load. Please wait."
  container.appendChild(loading_text);
}


/**
 *@function showLoading
 * @description show loading spinner
 */
export function showLoading() {
  loading_spinner.style.display = "block";
  loading_text.style.display = "block";
}

/**
 * @description hide loading spinner
 * @function hideLoading
 */
export function hideLoading() {
  loading_spinner.style.display = "none";
  loading_text.style.display = "none";
}

/**
 * @description returns number with space as separator
 * @function formatNumber
 */
export function formatNumber(n) {
  return n
    .toLocaleString("en")
    .replace(/,/gi, " ")
}
