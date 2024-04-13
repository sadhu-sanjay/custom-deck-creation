export const createCapRail = (x, y, drawerLayer) => {
    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: 14,
      height: 114,
      stroke: "black",
      strokeWidth: 2,
      offsetX: 7,
      offsetY: 7,
    });
    const group = new Konva.Group({
      x: x,
      y: y,
      draggable: true,
    });
    group.add(rect);
  
    /* Secondarly Group */
    const text = new Konva.Text({
      x: 0,
      y: 0,
      text: "Cap Rail",
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
        createCapRail(x, y, drawerLayer);
      }
  
      // reset Flags
      endCopyEnabled = false;
      startCopyEnabled = false;
    });
  
    drawerLayer.add(group, textGroup);
  };