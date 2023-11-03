/**
 * Button for toggling fullscreen mode
 *
 * @author Joseph Davies, Julien Gaffuri
 */
export class FullscreenButton extends Button {
    /**
     * @param {Object} opts
     * opts.parentNode - the node that the button is appended to
     * opts.canvas - the gridviz canvas
     * opts.id
     * opts.title - HTML title attribute
     * opts.class - css class
     * opts.onClickFunction
     * opts.x - CSS x position
     * opts.y - CSS y position
     */
    constructor(opts) {
        opts.onClickFunction = opts.onClickFunction || this.onClickFunction
        super(opts)

        // append fullscreen icon to button container
        this.node.innerHTML = `
        <svg
            style="height: 1.5rem; width: 1.5rem;"
            focusable="false"
            aria-hidden="true"
        >
            <symbol viewBox="0 0 48 48" id="fullscreen" xmlns="http://www.w3.org/2000/svg"><path d="M8 30v10h10v4H4V30h4Zm36 0v14H30v-4h10V30h4ZM18 4v4H8v10H4V4h14Zm26 0v14h-4V8H30V4h14Z"/></symbol>
        </svg>
        `

        this.isFullscreen = false
    }

    onClickFunction() {
        if (this.isFullscreen) {
            this.closeFullscreen(containerDiv)
            //resize canvas to default
            // have to remove previous canvas and rebuild otherwise gridviz just keeps appending new ones
            let existing = containerDiv.querySelector('canvas')
            containerDiv.removeChild(existing)
            app = buildApp(defaultHeight, defaultWidth)
            update()
            this.isFullscreen = false
        } else {
            this.openFullscreen(containerDiv)
            //resize canvas to fullscreen
            // have to remove previous canvas otherwise gridviz just keeps appending new ones
            let existing = containerDiv.querySelector('canvas')
            containerDiv.removeChild(existing)
            app = buildApp(window.screen.height, window.screen.width)
            update()
            this.isFullscreen = true
            //"cut and paste" tooltip into containerDiv for fullscreen mode
            if (!containerDiv.querySelector('#tooltip_eurostat')) {
                containerDiv.appendChild(document.getElementById('tooltip_eurostat'))
            }
        }
    }

    /* Open fullscreen */
    openFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen()
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen()
        }
    }

    /* Close fullscreen */
    closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen()
        }
    }
}
