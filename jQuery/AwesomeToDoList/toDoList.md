# to-do list jQuery

- import jQuery .min.js  (cdn)
- import Font-Awesome .css (cdn)

- adding a container
```html
    <div class="container">
        <input type="text" class="txtb" placeholder="Add a task">
        <div class="notcomp">
            <h3>Not Completed</h3>

            <div class="task">
                task
                <i class="fas fa-trash-alt"></i>
                <i class="fas fa-check"></i>
            </div>
        </div>
    </div>
```


- duplicate a task class

`updated html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>To-do List HTML&&CSS jQuery</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

</head>
<body>
    
    <div class="container">
        <input type="text" class="txtb" placeholder="Add a task">
        <div class="notcomp">
            <h3>Not Completed</h3>

            <div class="task">
                task
                <i class="fas fa-trash-alt"></i>
                <i class="fas fa-check"></i>
            </div>
            <div class="task">
                task
                <i class="fas fa-trash-alt"></i>
                <i class="fas fa-check"></i>
            </div>

            <div class="comp">
                <h3>Completed</h3>

                <div class="task">
                    task
                    <i class="fas fa-trash-alt"></i>
                </div>
                <div class="task">
                    task
                    <i class="fas fa-trash-alt"></i>
                </div>

            </div>
        </div>
    </div>
</body>
</html>
```

- creating the css
```css
*{
    margin: 0;
    padding: 0;
    font-family: "montserrat", sans-serif;
    box-sizing: border-box;
}

body{
    background-image: linear-gradient(120deg, #487eb0, #fbc531);
    min-height: 100vh;
}

.contatiner{
    min-width: 800px;
    margin: auto;
    padding: 10px;
}

.txtb{
    width: 100%;
    border: none;
    border-bottom: 2px solid #000;
    background: none;
    padding: 10px;
    outline: none;
    font-size: 18px;
}

h3{
    margin: 10px 0;
}

.task{
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    padding: 18px;
    margin: 6px 0;
    overflow: hidden;
}

.task i{
    float: right;
    margin-left: 20px;
    cursor: pointer;
}

.comp .task{
    background: rgba(0,0,0, 0.5);
    color: #fff;
}
```

![](img/1.png)

`updating the html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>To-do List HTML&&CSS jQuery</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

</head>

<body>

    <div class="container">
        <input type="text" class="txtb" placeholder="Add a task">
        <div class="notcomp">
            <h3>Not Completed</h3>
        </div>

        <div class="comp">
            <h3>Completed</h3>
        </div>
    </div>

    <script>
        $(".txtb").on("keyup", (e) => {
            //13 means enter button
            if (e.keyCode == 13 && $(".txtb").val() != "") {
                var task = $("<div class='task'></div>").text($(".txtb").val());

                var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
                    var p = $(this).parent();
                    p.fadeOut( () => {
                        p.remove();
                    })
                });

                var check = $("<i class='fas fa-check'></i>").click(function(){
                    var p = $(this).parent();
                    p.fadeOut( () => {
                        $(".comp").append(p);
                        p.fadeIn();
                    });
                    $(this).remove();
                });

                task.append(del, check);
                $(".notcomp").append(task);
                //to clear the input
                $(".txtb").val("");
            }
        });
    </script>

</body>

</html>
```

![](img/2.png)
![](img/3.png)