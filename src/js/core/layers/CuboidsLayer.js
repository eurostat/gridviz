// DEPRECATED: to be re-integrated into gridviz via styles
import {
    Color,
    BoxBufferGeometry,
    MeshBasicMaterial,
    Object3D,
    Mesh,
    Vector3
} from "three";

/**
 * @description Returns a ThreeJS object of cuboid geometries
 * @export Three.Object3D
 * @class CuboidsLayer
 */
export class CuboidsLayer {

    /**
      * @param {Array<Cell>} cells
      * @param {String} colorField
      * @param {Function} colorFunction
      * @param {number} cellSize optional
      * @param {string} sizeField optional
      * @param {Function} sizeFunction optional
      */
    constructor(cells, colorField, colorFunction, cellSize, sizeField, sizeFunction) {
        // define bars object, geometry and material
        let bars = new Object3D();

        // create bar for each cell
        for (var i = 0; i < cells.length; i++) {
            let height;

            if (sizeField) {
                height = sizeFunction(cells[i][sizeField]);
            } else {
                height = cellSize;
            }

            let hex = getCellColor(colorFunction, cells[i][colorField]);
            cells[i].color = hex; //save for tooltip
            let color = new Color(hex);

            let x = parseFloat(cells[i].x);
            let y = parseFloat(cells[i].y);

            const bar = getBar(x, y, cellSize, cellSize, height, color);
            bar.lookAt(new Vector3(x, y, 0.0001));
            bars.add(bar);
        }
        return bars;
    }
}

function getCellColor(colorScaleFunction, value) {
    let hex = colorScaleFunction(parseFloat(value)); //d3 scale-chromatic
    if (hex == "rgb(NaN, NaN, NaN)") {
        hex = "#000"; //fallback to black
    }
    return hex;
}

function getBar(x, y, width, length, height, color) {
    const geometry = new BoxBufferGeometry(width, length, height);
    const material = new MeshBasicMaterial({ color: color });
    const bar = new Mesh(geometry, material);

    // const phi = (90 - lat) * Math.PI / 180;
    // const theta = (180 - lng) * Math.PI / 180;

    // bar.position.x = radius * Math.sin(phi) * Math.cos(theta);
    // bar.position.y = radius * Math.cos(phi);
    // bar.position.z = radius * Math.sin(phi) * Math.sin(theta);

    bar.position.x = x;
    bar.position.y = y;
    bar.position.z = 0.001 + (height / 2);

    return bar;
}
