import Konva from "konva";

export const createPost = (x, y, layer) => {

  /*main Draggble shapes */
  const rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: 14,
    height: 14,
    stroke: "gray",
    strokeWidth: 2,
    offsetX: 7,
    offsetY: 7,
  });
  const circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: 18,
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