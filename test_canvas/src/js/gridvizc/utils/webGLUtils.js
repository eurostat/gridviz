//@ts-check



/**  */
export function makeWebGLCanvas(cg) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", cg.w);
    canvas.setAttribute("height", cg.h);
    const gl = canvas.getContext("webgl");
    if (!gl) {
        console.error(gl, "Unable to initialize WebGL. Your browser or machine may not support it.");
        return
    }
    return { canvas: canvas, gl: gl }
}

// Initialize a shader program, so WebGL knows how to draw our data
export function initShaderProgram(gl, ...shaders) {
    const program = gl.createProgram();
    for (const shader of shaders) gl.attachShader(program, shader);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
    throw new Error(gl.getProgramInfoLog(program));
}


// creates a shader of the given type, uploads the source and compiles it.
export function createShader(gl, type, ...sources) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, sources.join("\n"));
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    throw new Error(gl.getShaderInfoLog(shader));
}


/**
 * Check if webGL is supported
 * 
 * @returns {boolean}
 */
export function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas');
        return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (err) {
        return false;
    }
};