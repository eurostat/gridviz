import { Button } from './Button.js'

/**
 * Button for toggling fullscreen mode
 *
 * @module button
 * @author Joseph Davies, Julien Gaffuri
 */
export class ZoomButtons extends Button {
    /**
     * @param {Object} opts
     */
    constructor(opts) {
        super(opts)

        this.onZoom = opts.onZoom // custom user event handler
        this.delta = opts.delta || 0.2
        this.div.classed('gridviz-zoom-buttons', true)

        // Create zoom in button
        this.zoomInBtn = document.createElement('a')
        this.zoomInBtn.id = 'zoom-in'
        this.zoomInBtn.className = 'gridviz-zoom-button gridviz-zoom-button--in'
        this.zoomInBtn.title = 'Zoom in'
        this.zoomInBtn.textContent = '+'
        this.zoomInBtn.addEventListener('click', (e) => {
            this.zoomIn(e)
        })
        this.zoomInBtn.addEventListener('mouseover', () => {
            this.zoomInBtn.style.backgroundColor = Button.HOVER_BACKGROUND
        })
        this.zoomInBtn.addEventListener('mouseout', () => {
            this.zoomInBtn.style.backgroundColor = Button.BACKGROUND
        })

        // Create zoom out button
        this.zoomOutBtn = document.createElement('a')
        this.zoomOutBtn.id = 'zoom-out'
        this.zoomOutBtn.className = 'gridviz-zoom-button gridviz-zoom-button--out'
        this.zoomOutBtn.title = 'Zoom out'
        this.zoomOutBtn.textContent = String.fromCharCode(0x2212) // a minus sign, as wide as the plus (not a literal character, which breaks in pages without a charset)
        this.zoomOutBtn.addEventListener('click', (e) => {
            this.zoomOut(e)
        })
        this.zoomOutBtn.addEventListener('mouseover', () => {
            this.zoomOutBtn.style.backgroundColor = Button.HOVER_BACKGROUND
        })
        this.zoomOutBtn.addEventListener('mouseout', () => {
            this.zoomOutBtn.style.backgroundColor = Button.BACKGROUND
        })

        // Set common styles for buttons
        const buttons = [this.zoomInBtn, this.zoomOutBtn]
        buttons.forEach((btn, index) => {
            btn.style.alignItems = 'center'
            btn.style.justifyContent = 'center'
            btn.style.display = 'flex'
            btn.style.border = 'none'
            btn.style.color = 'var(--gridviz-button-color, #0e47cb)'
            btn.style.fontFamily = "'Helvetica Neue', Arial, Helvetica, sans-serif"
            btn.style.textAlign = 'center'
            btn.style.textDecoration = 'none'
            btn.style.padding = '0'
            btn.style.boxSizing = 'border-box'
            // the size of the button, less its border
            btn.style.width = 'calc(var(--gridviz-button-size, 38px) - 2px)'
            btn.style.height = 'calc(var(--gridviz-button-size, 38px) - 2px)'
            btn.style.fontSize = '22px'
            btn.style.fontWeight = 'bold'
            btn.style.userSelect = 'none'
            btn.style.backgroundColor = Button.BACKGROUND
            if (index === 0) btn.style.borderBottom = '1px solid #ccc' // Zoom in button only
        })

        // Unset parent class height and display for dual buttons
        this.style('height', 'unset')
        this.style('display', 'unset')

        // Set position
        if (opts.x) {
            this.style('left', opts.x + 'px')
        } else {
            this.style('right', '10px')
        }
        if (opts.y) {
            this.style('top', opts.y + 'px')
        } else {
            this.style('top', '10px')
        }

        // Append buttons to the container
        this.div.node().appendChild(this.zoomInBtn)
        this.div.node().appendChild(this.zoomOutBtn)
    }

    /* Zoom in */
    zoomIn(e) {
        this.map.setZoom(this.map.getZoom() * (1 - this.delta)).redraw()
        if (this.onZoom) this.onZoom(e)
        if (this.map.geoCanvas.onZoomFun) this.map.geoCanvas.onZoomFun(e)
    }

    /* Zoom out */
    zoomOut(e) {
        this.map.setZoom(this.map.getZoom() * (1 + this.delta)).redraw()
        if (this.onZoom) this.onZoom(e)
        if (this.map.geoCanvas.onZoomFun) this.map.geoCanvas.onZoomFun(e)
    }
}
