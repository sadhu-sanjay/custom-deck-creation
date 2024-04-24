import { Post } from "~/drawing/post";
import { createRailingPost } from "~/drawing/railing-post";
import { createCapRail } from "~/drawing/cap-rail";
import { scaleArrow } from "~/drawing/scale-arrow";
import { feet, halfFeet } from "~/config";
import { createTransformer } from "./create-transformer";

export const createStageSidebar = (sidebarX, sidebarY) => {

  // scaleArrow(0 , (y + feet(4)), layer);

  let group = new Konva.Group({
    x: sidebarX,
    y: sidebarY,
    id: 'sidebarGroup',
    name: 'Sidebar Group'
  })

  const post = Post(0, 0);
  const railingPost = createRailingPost(halfFeet, feet(1.5));
  
  const tranformerConfig = createTransformer()
  const capRail = createCapRail(0, feet(2.5));

  group.add(post, railingPost, capRail)

  return group 
};
