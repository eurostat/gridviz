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
        this.parentNode = opts.parentNode || opts.app.container
        this.id = opts.id || 'button-' + Math.random()

        // create HTML node
        this.node = document.createElement('div')
        this.node.id = this.id
        if (opts.title) this.node.title = opts.title
        if (opts.class) this.node.classList.add(opts.class) 

        // add events
        if (opts.onClickFunction) this.node.addEventListener('onclick', opts.onClickFunction)
        this.node.addEventListener('mouseover', (e)=>{this.node.style.backgroundColor = 'lightgrey'})
        this.node.addEventListener('mouseout', (e)=>{this.node.style.backgroundColor = '#ffffff'})

        //set styles
        this.node.classList.add(opts.class)
        this.node.style.boxShadow =
            '0 7px 8px rgba(0,47,103,.08), 0 0 22px rgba(0,47,103,.04), 0 12px 17px rgba(0,47,103,.04), 0 -4px 4px rgba(0,47,103,.04)' //.ecl-u-shadow-3
        this.node.style.backgroundColor = '#ffffff' //.ecl-u-bg-white
        this.node.style.position = 'absolute'
        this.node.style.cursor = 'pointer'
         this.node.style.display = 'flex'
        this.node.style.justifyContent = 'center'
        this.node.style.alignItems = 'center'
        this.node.style.width = '30px'
        this.node.style.height = '30px'
        // this.node.style.padding = '4px'
        this.node.style.top = opts.y + 'px'
        this.node.style.left = opts.x + 'px'

        // append to parent
        this.parentNode.appendChild(this.node)
    }
}
