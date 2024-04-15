export function Transformable(shapes) {

    const tr = new Transformer({
        nodes: shapes,
        keepRatio: true,
        enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
    })

    return tr

}