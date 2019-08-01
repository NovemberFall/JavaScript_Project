### `Real-time online Chat room`

- create three .js files named `chat.js ui.js app.js`, which are inside `scripts` folder
- create a `styles.css`
- import `bootstrmp` library 
  
- updating `index.html`
```html
<body>
    <!-- container & title -->
    <div class="container my-4">
        <h1 class="my-4 text-center">Online Chat</h1>

        <!-- buttons for chatroom -->
        <div class="chat-rooms mb-3 text-center">
            <div class="my-2">Choose a chatroom:</div>
            <button class="btn" id="general">#general</button>
            <button class="btn" id="gaming">#gaming</button>
            <button class="btn" id="music">#music</button>
            <button class="btn" id="ninjas">#Front End</button>
        </div>


        <!-- chat list / window -->
        <div class="chat-window">
            <ul class="chat-list list-group"></ul>
        </div>

        <!-- new chat form -->
        <form class="new-chat my-3">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">Your message:</div>
                </div>
                <input type="text" id="message" class="form-control" required>
                <div class="input-group-append">
                    <input type="submit" class="btn" value="send">
                </div>
            </div>
        </form>

        <!-- update name form -->
        <form class="new-name my-3">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">Update name:</div>
                </div>
                <input type="text" id="name" class="form-control" required>
                <div class="input-group-append">
                    <input type="submit" class="btn" value="update">
                </div>
            </div>
            <div class="update-mssg"></div>
        </form>
    </div>

    <script src="scripts/chat.js"></script>
    <script src="scripts/ui.js"></script>
    <script src="scripts/app.js"></script>
</body>
```
![](img/2019-08-01-18-37-48.png)

- updating `styles.css`
```css
.container{
    min-width: 600px;
}
.btn{
    background: #43d9be;
    color:white;
    outline: none !important;
    box-shadow: none !important;
}
.btn:focus{
    outline: none !important;
}
```
![](img/2019-08-01-18-41-19.png)



### `Connecting to Firebase`







