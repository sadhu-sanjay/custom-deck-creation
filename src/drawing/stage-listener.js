
export function stageDragListener(stage, sidebarX, sidebarY) {

    let draggableShapes = ['Post', 'railing-post', 'cap-rail'] // shapes which are allowed to be copied
    let startPosRel; // relative Start Position
    let startPosAbs = false;
    let shouldClone = false;

    stage.on('dragstart', (e) => {

        const targetName = e.target.name()
        startPosAbs = e.target.absolutePosition()
        startPosRel = e.target.position() /// realtive 

        console.log("Parent REL", e.target.getParent().position())

        if (draggableShapes.includes(targetName) && startPosAbs.x >= sidebarX ){
          shouldClone = true
        }
    })

    stage.on("dragend", (e) => {

      // let sidebarGroup = stage.find('#sidebarGroup')[0]
      const droppedPosRel = e.target.position()

      if (shouldClone && droppedPosRel.x < startPosRel.x) {
        const clone = e.target.clone(startPosRel);
        const cloneParent = e.target.getParent() // add the clone to its parent to keep its 
        // relative position Entact
        cloneParent.add(clone)
      } else if (e.target.absolutePosition().x > sidebarX) {
        e.target.to({
          ...startPosRel,
          duration: 0.2,
        });
      }

      // reset Flag
      shouldClone = false
    });

}