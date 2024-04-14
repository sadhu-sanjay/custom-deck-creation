import { createDraggableGroup } from "./draggable-group";

export const createCapRail = (x, y, drawerLayer) => {
    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: 14,
      height: 114,
      stroke: "black",
      strokeWidth: 2,
      offsetX: 7,
      offsetY: 7,
    });
    const group = createDraggableGroup(x, y, [rect])
  
    /* Secondarly Group */
    const text = new Konva.Text({
      x: 0,
      y: 0,
      text: "Cap Rail",
      offsetX: -30,
      offsetY: 8,
      fontSize: 18,
    });
    const textGroup = new Konva.Group({
      x: x,
      y: y,
    });
    textGroup.add(text)
  
    drawerLayer.add(group, textGroup);
  };