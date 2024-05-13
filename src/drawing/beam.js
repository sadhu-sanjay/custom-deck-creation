import Konva from "konva";
import { feet, halfFeet } from "~/config";

const rectWidth = halfFeet
const rectHeight = feet(4)

export const createBeam = (x, y) => {

  const transformerConfig = {
    keepRatio: true,
    rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 360],
    enabledAnchors: ["top-center", "bottom-center"],
    ignoreStroke: true,
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
    strokeScaleEnabled: false,
  });
  const line = new Konva.Line({
    points: [rectWidth/2, 0, rectWidth/2, rectHeight],
    stroke: "black",
    strokeWidth: 1,
    strokeScaleEnabled: false,
  })

  var shadowRectangle = new Konva.Rect({
    width: rectWidth,
    height: rectHeight,
    fill: "#FF7B17",
    opacity: 0.6,
    stroke: "#CF6412",
    strokeWidth: 1,
    dash: [20, 2],
  });

  /**
   CREATE NEW DRAGGABLE GROUP 
   */

  const objectGroup = new Konva.Group({
    draggable: true,
    name: "beam",
    width: rectWidth,
    height: rectHeight,
  });
  objectGroup.trConfig = transformerConfig
  objectGroup.canTransform = true


  objectGroup.add(rect, line);

  objectGroup.on("dragmove", (e) => {

    objectGroup.position({
      x: Math.round(objectGroup.x() / rectWidth) * rectWidth,
      y: Math.round(objectGroup.y() / rectWidth) * rectWidth,
    });

  });

  objectGroup.on("dragend", (e) => {
    objectGroup.position({
      x: Math.round(objectGroup.x() / rectWidth) * rectWidth,
      y: Math.round(objectGroup.y() / rectWidth) * rectWidth,
    });
  });

  /**
   * END NEW DRAGGABLE GROUP
   */

  /* Secondarly Group */
  const text = new Konva.Text({
    text: "Beam",
    offsetX: -feet(),
    fontSize: 18,
  });
  const textGroup = new Konva.Group();
  textGroup.add(text);

  const mainGroup = new Konva.Group({
    x: x,
    y: y,
  });

  mainGroup.add(objectGroup, textGroup);

  return mainGroup;
};