//@ts-check

export class TiledGrid {

    constructor(url) {

        /** @type {string} */
        this.url = url;
    }

}


export class GridTile {


    constructor(data) {
        this.cells = data;
    }

}