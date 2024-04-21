import Konva from 'konva';
import { feet, halfFeet } from '~/config'

export const Post = (x, y, stageSidebarX, stageSidebarY, group) => {

  /*main Draggble shapes */
  const objectGroup = new Konva.Group({
    draggable: true,
  });

  const textGroup = new Konva.Group({
    x: feet(1.2),
    y: feet(1/4)
  });

  const mainGroup = new Konva.Group({
    x: x,
    y: y,
  })

  mainGroup.add(objectGroup, textGroup)

  const rectWidth = halfFeet
  const rectHeight = halfFeet
  const rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: rectWidth,
    height: rectHeight,
    stroke: "gray",
    offsetX: -rectWidth/2,
    offsetY: -rectHeight/2,
  });
  const circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: rectWidth,
    offsetX: -rectWidth,
    offsetY: -rectHeight,
    stroke: "gray",
  });
  objectGroup.add(circle, rect)

  let startCopyEnabled = false;
  let endCopyEnabled = false;

  objectGroup.on("dragstart", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();
    const { x: targetX, y: targetY } = position;

    if (targetX === stageSidebarX && targetY === stageSidebarY) {
      startCopyEnabled = true;
    }

  });

  objectGroup.on("dragend", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();
    const { x: targetX, y: targetY } = position;

    if (targetX < stageSidebarX) {
      endCopyEnabled = true;
    } else {
      target.to({
        x: x,
        y: y,
        duration: 0.2,
      });
    }

    if (endCopyEnabled && startCopyEnabled) {

      console.log(group.position().x)
      console.log(group.position().y)

      const clone = mainGroup.clone({
        x: group.position().x,
        y: group.position().y
      })
      console.log("Clone", clone)

      group.add(clone)

    }

    // Reset flags
    endCopyEnabled = false;
    startCopyEnabled = false;

  });

  /**
   * END NEW DRAGGABLE GROUP
   */
    
  /**
   * Turn Transformable
   */
  // const tr1 = new Konva.Transformer({
  //   nodes: [mainGroup],
  // })
  // layer.add(tr1)
  /**
   * End Transformable
   */

  /* Secondarly Group */
  const text = new Konva.Text({
    x: 0,
    y: 0,
    text: "Post",
    draggable: false,
    // offsetX: -feet(1.5),
    // offsetY: -rectWidth/2,
    fontSize: 18,
  });
  textGroup.add(text)

  group.add(mainGroup)
};