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

        this.registerEvent()
        this.setFont(25, "monospace")
        // this.setFont(25, "Sarasa Gothic")
        // 第一行文本离边框顶部的距离
        this.topPadding = 5
        // 行号离边框左边的距离
        this.LineNumberLeftPadding = 5
        // 文本的高度
        this.textHeight = Math.round(this.context.measureText('M').width)
        // 行高
        this.lineHeight = this.textHeight + 5
        // 光标 [光标所在行, 光标所在列]
        this.cursor = [1, 1]
        // 行号线的距离到行号的距离
        this.textLeftPadding = 10
        // 行号线到文本的距离
        this.textRightPadding = 2
        // 行号
        this.numberOfLine = 1
    }

    registerEvent = function () {
        // onmousemove = function (e) {
        //     log("mouse location:", e.offsetX, e.offsetY)
        // }
        window.addEventListener("keydown", event => {
            let key = event.key
            log('event', event, key)
            this.context.fillText(key, 100, 100)
            if (key == "Enter") {
                this.newLine()
            }
        })
    }

    newLine = function () {
        this.cursor[1] += 1
        this.numberOfLine += 1
    }

    drawLineNumber = function () {
        let ctx = this.context

        ctx.fillStyle = "#000000"
        for (let i = 1; i <= this.numberOfLine; i++) {
            log("画行号", i, this.textHeight * i)
            ctx.fillText(
                i.toString(),
                this.LineNumberLeftPadding,
                this.lineHeight * i + this.topPadding
            )
        }
    }

    currentLine = function () {
        let ctx = this.context

        // 光标所在行变成灰色
        ctx.fillStyle = "#f0f0f0"
        let x = 0
        let y = this.topPadding + (this.cursor[1] - 1) * this.lineHeight
        ctx.fillRect(x, y, this.canvas.width, this.lineHeight)
    }

    draw = function () {
        let ctx = this.context
        this.currentLine()
        this.drawLineNumber()
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

