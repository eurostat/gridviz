//@ts-check
'use strict'

import { loadImage } from '../utils/utils.js'

//load chernoff images
export async function loadChernoffFacesImages(out, baseURL, callback = undefined) {
    out = out || {}
    for (let s of ["f", "m"])
        for (let a of ["y", "m", "o"])
            for (let i = 0; i <= 2; i++)
                out[s + a + i] = await loadImage(baseURL + (s + a + i) + ".png")
    if (callback) callback()
}
