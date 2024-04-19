import { feet } from "~/config";

export const createRailingPost = (x, y, drawerLayer) => {
  const rectWidth = feet/3
  const rectHeight = feet/3

  const rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: rectWidth,
    height: rectHeight,
    fill: 'black',
    offsetX: rectWidth/2,
    offsetY: rectWidth/2
  });

  /**
   * CREATE NEW DRAGGABLE GROUP */ 
  const mainGroup = new Konva.Group({
    x: x,
    y: y,
    draggable: true,
  });

  mainGroup.add(rect)

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
      createRailingPost(x, y, drawerLayer)
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
    text: "Railing Post",
    offsetX: -feet,
    offsetY: feet/4,
    fontSize: 18,
  });
  const textGroup = new Konva.Group({
    x: x,
    y: y,
  });
  textGroup.add(text)
  
  drawerLayer.add(mainGroup, textGroup)
              
}