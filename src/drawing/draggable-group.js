export const createDraggableGroup = (x, y, shapes, layer) => {

  const group = new Konva.Group({
    x: x,
    y: y,
    draggable: true,
  });

  group.add(...shapes);

  let startCopyEnabled = false;
  let endCopyEnabled = false;

  group.on("dragstart", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();
    const { x: targetX, y: targetY } = position;

    if (targetX === x && targetY === y) {
      startCopyEnabled = true;
    }
  });

  group.on("dragend", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();
    const { x: targetX } = position;

    if (targetX < x) {
      endCopyEnabled = true;
    } else {
      target.to({
        x: x,
        y: y,
        duration: 0.2,
      });
    }

    if (endCopyEnabled && startCopyEnabled) {
      createDraggableGroup(x, y, shapes, layer)
    }

    // Reset flags
    endCopyEnabled = false;
    startCopyEnabled = false;
  });

  layer.add(group)
};

