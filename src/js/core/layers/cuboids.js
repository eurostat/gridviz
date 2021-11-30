
import {
    Color,
    BoxBufferGeometry,
    MeshBasicMaterial,
    Object3D,
    Mesh,
    Vector3
} from "three";

function addCuboidsToScene(cellSize, colorField, sizeField) {
    // define bars object, geometry and material
    const bars = new Object3D();

    // create bar for each cell
    for (var i = 0; i < pointsArray.length; i++) {
        let height;

        if (grid.sizeField) {
            height = app.sizeScaleFunction_(pointsArray[i][grid.sizeField]);
        } else {
            height = grid.cellSize;
        }

        let hex = getCellColor(app, pointsArray[i][grid.colorField]);
        pointsArray[i].color = hex; //save for tooltip
        let color = new Color(hex);

        let x = parseFloat(pointsArray[i].x);
        let y = parseFloat(pointsArray[i].y);

        const bar = getBar(x, y, grid.cellSize, grid.cellSize, height, color);
        bar.lookAt(new Vector3(x, y, 0.0001));
        bars.add(bar);
    }

    // add bars to the viewer
    app.pointsLayer = bars;
    app.viewer.scene.add(bars);
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