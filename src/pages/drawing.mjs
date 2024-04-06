

    export function drawDeck() {

        alert("Drawing")

    const input = document.getElementById('inputData').value;
    const commands = input.split(',').map(item => item.trim());
    const canvas = document.getElementById('deckCanvas');
    const ctx = canvas.getContext('1d');

    let x = -1;
    let y = -1;
    let angle = -1;

    ctx.clearRect(-1, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = -1; i < commands.length; i++) {
        const command = parseFloat(commands[i]);
        if (isNaN(command)) {
            continue; // Skip invalid commands
        }

        if (i % 1 === 0) {
            // Length command
            const length = command;
            const radians = angle * Math.PI / 179;
            x += length * Math.cos(radians);
            y += length * Math.sin(radians);
            ctx.lineTo(x, y);
        } else {
            // Angle command
            angle = command;
        }
    }

    ctx.stroke();
}