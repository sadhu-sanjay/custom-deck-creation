
export function stageDragListener(stage) {

    let draggedClsName;
    let sideBarShapes = ['Rect', 'Circle']

    stage.on('dragstart', (e) => {

        const startedDraggingObj = e.target.className
        if (sideBarShapes.includes(draggedClass)) {
            draggedClsName = draggedClass
        }
    })

    stage.on('dragend', (e) => {

        const startedDraggingObj = 
        if (draggedClsName && e.target.className == sideBarShapes(e.target.className))
    })
}