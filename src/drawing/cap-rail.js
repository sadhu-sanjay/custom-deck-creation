import { feet } from "~/config";
import Konva from "konva";

const rectWidth = feet / 2
const rectHeight = feet * 8

export const createCapRail = (x, y, drawerLayer, tr) => {
    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: rectWidth,
      height: rectHeight,
      stroke: "black",
      strokeWidth: 2,
    });

    /**
   * CREATE NEW DRAGGABLE GROUP */ 

  const mainGroup = new Konva.Group({
    x: x,
    y: y,
    draggable: true,
  });
  mainGroup.on('click', () => {
    tr.nodes([mainGroup])
  })
  
  mainGroup.add(rect)

  let startCopyEnabled = false;
  let endCopyEnabled = false;

  mainGroup.on('dragmove', () => {
    shadowRectangle.position({
      x: Math.round(mainGroup.x() / rectWidth) * rectWidth ,
      y: Math.round(mainGroup.y() / rectWidth) * rectWidth ,
    })
  })
  mainGroup.on("dragstart", (e) => {

    // shadow Rectangle
    shadowRectangle.show();
    shadowRectangle.moveToTop();
    mainGroup.moveToTop();

    const target = e.target;
    const position = target.getAbsolutePosition();
    const { x: targetX, y: targetY } = position;

    if (targetX === x && targetY === y) {
      startCopyEnabled = true;
    }
  });

  mainGroup.on("dragend", (e) => {

    // shadow Rectangle
    mainGroup.position({
      x: Math.round(mainGroup.x() / rectWidth) * rectWidth,
      y: Math.round(mainGroup.y() / rectWidth) * rectWidth 
    })
    shadowRectangle.position = mainGroup.position
    shadowRectangle.hide()

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
      createCapRail(x, y, drawerLayer, tr)
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
      text: "Cap Rail",
      offsetX: -feet,
      fontSize: 18,
    });
    const textGroup = new Konva.Group({
      x: x,
      y: y,
    });
    textGroup.add(text)
  
    drawerLayer.add(mainGroup, textGroup, shadowRectangle);
  };