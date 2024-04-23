import Konva from "konva";

export function stageDragListener(stage, sidebarX, sidebarY) {

    let draggableShapes = ['Post'] // shapes which are allowed to be copied
    let startPosRel; // relative Start Position
    let shouldClone = false;

    stage.on('dragstart', (e) => {
        const targetName = e.target.name()
        const targetPos = e.target.absolutePosition()
        startPosRel = e.target.position() /// realtive 

        if (draggableShapes.includes(targetName) && targetPos.x >= sidebarX){
          shouldClone = true
          console.log("Should clone")
        }
    })

    stage.on("dragend", (e) => {

      let sidebarGroup = stage.find('#sidebarGroup')[0]
      const droppedPosRel = e.target.position()

      if (shouldClone && droppedPosRel.x < startPosRel.x) {
        const clone = e.target.clone(startPosRel);
        sidebarGroup.add(clone);
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