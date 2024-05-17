import { fourInches, halfFeet } from "~/config";
import { createTransformer } from "./create-transformer";
import { DECKLAYER } from "~/config";

export function stageDragListener(stage, sidebarX, sidebarY, deckLayer) {

    let draggableShapes = ['Post', 'railing-post', 'cap-rail', 'beam'] // shapes which are allowed to be copied
    let startPosRel; // relative Start Position
    let startPosAbs = false;
    let shouldClone = false;
    let tr = new Konva.Transformer()

    stage.on('click', (e) => {


      const objectGroup = e.target.getParent();
      if (objectGroup && objectGroup.attrs.canTransform) {

        console.log("AFter", typeof objectGroup, objectGroup.canTransform)
        const trConfig = objectGroup.attrs.trConfig;

        // use the old Transformer if present
        const res = deckLayer.find("Transformer");
        const oldTr = res[0];

        if (oldTr) {
          console.log("Hi There", oldTr);
          tr.attr = oldTr.attr;
        } else {
          tr = new Konva.Transformer(trConfig);
          deckLayer.add(tr);
        }

        tr.nodes([objectGroup]);
      }

    })

    stage.on('dragstart', (e) => {

        const targetName = e.target.name()
        startPosAbs = e.target.absolutePosition()
        startPosRel = e.target.position() /// realtive 

        if (draggableShapes.includes(targetName) && startPosAbs.x >= sidebarX ){
          shouldClone = true
        }
    })

    stage.on('dragmove', (e) => {

      const baseWidth = e.target.width()
      const baseHeight = e.target.width()

      const snapX = Math.round(e.target.position().x / baseWidth) * baseWidth
      const snapY = Math.round(e.target.position().y / baseHeight) * baseHeight

      e.target.position({
        x: snapX,
        y: snapY
      })

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