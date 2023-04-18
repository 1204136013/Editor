const log = console.log.bind(console)
const q = function (sel) {
    return document.querySelector(sel)
}

class Editor {
    constructor() {
        this.canvas = q("#editor")
        this.context = this.canvas.getContext("2d")

        this.init()
    }

    setFont = function (fontSize, text) {
        let font = fontSize + "px " + text
        this.context.font = font
    }

    init = function () {
        // onmousemove = function (e) {
        //     log("mouse location:", e.offsetX, e.offsetY)
        // }
        window.addEventListener("keydown", event => {
            log('event', event, event.key)
            this.context.fillText(event.key, 100, 100)
        })

        this.setFont(25, "monospace")
        // 第一行文本离边框顶部的距离
        this.topPadding = 5
        // 行号离边框左边的距离
        this.LineNumberLeftPadding = 5
        // 行高
        this.lineHeight = 18
        // 文本的高度
        this.textHeight = Math.round(this.context.measureText('M').width)
        // 光标 [光标所在行, 光标所在列]
        this.cursor = [0, 0]
        // 行号线的距离到行号的距离
        this.textLeftPadding = 10
        // 行号线到文本的距离
        this.textRightPadding = 2
    }

    draw = function () {
        this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillText("1", this.LineNumberLeftPadding, this.textHeight + this.topPadding)

    }

    update = function () {

    }

    clear = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    runLoop = () => {
        this.update()
        this.clear()
        this.draw()
        setTimeout(() => {
            this.runLoop()
        }, 1000 / 30)
    }

}

const main = function () {
    let e = new Editor()
    e.runLoop()
}

main()

