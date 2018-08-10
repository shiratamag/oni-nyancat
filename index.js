const path = require("path")


const activate = (Oni) => {
    const React = Oni.dependencies.React;
    const nyanStatusBarItem = Oni.statusBar.createItem(1, 0)
    const imagePath = path.join(__dirname, "images")

    const setMode = (mode) => {

        const getImageForMode = (m) => {
            switch (m) {
                case "insert":
                    return path.join(imagePath, "nyancat.gif")
                case "replace":
                    return path.join(imagePath, "nyancat.jpg")
                case "visual":
                    return path.join(imagePath, "nyancat-b.gif")
                default:
                    return path.join(imagePath, "nyancat.jpg")
            }
        }

        const parseMode = (m) => {
            // Need to change modes like `cmdline_insert`
            if (m.indexOf("_") >= 0) {
                return m.split("_")[1]
            } else {
                return m
            }
        }

        const style = {
            width: "auto",
            height: "100%",
            display: "flex",
            "align-items": "center",
            //    "padding-left": "8px",
            //   "padding-right": "8px",
            //  "text-transform": "uppercase",
        }

        const src = getImageForMode(mode)
        const modeElement = React.createElement("div", {style},
            React.createElement("img", {src, style}))
        nyanStatusBarItem.setContents(modeElement)
    }

    Oni.editors.anyEditor.onModeChanged.subscribe((evt) => {
        setMode(evt)
    })

    setMode("normal")
    nyanStatusBarItem.show()
}

module.exports = {
    activate
}
