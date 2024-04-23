import { Post } from "~/drawing/post";
import { createRailingPost } from "~/drawing/railing-post";
import { createCapRail } from "~/drawing/cap-rail";
import { scaleArrow } from "~/drawing/scale-arrow";
import { feet, halfFeet } from "~/config";

export const createStageSidebar = (sidebarX, sidebarY) => {

//   createCapRail(0, y + feet(2.5), stage, layer);
//   scaleArrow(0 , (y + feet(4)), layer);

  let group = new Konva.Group({
    x: sidebarX,
    y: sidebarY,
    id: 'sidebarGroup',
    name: 'Sidebar Group'
  })

  const post = Post(0, 0);
  const railingPost = createRailingPost(halfFeet, feet(1.5));

  group.add(post, railingPost)

  return group 
};
