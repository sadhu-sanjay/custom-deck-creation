import { feet } from "~/config";
import Konva from "konva";

export const createRailingPost = (x, y) => {

  const postWidth = feet(1/2)
  const postHeight = feet(1/2)

  const rect = new Konva.Rect({
    width: postWidth,
    height: postHeight,
    fill: 'black',
  });

  /**
   * CREATE NEW DRAGGABLE GROUP */ 
  const objectGroup = new Konva.Group({
    draggable: true,
    offsetX: postWidth/2,
    offsetY: postWidth/2,
    name: 'railing-post'
  });
  objectGroup.add(rect)


  /**
   * END NEW DRAGGABLE GROUP
   */
  
  /* Secondarly Group */
  const text = new Konva.Text({
    text: "Railing Post",
    fontSize: 18,
  });

  const textGroup = new Konva.Group({
    offsetX: -feet(3/4),
    offsetY: text.getTextHeight()/2
  })
  textGroup.add(text)
  
  const mainGroup = new Konva.Group({
    x: x,
    y: y,
  })
  mainGroup.add(objectGroup, textGroup)

  return mainGroup
}