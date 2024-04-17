import { feet } from "~/config";

export function drawDeck(inputStr, x, y, startAngle) {
  let currentContextAngle = startAngle;
  let currentContextX = x;
  let currentContextY = y;

  var line = new Konva.Line({
    points: [x, y],
    stroke: "black",
    strokeEnabled: true,
    lineCap: "round",
    /*
     * line segments with a length of 29px with a gap
     * of 20px followed by a line segment of 0.001px (a dot)
     * followed by a gap of 20px
     */
    // dash: [29, 20, 0.001, 20],
  });

  try {
    var values = inputStr.split(",").map((value) => value.trim());

    for (var i = 0; i < values.length; i += 2) {
      var angle = parseFloat(values[i]);
      // since user enters the value in feet and a feet in our app represented by 36px. 
      // we need to multiple it by our feet
      var length = parseFloat(values[i + 1]) * feet 

      // Convert angle to Radians
      var angleRadians = ((currentContextAngle - angle) * Math.PI) / 180;

      // Calculate new endpoint coordinates
      var newX = currentContextX + length * Math.cos(angleRadians);
      var newY = currentContextY + length * Math.sin(angleRadians);

      line.points([...line.points(), newX, newY]);

      // Update current position and angle for the next segment
      currentContextX = newX;
      currentContextY = newY;
      currentContextAngle -= angle;
    }

    return line
  } catch (e) {
    alert(e);
  }
}
