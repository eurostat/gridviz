//@ts-check

import { Style } from "./Style";
import { select } from "d3-selection";

/**
 * 
 * @author Julien Gaffuri
 */
export class Legend {

    constructor(id, opts) {

        this.div = select("#" + id);
		if (this.div.empty()) {
			this.div = select("body").append("div").attr("id", id)
            .style("position", "absolute").style("left", "100px").style("top", "100px")
        }
    }

}
