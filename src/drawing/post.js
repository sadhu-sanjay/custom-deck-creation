import Konva from "konva";

export const createPost = (x, y, layerObjectPicker) => {

  /*main Draggble shapes */
  const rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: 14,
    height: 14,
    stroke: "gray",
    strokeWidth: 2,
    offsetX: 7,
    offsetY: 7,
  });
  const circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: 18,
    stroke: "gray",
    fill: "white",
  });

  /* Primary Group */
  const mainGroup = new Konva.Group({
    x: x,
    y: y,
    draggable: true,
  });
  mainGroup.add(circle, rect);

  /* Secondarly Group */
  const text = new Konva.Text({
    x: 0,
    y: 0,
    text: "Post",
    draggable: false,
    offsetX: -30,
    offsetY: 8,
    fontSize: 18,
  });
  const textGroup = new Konva.Group({
    x: x,
    y: y,
  });
  textGroup.add(text)

  
  var startCopyEnabled = false;
  var endCopyEnabled = false;

  mainGroup.on("dragstart", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();

    const targetX = position.x;
    const targetY = position.y;

    // dont crate a copy if its not the sidebar circle
    console.log(targetX == x);
    console.log(targetY, y);
    if (targetX == x && targetY == y) {
      startCopyEnabled = true;
    }
  });

  mainGroup.on("dragend", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();

    const targetX = position.x;
    const targetY = position.y;

    if (targetX < x) {
      endCopyEnabled = true;
    } else {
      target.to({
        x: x,
        y: y,
        duration: 0.2, // Animation duration (in seconds) to snap back to original position
      });
    }

    if (endCopyEnabled && startCopyEnabled) {
      createPost(x, y, layerObjectPicker);
    }

    // reset Flags
    endCopyEnabled = false;
    startCopyEnabled = false;
  });

  layerObjectPicker.add(mainGroup, textGroup);
};