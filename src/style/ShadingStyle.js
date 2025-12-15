//@ts-check
'use strict'

import { SideStyle } from './SideStyle.js'


/**
 * @module style
 * @author Julien Gaffuri
 */
export class ShadingStyle extends SideStyle {

}


/*


        function getShadingStyle(field, exageration = 1, reliefDirection = 1, diamond = false) {
            // compute side value as elevation difference and attach to side
            const sideValue = (side) => {
                if (!side.c1) side.v = 0
                else if (!side.c2) side.v = 0
                else if (!side.c1[field]) side.v = 0
                else if (!side.c2[field]) side.v = 0
                else side.v = +side.c2[field] - side.c1[field]
                return side.v
            }

            const scale = gridviz.exponentialScale(-exageration)
            return new gridviz.SideStyle({
                // return max side value for normalisation
                viewScale: sides => d3.max(sides, s => sideValue(s)),
                color: (side, resolution, z, max) => {
                    if (side.v == 0) return
                    let coeff = Math.abs(side.v / max)
                    coeff = scale(coeff)
                    if ((side.v * reliefDirection < 0 && side.or === 'h') || (side.v * reliefDirection > 0 && side.or === 'v'))
                        return 'rgba(255,255,255,' + coeff + ')'
                    return 'rgba(0,0,0,' + coeff + ')'
                },
                width: (side, r, z) => Math.min(2 * z, r / 3),
                diamond: diamond,
            })
        }
        const shadingStyle = getShadingStyle('v', 1, 1, false)



*/
