import { feet } from "~/config";

const rectWidth = feet/2
const rectHeight = feet/2

export const createCapRail = (x, y, drawerLayer, tr) => {
    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: rectWidth,
      height: rectHeight * 8,
      stroke: "black",
      strokeWidth: 2,
    });
    var shadowRectangle = new Konva.Rect({
      x: 0,
      y: 0,
      width: rectWidth,
      height: rectHeight,
      fill: '#FF7B17',
      opacity: 0.6,
      stroke: '#CF6412',
      strokeWidth: 3,
      dash: [20, 2]
    });

    /**
   * CREATE NEW DRAGGABLE GROUP */ 

  const mainGroup = new Konva.Group({
    x: x,
    y: y,
    draggable: true,
  });
  mainGroup.on('click', () => {
    tr.nodes([mainGroup])
  })
  mainGroup.on('dragstart', (e) => {
    shadowRectangle.show()
    shadowRectangle.to
  })
  mainGroup.on('dragmove', () => {

    mainGroup.position({
      x: Math.round(mainGroup.x() / 18) * 18 ,
      y: Math.round(mainGroup.y() / 18) * 18 ,
    })
  })
  mainGroup.on('dragend', () => {

    console.log("old ", mainGroup.x())

    console.log( mainGroup.x() / 30 * 30)

    mainGroup.position({
      x: Math.round(mainGroup.x() / 18) * 18 ,
      y: Math.round(mainGroup.y() / 18) * 18 
    })

  })
  
  mainGroup.add(rect)

  let startCopyEnabled = false;
  let endCopyEnabled = false;

  mainGroup.on("dragstart", (e) => {
    const target = e.target;
    const position = target.getAbsolutePosition();
    const { x: targetX, y: targetY } = position;

    if (targetX === x && targetY === y) {
      startCopyEnabled = true;
    }
  });

  mainGroup.on("dragend", (e) => {
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
      createCapRail(x, y, drawerLayer, tr)
    }

    // Reset flags
    endCopyEnabled = false;
    startCopyEnabled = false;

  });

  /**
   * END NEW DRAGGABLE GROUP
   */
  
    /* Secondarly Group */
    const text = new Konva.Text({
      x: 0,
      y: 0,
      text: "Cap Rail",
      offsetX: -feet,
      fontSize: 18,
    });
    const textGroup = new Konva.Group({
      x: x,
      y: y,
    });
    textGroup.add(text)
  
    drawerLayer.add(mainGroup, textGroup);
  };