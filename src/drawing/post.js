import Konva from 'konva';
import { feet, halfFeet } from '~/config'

export const Post = (x, y) => {

  const rectWidth = halfFeet
  const rectHeight = halfFeet
  

  /*main Draggble shapes */
  const objectGroup = new Konva.Group({
    draggable: true,
    name: 'Post',
    width: halfFeet,
    height: halfFeet
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

  const rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: rectWidth,
    height: rectHeight,
    stroke: "gray",
    offsetX: -rectWidth/2,
    offsetY: -rectHeight/2,
    strokeWidth: 1,
  });
  const circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: rectWidth,
    offsetX: -rectWidth,
    offsetY: -rectHeight,
    stroke: "gray",
    strokeWidth: 1,
  });
  objectGroup.add(circle, rect)

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

  

  return mainGroup
};