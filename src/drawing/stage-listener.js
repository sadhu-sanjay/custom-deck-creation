
export function stageDragListener(stage, sidebarX, sidebarY) {

    let dragStartObj; // the object which got dragged
    let sideBarShapes = ['Rect', 'Circle']

    stage.on('dragstart', (e) => {
        console.log("Here", e.target.name())
        // only Clone the object if it is in the on of the allowed shapes
        if (sideBarShapes.includes(e.target.className)) {
            dragStartObj = e.target

        }
    })

    stage.on("dragend", (e) => {

      const drawerLayer = stage.find(".drawerLayer")[0];

      const stoppedDragging = e.target.className;
      if (stoppedDragging === dragStartObj.className) {

        // Create a copy of the dragged shape outside the sidebar
        const target = e.target
        const clone = target.clone({
            x: sidebarX,
            y: sidebarY
        })

        drawerLayer.add(clone);
      }

      dragStartObj = null;
    });

}