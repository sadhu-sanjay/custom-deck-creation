export function createTransformer(stage) {

  const tr = new Konva.Transformer({
    keepRatio: true,
    rotationSnaps: [0,45,90, 135,180,225, 270, 360],
    enabledAnchors: ["top-center", "bottom-center"],
    anchorStyleFunc: (anchor) => {

      if (anchor.hasName("rotater")) {
        const patternImage = new Image();
        patternImage.src = "/refresh.png";

        anchor.fillPatternImage(patternImage);
        anchor.height(16);
        anchor.width(16);
        anchor.strokeWidth(0)
        anchor.offsetX(8);
        anchor.offsetY(8);

        anchor.fill(null);
      }
    },
  });

  const rotater = tr.findOne(".rotater");
  rotater.on("mouseenter", () => {
    stage.content.style.cursor = "url(/refresh.png), auto";
  });

  rotater.on("mouseleave", () => {
    stage.content.style.cursor = "";
  });

  return tr
}