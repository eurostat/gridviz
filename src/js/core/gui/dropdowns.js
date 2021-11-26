/**
   * @description Creates an HTML Select element for the different D3 Scale-Chromatic functions
   * @function createColorSchemeDropdown
   * @param {Object} app app object
   */
 export function createColorSchemeDropdown(app) {
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
    app.schemesSelect = document.createElement("select");
    app.schemesSelect.id = "schemes";
    app.schemesSelect.classList.add("gridviz-select");
    let label = document.createElement("label");
    label.for = "schemes";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = "Colour scheme: ";

    for (let i = 0; i < schemes.length; i++) {
      let scheme = schemes[i];
      let option = document.createElement("option");
      option.value = scheme.value;
      option.innerText = scheme.innerText;
      app.schemesSelect.appendChild(option);
    }
    app.schemesSelect.value = app.colorSchemeName_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(app.schemesSelect);
    app.selectorsContainer.appendChild(dropdown_container);
  }


  /**
   * Creates an HTML Select element for the different D3 Scale functions used to generate the colours
   * Accepted: scaleSequential or scaleDiverging & their respective variants
   * @param {Object} app app object to append the dropdown to
   */
  export function createColorScaleDropdown(app) {
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
    app.colorScaleSelect = document.createElement("select");
    app.colorScaleSelect.classList.add("gridviz-select");
    app.colorScaleSelect.id = "scales";
    let label = document.createElement("label");
    label.for = "scales";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = app.colorScaleSelectorLabel_;

    for (let i = 0; i < scales.length; i++) {
      let scale = scales[i];
      let option = document.createElement("option");
      option.value = scale.value;
      option.innerText = scale.innerText;
      app.colorScaleSelect.appendChild(option);
    }
    app.colorScaleSelect.value = app.colorScaleName_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(app.colorScaleSelect);
    app.selectorsContainer.appendChild(dropdown_container);
  }

  /**
  * Creates an HTML Select element which allows the user to select the csv field used for colouring(colorField)
* @param {Object} app app object
  */
  export function createColorFieldDropdown(app, gridCaches) {
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-colorfield-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    app.colorFieldSelect = document.createElement("select");
    app.colorFieldSelect.classList.add("gridviz-select");
    app.colorFieldSelect.id = "colorFields";
    let label = document.createElement("label");
    label.for = "colorFields";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = app.colorFieldSelectorLabel_;

    let fields = Object.keys(gridCaches[app.currentResolution_][0]);
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (field.toLowerCase() !== "x" && field.toLowerCase() !== "y" && field !== "color") {
        let option = document.createElement("option");
        option.value = field;
        option.innerText = field;
        app.colorFieldSelect.appendChild(option);
      }
    }
    app.colorFieldSelect.value = grid.colorField;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(app.colorFieldSelect);
    app.selectorsContainer.appendChild(dropdown_container);
  }


  /**
  * Creates an HTML Select element which allows the user to select the csv field used for sizing the cells (sizeField)
* @param {Object} app app object
  */
  export function createSizeFieldDropdown(app, gridCaches) {
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-sizefield-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    app.sizeFieldSelect = document.createElement("select");
    app.sizeFieldSelect.classList.add("gridviz-select");
    app.sizeFieldSelect.id = "sizeFields";
    let label = document.createElement("label");
    label.for = "sizeFields";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = app.sizeFieldSelectorLabel_;

    let fields = Object.keys(gridCaches[app.currentResolution_][0]);
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (field.toLowerCase() !== "x" && field.toLowerCase() !== "y" && field !== "color") {
        let option = document.createElement("option");
        option.value = field;
        option.innerText = field;
        app.sizeFieldSelect.appendChild(option);
      }
    }
    //option for not using sizing
    let option = document.createElement("option");
    option.value = null;
    option.innerText = "none";
    app.sizeFieldSelect.appendChild(option);
    //set initial value
    app.sizeFieldSelect.value = grid.sizeField;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(app.sizeFieldSelect);
    app.selectorsContainer.appendChild(dropdown_container);

  }