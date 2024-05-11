import { feet, halfFeet } from "~/config";
import Konva from "konva";
import { createTransformer } from "./create-transformer";

const rectWidth = halfFeet
const rectHeight = feet(4)

export const createCapRail = (x, y) => {
  // const tr = createTransformer()
  // drawerLayer.add(tr)

  const transformerConfig = {
    keepRatio: true,
    rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 360],
    enabledAnchors: ["top-center", "bottom-center"],
    anchorStyleFunc: (anchor) => {
      if (anchor.hasName("rotater")) {
        const patternImage = new Image();
        patternImage.src = "/refresh.png";

        anchor.fillPatternImage(patternImage);
        anchor.height(16);
        anchor.width(16);
        anchor.strokeWidth(0);
        anchor.offsetX(8);
        anchor.offsetY(8);

        anchor.fill(null);
      }
    },
  };

  const rect = new Konva.Rect({
    width: rectWidth,
    height: rectHeight,
    stroke: "black",
    strokeWidth: 1,
  });

  var shadowRectangle = new Konva.Rect({
    width: rectWidth,
    height: rectHeight,
    fill: "#FF7B17",
    opacity: 0.6,
    stroke: "#CF6412",
    strokeWidth: 1,
    dash: [20, 2],
  });
  shadowRectangle.hide();

  /**
   CREATE NEW DRAGGABLE GROUP 
   */

  const objectGroup = new Konva.Group({
    draggable: true,
    name: "cap-rail",
    width: rectWidth,
    height: rectHeight,
  });
  objectGroup.trConfig = transformerConfig
  objectGroup.canTransform = true


  // objectGroup.on("click", () => {
  //   tr.nodes([objectGroup]);
  // });

  objectGroup.add(rect);

  objectGroup.on("dragmove", () => {
    shadowRectangle.position({
      x: Math.round(objectGroup.x() / rectWidth) * rectWidth,
      y: Math.round(objectGroup.y() / rectWidth) * rectWidth,
    });
  });

  objectGroup.on("dragstart", (e) => {
    // shadow Rectangle
    shadowRectangle.show();
    shadowRectangle.moveToTop();
    objectGroup.moveToTop();
  });

  objectGroup.on("dragend", (e) => {
    // shadow Rectangle
    objectGroup.position({
      x: Math.round(objectGroup.x() / rectWidth) * rectWidth,
      y: Math.round(objectGroup.y() / rectWidth) * rectWidth,
    });
    // shadowRectangle.position = objectGroup.position;
    // shadowRectangle.hide();
  });

  /**
   * END NEW DRAGGABLE GROUP
   */

  /* Secondarly Group */
  const text = new Konva.Text({
    text: "Cap Rail",
    offsetX: -feet(),
    fontSize: 18,
  });
  const textGroup = new Konva.Group();
  textGroup.add(text);

  const mainGroup = new Konva.Group({
    x: x,
    y: y,
  });

  mainGroup.add(objectGroup, shadowRectangle, textGroup);

  return mainGroup;
};