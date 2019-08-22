### `Create a Snowy Background with Canvas`

- create a .html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Snow</title>
    <script src="snow.js"></script>
    <style>
        body{
            background: #102a54;
        }
    </style>
</head>
<body>
    <canvas id="sky"></canvas>
</body>
</html>
```

- create `snow.js`

- ES6
```js
window.onload = () => {
    //get the canvas and context and store in vars
    let canvas = document.getElementById('sky');
    let ctx = canvas.getContext('2d');

    //set canvas dimensions to window height and width
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //generate the snowflakes and apply attributes
    const MF = 100; //max flakes
    let flakes = [];

    //loop through the empty flakes and apply attributes
    for (let i = 0; i < MF; i++) {
        flakes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 5 + 2, //min of 2px and max of 7 px
            d: Math.random() * 1 //density of the flake
        })
    }

    //draw flakes onto canvas
    const drawFlakes = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = 'white';
        ctx.beginPath();
        for (let i = 0; i < MF; i++) {
            let f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    //animate the flakes
    let angle = 0;
    const moveFlakes = () => {
        angle += 0.01;
        for (let i = 0; i < MF; i++) {
            //store current flake
            let f = flakes[i];

            //update X and Y coordinates of each snowflake
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;

            //if the snowflake reaches the bottom, send a new one to the top
            if (f.y > H) {
                flakes[i] = {
                    x: Math.random() * W,
                    y: 0,
                    r: f.r,
                    d: f.d
                };
            }
        }
    }
    setInterval(drawFlakes, 25);
}
```
![](img/2019-08-22-08-45-15.png)
