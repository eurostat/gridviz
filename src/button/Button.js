/**
 * Parent class for button elements used to interact with the gridviz viewer.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
export class Button {
    /**
     * @param {Object} opts
     * opts.parentNode
     * opts.id
     * opts.title
     * opts.class
     * opts.onClickFunction
     * opts.x
     * opts.y
     */
    constructor(opts) {
        opts = opts || {}

        this.app = opts.app
        this.parentNode = opts.app.container
        this.id = opts.id || 'button-' + Math.random()

        // create HTML node
        this.node = document.createElement('div')
        this.node.id = this.id
        if (opts.title) this.node.title = opts.title
        this.node.classList.add(opts.class)
        this.node.style.boxShadow = '0 7px 8px rgba(0,47,103,.08), 0 0 22px rgba(0,47,103,.04), 0 12px 17px rgba(0,47,103,.04), 0 -4px 4px rgba(0,47,103,.04)' //.ecl-u-shadow-3
        this.node.style.backgroundColor = '#ffffff' //.ecl-u-bg-white

        // add events
        if (opts.onClickFunction) this.node.addEventListener('onclick', opts.onClickFunction)

        //set styles
        this.node.style.position = 'absolute'
        this.node.style.cursor = 'pointer'
        this.node.style.top = opts.y +'px'
        this.node.style.left = opts.x +'px'

        // append to parent
        this.parentNode.appendChild(this.node)

    }
}

//       <div id="gridviz-fullscreen" class="ecl-u-bg-white ecl-u-shadow-3" title="Fullscreen mode">
{/* <svg
class="ecl-icon ecl-icon--m ecl-icon--none"
focusable="false"
aria-hidden="true"
>
<use xlink:href="./ec-icons.svg#fullscreen"></use>
</svg>
</div>

<div id="gridviz-zoom-btns" class="ecl-u-bg-white ecl-u-shadow-3">
<a id="zoomin" class="gridviz-zoom-button" href="#" title="Zoom in"
>+</a
>
<hr style="margin: 0px" />
<a id="zoomout" class="gridviz-zoom-button" href="#" title="Zoom out"
>−</a
>
</div> */}
