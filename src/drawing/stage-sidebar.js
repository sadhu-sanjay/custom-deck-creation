import { Post } from "~/drawing/post";
import { createRailingPost } from "~/drawing/railing-post";
import { createCapRail } from "~/drawing/cap-rail";
import { scaleArrow } from "~/drawing/scale-arrow";
import { feet } from "~/config";

export const createStageSidebar = (x, y, stage, layer) => {
  
  const stageSideBarX = x
  const stageSideBarY = y

//   createRailingPost(0 + feet(1/2), y + feet(1.5), layer);
//   createCapRail(0, y + feet(2.5), stage, layer);
//   scaleArrow(0 , (y + feet(4)), layer);


  // Post(0, 0, stageSideBarX, stageSideBarY, group);
  let rect = new Konva.Rect({
    x: x,
    y: y,
    width: 36,
    height: 36,
    fill: 'red',
    draggable: true
  })


  layer.add(rect)
};
