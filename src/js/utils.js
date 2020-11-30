let loading_spinner;
let loading_bar;

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

/**
 *@function showLoading
 * @description show loading spinner
 */
export function showLoading() {
  loading_spinner.style.display = "block";
  //loading_bar.style.display = "block";
}

/**
 * @description hide loading spinner
 * @function hideLoading
 */
export function hideLoading() {
  loading_spinner.style.display = "none";
  //loading_bar.style.display = "none";
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
