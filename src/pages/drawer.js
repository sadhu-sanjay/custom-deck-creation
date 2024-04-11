export const createPost = (x, y, drawerLayer) => {
    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      fill: "black",
      offsetX: 10,
      offsetY: 10,
    });
    const circle = new Konva.Circle({
      x: 0,
      y: 0,
      radius: 20,
      stroke: "red",
      fill: "red",
    });
    const group = new Konva.Group({
      x: x,
      y: y,
      draggable: true,
    });
    group.add(circle, rect);

    var startCopyEnabled = false;
    var endCopyEnabled = false;

    group.on("dragstart", (e) => {
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

    group.on("dragend", (e) => {
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
        createPost(x, y, drawerLayer);
      }

      // reset Flags
      endCopyEnabled = false;
      startCopyEnabled = false;
    });

    drawerLayer.add(group)
  };