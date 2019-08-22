// //adding new chat documents
// //setting up a real-time listener to get new chats
// //updating the username
// //updating the room 

// class Chatroom {
//     constructor(room, username) {
//         this.room = room;
//         this.username = username;
//         this.chats = db.collection('chats');
//     }
//     async addChat(message) {
//         //format a chat object
//         const now = new Date();
//         const chat = {
//             message,
//             username: this.username,
//             room: this.room,
//             created_at: firebase.firestore.Timestamp.fromDate(now)
//         };
//         //save the chat document
//         const response = await this.chats.add(chat);
//         return response;
//     }
// }

// const chatroom = new Chatroom('gaming', 'shaun');
// chatroom.addChat('hello everyone')
//     .then(() => { console.log('chat added') })
//     .catch(err => console.log(err));












// //setting up a Real-time Listener
// //adding new chat documents
// //setting up a real-time listener to get new chats
// //updating the username
// //updating the room 
// class Chatroom {
//     constructor(room, username) {
//         this.room = room;
//         this.username = username;
//         this.chats = db.collection('chats');
//     }
//     async addChat(message) {
//         //format a chat object
//         const now = new Date();
//         const chat = {
//             message,
//             username: this.username,
//             room: this.room,
//             created_at: firebase.firestore.Timestamp.fromDate(now)
//         };
//         //save the chat document
//         const response = await this.chats.add(chat);
//         return response;
//     }
//     getChats(callback) {
//         this.chats
//             .onSnapshot(snapshot => {
//                 snapshot.docChanges().forEach(change => {
//                     if (change.type === 'added') {
//                         //update the UI
//                         callback(change.doc.data());
//                     }
//                 });
//             });
//     }
// }

// const chatroom = new Chatroom('gaming', 'shaun');
// chatroom.getChats((data) => {
//     console.log(data);
// })

























// //complex queries
// //adding new chat documents
// //setting up a real-time listener to get new chats
// //updating the username
// //updating the room 
// class Chatroom {
//     constructor(room, username) {
//         this.room = room;
//         this.username = username;
//         this.chats = db.collection('chats');
//         this.unsub;
//     }
//     async addChat(message) {
//         //format a chat object
//         const now = new Date();
//         const chat = {
//             message,
//             username: this.username,
//             room: this.room,
//             created_at: firebase.firestore.Timestamp.fromDate(now)
//         };
//         //save the chat document
//         const response = await this.chats.add(chat);
//         return response;
//     }
//     getChats(callback) {
//         this.unsub = this.chats
//             .where('room', '==', this.room)
//             .orderBy('created_at')
//             .onSnapshot(snapshot => {
//                 snapshot.docChanges().forEach(change => {
//                     if (change.type === 'added') {
//                         //update the UI
//                         callback(change.doc.data());
//                     }
//                 });
//             });
//     }
//     updateName(username) {
//         this.username = username;
//     }
//     updateRoom(room) {
//         this.room = room;
//         console.log('room updated');
//         if (this.unsub) {
//             this.unsub();
//         }
//     }
// }

// const chatroom = new Chatroom('general', 'shaun');
// chatroom.getChats((data) => {
//     console.log(data);
// })

// setTimeout(() => {
//     chatroom.updateRoom('gaming');
//     chatroom.updateName('yoshi');
//     chatroom.getChats(data => {
//         console.log(data);
//     });
//     chatroom.addChat('hello');
// }, 3000)



























//creating a ChatUI class
//adding new chat documents
//setting up a real-time listener to get new chats
//updating the username
//updating the room 
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
        localStorage.setItem('username', username);
    }
    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if (this.unsub) {
            this.unsub();
        }
    }
}

