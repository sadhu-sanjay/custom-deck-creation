import { feet } from '~/config'

export const createPost = (x, y, layer) => {

  /*main Draggble shapes */
  const rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: feet/3,
    height: feet/3,
    stroke: "gray",
    strokeWidth: 2,
  });
  const circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: feet/2,
    stroke: "gray",
    fill: "white",
  });

  /**
   * CREATE NEW DRAGGABLE GROUP */ 

  const mainGroup = new Konva.Group({
    x: x,
    y: y,
    draggable: true,
  });

  mainGroup.add(circle, rect)

  let startCopyEnabled = false;
  let endCopyEnabled = false;

  mainGroup.on("dragstart", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();
    const { x: targetX, y: targetY } = position;

    if (targetX === x && targetY === y) {
      startCopyEnabled = true;
    }
  });

  mainGroup.on("dragend", (e) => {
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

    if (endCopyEnabled && startCopyEnabled) {
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
    offsetX: -30,
    offsetY: 8,
    fontSize: 18,
  });
  const textGroup = new Konva.Group({
    x: x,
    y: y,
  });
  textGroup.add(text)

  layer.add(mainGroup, textGroup);
};