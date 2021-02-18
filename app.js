// Canvas Settings
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#bbf";


class Circle {
    constructor(xPoint, yPoint, radius, color) {
        // This makes these constructor arguments global
        this.xPoint = xPoint;
        this.yPoint = yPoint;
        this.radius = radius;
        this.color = color;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.xPoint, this.yPoint, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = "black"; // border color of circle
        context.lineWidth = 3;
        context.fillStyle = this.color; // red
        context.fill();
        context.stroke();
        context.closePath();
    }

    // change color if click inside the circle
    changeColor(newColor) {
        this.color = newColor;
        this.draw(context);
    }

    clickCircle(xMouse, yMouse) {
        // to calculate distance between 2 points - use patagium theorem
        // the first point -> middle of the circle
        // the second point -> the coordinates that was clicked
        // patagium theorem: a^2 + b^2 = c^2  
        const distance = 
            Math.sqrt(
                ((xMouse - this.xPoint) * (xMouse - this.xPoint)) 
                + 
                ((yMouse - this.yPoint) * (yMouse - this.yPoint))
            );

        // if click in circle - you will get true
        // if click outside the circle - you will get false
        if (distance < this.radius) {
            this.changeColor("#56f");
            return true;
        } else {
            this.changeColor("#f56");
            return false;
        }
    }
}

// To see the circle inside the canvas
let circle = new Circle(200, 200, 100, "#f56");
circle.draw(context);

canvas.addEventListener("click", (event) => {
    // get info about coordinates - the x and y position
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    circle.clickCircle(x, y);
});

