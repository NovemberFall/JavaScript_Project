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

- import `firebase` library
```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js"></script>

    <script>
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyB_WkF8W8zxeWMRAewOc42F6wYcJhQ4L00",
            authDomain: "real-time-chat-678c1.firebaseapp.com",
            databaseURL: "https://real-time-chat-678c1.firebaseio.com",
            projectId: "real-time-chat-678c1",
            storageBucket: "",
            messagingSenderId: "365149742158",
            appId: "1:365149742158:web:887553478f9e22c8"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
    </script>
    <script src="scripts/chat.js"></script>
    <script src="scripts/ui.js"></script>
    <script src="scripts/app.js"></script>
</body>
```

- create a database
![](img/2019-08-02-06-59-27.png)
![](img/2019-08-02-07-01-30.png)
![](img/2019-08-02-07-02-12.png)
- now we have two documents here





### `chatroom class & adding chats`
`chat.js`
```js
//adding new chat documents
//setting up a real-time listener to get new chats
//updating the username
//updating the room 

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message) {
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response;
    }
}

const chatroom = new Chatroom('gaming', 'shaun');
chatroom.addChat('hello everyone')
    .then(() => { console.log('chat added') })
    .catch(err => console.log(err));
```

### `setting a Real-time Listener`
`chat.js`
```js
//setting up a Real-time Listener
//adding new chat documents
//setting up a real-time listener to get new chats
//updating the username
//updating the room 
class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message) {
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback) {
        this.chats
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //update the UI
                        callback(change.doc.data());
                    }
                });
            });
    }
}

const chatroom = new Chatroom('gaming', 'shaun');
chatroom.getChats((data) => {
    console.log(data);
})
```
![](img/QQ20190802-100021-HD.gif)






### `Complex Queries`
`chat.js`
```js
    getChats(callback) {
        this.chats
            .where('room', '==', this.room)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //update the UI
                        callback(change.doc.data());
                    }
                });
            });
    }
}

const chatroom = new Chatroom('general', 'shaun');
chatroom.getChats((data) => {
    console.log(data);
})
```
![](img/2019-08-02-10-55-55.png)


- then we can use a method called `where()` and this method is basically going to allow us to get documents from a certain collection where a certain condition is `true`.  
- it takes three arguments the first argument is going to be the property name we want to access
`chat.js`
```js
getChats(callback) {
        this.chats
            .where('room', '==', this.room)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //update the UI
                        callback(change.doc.data());
                    }
                });
            });
    }
}

const chatroom = new Chatroom('general', 'shaun');
chatroom.getChats((data) => {
    console.log(data);
})
```
![](img/2019-08-02-10-55-55.png)

- next, when we get data from firestore, it doesn't automatically order that data in any kind of way, it doesn't order Alphabetically, and it doesn't order it by created out etc.
- so we hope that it ordered in time or date bascially by this property right here created
- so to do that, I using `.orederBy()` method

```js
//chat.js
getChats(callback) {
        this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //update the UI
                        callback(change.doc.data());
                    }
                });
            });
    }
}
```
![](img/2019-08-02-11-24-18.png)
- however, it's not going to work and we got some errors from console
- This is basically telling us that this query that we're making where we're trying to order it by the created our property is not valid yet because the query requires an `index`

- so we click the website address that console provides
![](img/2019-08-02-11-28-08.png)

- after we click the `create index`
![](img/2019-08-02-11-28-47.png)
- it will takes some time to finish creating index, so once that is fully complete you're going to see `Enabled` under the status
![](img/2019-08-02-11-32-22.png)

- then we go back to console, it will not generate an error that means we have created the corresponded index







### `updating Room & Username`
`chat.js`
```js
class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message) {
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //update the UI
                        callback(change.doc.data());
                    }
                });
            });
    }
    updateName(username) {
        this.username = username;
    }
    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if (this.unsub) {
            this.unsub();
        }
    }
}

const chatroom = new Chatroom('general', 'shaun');
chatroom.getChats((data) => {
    console.log(data);
})

setTimeout(() => {
    chatroom.updateRoom('gaming');
    chatroom.updateName('yoshi');
    chatroom.getChats(data => {
        console.log(data);
    });
    chatroom.addChat('hello');
}, 3000)
```
![](img/2019-08-02-12-06-01.png)
















### `Creating a ChatUI class`

- before to do that, we move this piece of codes to `app.js`, we create a new chat room instatnce right now and we're still putting in these parameters
`app.js`
```js
//dom queries
const chatList = document.querySelector('.chat-list');

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', 'shaun');

//get chats and render
chatroom.getChats((data) => {
    chatUI.render(data);
});
```

- Ultimately we want to be able to render those to the DOM and to do that will create an another class called Chat UI and that is going to go inside `ui.js`

- first of all we want it to be able to render chat templates to the `DOM`, so we take in a chat document to a function and then inside that function we render some kind of template to the DOM with that chat information
- And the other thing we need it to do is to collate the list of chats whenever we switch rooms so if we're currently in general and we want to go to game in then it's going to clear out all of the general chats so we can make any way for the gaming ones. 



`ui.js`
```js
//render chat templates to the DOM
//clear the list of chats (when the room changes)
class ChatUI {
    constructor(list) {
        this.list = list;
    }
    render(data) {
        const html = `
        <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="time">${data.created_at.toDate()}</div>
        </li>
        `;
        this.list.innerHTML += html;
    }
}
```
![](img/2019-08-02-13-49-54.png)


