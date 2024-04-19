import Konva from 'konva';
import { feet, halfFeet } from '~/config'

export const Post = (x, y) => {

  /*main Draggble shapes */
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

  /**
   * CREATE NEW DRAGGABLE GROUP */ 

  const objectGroup = new Konva.Group({
    draggable: true,
  });


  let startCopyEnabled = false;
  let endCopyEnabled = false;

  objectGroup.on("dragstart", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();
    const { x: targetX, y: targetY } = position;

    if (targetX === x && targetY === y) {
      startCopyEnabled = true;
    }
  });

  objectGroup.on("dragend", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();
    const { x: targetX } = position;

    if (targetX < x) {
      endCopyEnabled = true;
    } else {
      target.to({
        x: x,
        y: y,
        duration: 0.2,
      });
    }

    console.log("enb", endCopyEnabled, startCopyEnabled)
    if (endCopyEnabled && startCopyEnabled) {
      alert("Enabled")
      createPost(x, y, layer)
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
  const textGroup = new Konva.Group({
    x: feet(1.2),
    y: feet(1/4)
  });

  const group = new Konva.Group({
    x: x,
    y: y,
  })

  objectGroup.add(circle, rect)
  textGroup.add(text)

  group.add(objectGroup, textGroup)


  return group
};