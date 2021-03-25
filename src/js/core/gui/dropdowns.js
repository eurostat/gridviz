/**
   * @description Creates an HTML Select element for the different D3 Scale-Chromatic functions
   * @function createColorSchemeDropdown
   * @param {Object} viewer viewer object
   */
 export function createColorSchemeDropdown(viewer) {
    let schemes = [
      {
        value: "interpolateBrBG",
        innerText: "Brown-blue-green"
      },
      {
        value: "interpolatePRGn",
        innerText: "Purple-green"
      },
      {
        value: "interpolatePiYG",
        innerText: "Pink-green"
      },
      {
        value: "interpolatePuOr",
        innerText: "Purple-orange"
      },
      {
        value: "interpolateRdBu",
        innerText: "Red-blue"
      },
      {
        value: "interpolateRdGy",
        innerText: "Red-grey"
      },
      {
        value: "interpolateRdYlBu",
        innerText: "Red-yellow-blue"
      },
      {
        value: "interpolateRdYlGn",
        innerText: "Red-yellow-green"
      },
      {
        value: "interpolateSpectral",
        innerText: "Spectral"
      },
      {
        value: "interpolateBlues",
        innerText: "Blues"
      },
      {
        value: "interpolateGreens",
        innerText: "Greens"
      },
      {
        value: "interpolateGreys",
        innerText: "Greys"
      },
      {
        value: "interpolateOranges",
        innerText: "Oranges"
      },
      {
        value: "interpolatePurples",
        innerText: "Purples"
      },
      {
        value: "interpolateReds",
        innerText: "Reds"
      },
      {
        value: "interpolateTurbo",
        innerText: "Turbo"
      },
      {
        value: "interpolateViridis",
        innerText: "Viridis"
      },
      {
        value: "interpolateInferno",
        innerText: "Inferno"
      },
      {
        value: "interpolateMagma",
        innerText: "Magma"
      },
      {
        value: "interpolatePlasma",
        innerText: "Plasma"
      },
      {
        value: "interpolateCividis",
        innerText: "Cividis"
      },
      {
        value: "interpolateWarm",
        innerText: "Warm"
      },
      {
        value: "interpolateCool",
        innerText: "Cool"
      },
      {
        value: "interpolateCubehelixDefault",
        innerText: "CubehelixDefault"
      },
      {
        value: "interpolateBuGn",
        innerText: "Blue-green"
      },
      {
        value: "interpolateBuPu",
        innerText: "Blue-purple"
      },
      {
        value: "interpolateGnBu",
        innerText: "Green-blue"
      },
      {
        value: "interpolateOrRd",
        innerText: "Orange-red"
      },
      {
        value: "interpolatePuBuGn",
        innerText: "Purple-blue-green"
      },
      {
        value: "interpolatePuBu",
        innerText: "Purple-blue"
      },
      {
        value: "interpolatePuRd",
        innerText: "Purple-red"
      },
      {
        value: "interpolateRdPu",
        innerText: "Red-purple"
      },
      {
        value: "interpolateYlGnBu",
        innerText: "Yellow-green-blue"
      },
      {
        value: "interpolateYlGn",
        innerText: "Yellow-green"
      },
      {
        value: "interpolateYlOrBr",
        innerText: "Yellow-orange-brown"
      },
      {
        value: "interpolateYlOrRd",
        innerText: "Yellow-orange-red"
      },
      {
        value: "interpolateRainbow",
        innerText: "Rainbow"
      },
      {
        value: "interpolateSinebow",
        innerText: "Sinebow"
      }
    ];
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-colorscheme-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    viewer.schemesSelect = document.createElement("select");
    viewer.schemesSelect.id = "schemes";
    viewer.schemesSelect.classList.add("gridviz-select");
    let label = document.createElement("label");
    label.for = "schemes";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = "Colour scheme: ";

    for (let i = 0; i < schemes.length; i++) {
      let scheme = schemes[i];
      let option = document.createElement("option");
      option.value = scheme.value;
      option.innerText = scheme.innerText;
      viewer.schemesSelect.appendChild(option);
    }
    viewer.schemesSelect.value = viewer.colorSchemeName_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(viewer.schemesSelect);
    viewer.selectorsContainer.appendChild(dropdown_container);
  }


  /**
   * Creates an HTML Select element for the different D3 Scale functions used to generate the colours
   * Accepted: scaleSequential or scaleDiverging & their respective variants
   * @param {Object} viewer viewer object to append the dropdown to
   */
  export function createColorScaleDropdown(viewer) {
    let scales = [
      {
        value: "scaleSequentialLog",
        innerText: "Logarithmic"
      },
      {
        value: "scaleSequentialPow",
        innerText: "Exponential"
      },
      {
        value: "scaleSequentialSqrt",
        innerText: "Square-root "
      }
    ];
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-colorscale-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    viewer.colorScaleSelect = document.createElement("select");
    viewer.colorScaleSelect.classList.add("gridviz-select");
    viewer.colorScaleSelect.id = "scales";
    let label = document.createElement("label");
    label.for = "scales";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = viewer.colorScaleSelectorLabel_;

    for (let i = 0; i < scales.length; i++) {
      let scale = scales[i];
      let option = document.createElement("option");
      option.value = scale.value;
      option.innerText = scale.innerText;
      viewer.colorScaleSelect.appendChild(option);
    }
    viewer.colorScaleSelect.value = viewer.colorScaleName_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(viewer.colorScaleSelect);
    viewer.selectorsContainer.appendChild(dropdown_container);
  }

  /**
  * Creates an HTML Select element which allows the user to select the csv field used for colouring(colorField)
* @param {Object} viewer viewer object
  */
  export function createColorFieldDropdown(viewer, gridCaches) {
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-colorfield-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    viewer.colorFieldSelect = document.createElement("select");
    viewer.colorFieldSelect.classList.add("gridviz-select");
    viewer.colorFieldSelect.id = "colorFields";
    let label = document.createElement("label");
    label.for = "colorFields";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = viewer.colorFieldSelectorLabel_;

    let fields = Object.keys(gridCaches[viewer.resolution_][0]);
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (field.toLowerCase() !== "x" && field.toLowerCase() !== "y" && field !== "color") {
        let option = document.createElement("option");
        option.value = field;
        option.innerText = field;
        viewer.colorFieldSelect.appendChild(option);
      }
    }
    viewer.colorFieldSelect.value = viewer.colorField_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(viewer.colorFieldSelect);
    viewer.selectorsContainer.appendChild(dropdown_container);
  }


  /**
  * Creates an HTML Select element which allows the user to select the csv field used for sizing the cells (sizeField)
* @param {Object} viewer viewer object
  */
  export function createSizeFieldDropdown(viewer, gridCaches) {
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-sizefield-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    viewer.sizeFieldSelect = document.createElement("select");
    viewer.sizeFieldSelect.classList.add("gridviz-select");
    viewer.sizeFieldSelect.id = "sizeFields";
    let label = document.createElement("label");
    label.for = "sizeFields";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = viewer.sizeFieldSelectorLabel_;

    let fields = Object.keys(gridCaches[viewer.resolution_][0]);
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (field.toLowerCase() !== "x" && field.toLowerCase() !== "y" && field !== "color") {
        let option = document.createElement("option");
        option.value = field;
        option.innerText = field;
        viewer.sizeFieldSelect.appendChild(option);
      }
    }
    //option for not using sizing
    let option = document.createElement("option");
    option.value = null;
    option.innerText = "none";
    viewer.sizeFieldSelect.appendChild(option);
    //set initial value
    viewer.sizeFieldSelect.value = viewer.sizeField_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(viewer.sizeFieldSelect);
    viewer.selectorsContainer.appendChild(dropdown_container);

  }