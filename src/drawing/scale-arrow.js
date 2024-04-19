
export const scaleArrow = (layer) => {
return console.log(layer)

  const group = new Konva.Group({
    draggable: true
  })

  // Create the two-sided arrow shape
  var arrow = new Konva.Arrow({
    x: x,
    y: y,
    points: [0, 0, 100, 0], // Points for the main line of the arrow (x1, y1, x2, y2)
    pointerLength: 10,
    pointerWidth: 10,
    fill: 'black', // Color of the arrow
    stroke: 'black', // Color of the arrow
    pointerAtBeginning: true
  });

  // group.add(arrow)
  layer.add(arrow)
  // layer.add(secondArrowhead)
}