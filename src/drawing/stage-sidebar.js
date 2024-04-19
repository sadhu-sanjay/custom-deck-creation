import { Post } from "~/drawing/post";
import { createRailingPost } from "~/drawing/railing-post";
import { createCapRail } from "~/drawing/cap-rail";
import { scaleArrow } from "~/drawing/scale-arrow";
import { feet } from "~/config";
import Konva from "konva";

export const createStageSidebar = (x, y, stage, layer) => {

  const post = Post(0, 0);
//   createRailingPost(0 + feet(1/2), y + feet(1.5), layer);
//   createCapRail(0, y + feet(2.5), stage, layer);
//   scaleArrow(0 , (y + feet(4)), layer);

  const group = new Konva.Group({
    x: x,
    y: y,
  })
  group.add(post)


  layer.add(group)
};
