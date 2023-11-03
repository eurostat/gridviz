import { Button } from './Button.js'
// duration	number (defaults to 250)
// Animation duration in milliseconds.

// className	string (defaults to 'ol-zoom')
// CSS class name.

// zoomInClassName	string (defaults to className + '-in')
// CSS class name for the zoom-in button.

// zoomOutClassName	string (defaults to className + '-out')
// CSS class name for the zoom-out button.

// zoomInLabel	string | HTMLElement (defaults to '+')
// Text label to use for the zoom-in button. Instead of text, also an element (e.g. a span element) can be used.

// zoomOutLabel	string | HTMLElement (defaults to '–')
// Text label to use for the zoom-out button. Instead of text, also an element (e.g. a span element) can be used.

// zoomInTipLabel	string (defaults to 'Zoom in')
// Text label to use for the button tip.

// zoomOutTipLabel	string (defaults to 'Zoom out')
// Text label to use for the button tip.

// delta	number (defaults to 1)
// The zoom delta applied on each click.

// target	HTMLElement | string | undefined
// Specify a target if you want the control to be rendered outside of the map's viewport.

/**
 * Button for toggling fullscreen mode
 *
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

        // zoom in btn
        this.zoomInBtn = document.createElement('a')
        this.zoomInBtn.innerHTML = `<a id="zoomin" class="gridviz-zoom-button" title="Zoom in">+</a>`
        this.zoomInBtn.addEventListener('click', (e)=>{this.zoomIn(e)})
        this.zoomInBtn.addEventListener('mouseover', (e)=>{this.zoomInBtn.style.backgroundColor = 'lightgrey'})
        this.zoomInBtn.addEventListener('mouseout', (e)=>{this.zoomInBtn.style.backgroundColor = '#ffffff'})

        // zoom out btn
        this.zoomOutBtn = document.createElement('a')
        this.zoomOutBtn.innerHTML = `<a id="zoomin" class="gridviz-zoom-button" title="Zoom out">-</a>`
        this.zoomOutBtn.addEventListener('click', (e)=>{this.zoomOut(e)})
        this.zoomOutBtn.addEventListener('mouseover', (e)=>{this.zoomOutBtn.style.backgroundColor = 'lightgrey'})
        this.zoomOutBtn.addEventListener('mouseout', (e)=>{this.zoomOutBtn.style.backgroundColor = '#ffffff'})

        //set styles
        let btns = [this.zoomInBtn, this.zoomOutBtn]
        btns.forEach((btn, i)=>{
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.width = '30px';
            btn.style.height = '30px';
            btn.style.display = 'flex';
            btn.style.border = 'none';
            btn.style.color = 'black';
            btn.style.textAlign = 'center';
            btn.style.textDecoration = 'none';
            btn.style.padding = '4px';
            btn.style.fontSize = '20px';
            btn.style.fontWeight = 'bold';
            if (i==0) btn.style.borderBottom = '1px solid grey'
        })

        // append to button container
        this.node.appendChild(this.zoomInBtn)
        this.node.appendChild(this.zoomOutBtn)
    }

    /* Zoom in */
    zoomIn(e) {
        this.app.setZoomFactor(this.app.getZoomFactor() * (1 - this.delta)).redraw()
        if (this.onZoom) this.onZoom(e)
    }

    /* Zoom out */
    zoomOut(e) {
        this.app.setZoomFactor(this.app.getZoomFactor() * (1 + this.delta)).redraw()
        if (this.onZoom) this.onZoom(e)
    }
}
