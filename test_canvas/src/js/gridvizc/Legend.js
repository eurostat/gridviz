//@ts-check

import { Style } from "./Style";
import { select } from "d3-selection";

/**
 * 
 * @author Julien Gaffuri
 */
export class Legend {

    /**
     * @param {string} id 
     * @param {object} opts 
     */
    constructor(id, opts) {

        //the div element
        this.div = select("#" + id);
		if (this.div.empty()) {
			this.div = select("body").append("div").attr("id", id)
            .style("position", "absolute").style("left", "100px").style("top", "100px")
        }

    }

    /** */
    update() {
        console.log("Legend update not implemented yet")
    }
}
