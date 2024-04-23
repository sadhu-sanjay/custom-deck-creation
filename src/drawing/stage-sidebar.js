import { Post } from "~/drawing/post";
import { createRailingPost } from "~/drawing/railing-post";
import { createCapRail } from "~/drawing/cap-rail";
import { scaleArrow } from "~/drawing/scale-arrow";
import { feet } from "~/config";

export const createStageSidebar = (sidebarX, sidebarY) => {
  
//   createRailingPost(0 + feet(1/2), y + feet(1.5), layer);
//   createCapRail(0, y + feet(2.5), stage, layer);
//   scaleArrow(0 , (y + feet(4)), layer);

  let group = new Konva.Group({
    x: sidebarX,
    y: sidebarY,
    id: 'sidebarGroup',
    name: 'Sidebar Group'
  })

  // Post(0, 0, stageSideBarX, stageSideBarY, group);
  let rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: 36,
    height: 36,
    fill: "red",
    draggable: true,
    name: "Post",
    id: 'post'
  });
  group.add(rect)

  return group 
};
