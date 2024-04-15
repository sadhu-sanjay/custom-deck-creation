

export function createGraphLayer( stageWidth, stageHeight) {

    const graphLayer = new Konva.Layer()

    const xSnaps = Math.round(stageWidth/30)
    const ySnaps = Math.round(stageHeight/30)
    const cellWidth = stageWidth/xSnaps
    const cellHeight = stageHeight/ySnaps

    console.log(xSnaps, ySnaps, cellWidth, cellHeight)

    for (let i = 0; i < xSnaps; i++) {
        const line = new Konva.Line({
            x: i* cellWidth,
            points: [0,0,0,stageHeight],
            strokeWidth: 2,
            stroke: 'lightblue',
        })
        graphLayer.add(line)
    }

    for (let i = 0; i < ySnaps; i++) {
        const horizontalLine = new Konva.Line({
            y: i * cellHeight,
            points: [0,0,stageWidth, 0],
            stroke: 'lightblue',
            strokeWidth: 1,
        })
        graphLayer.add(horizontalLine)
    }

    return graphLayer
}