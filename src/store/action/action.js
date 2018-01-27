import ActionTypes from '../constants/constant';
import * as firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBeNmoZcmWzwNqBIHJrK6g04UMRA7l4_vw",
    authDomain: "testing-fdf9e.firebaseapp.com",
    databaseURL: "https://testing-fdf9e.firebaseio.com",
    projectId: "testing-fdf9e",
    storageBucket: "testing-fdf9e.appspot.com",
    messagingSenderId: "696415535641"
};

firebase.initializeApp(config);

export function addtodo(todo) {
    let array = [];
    return dispatch => {
        firebase.database().ref('/').child('reduxTodo/').push(todo)
    }
}

export function view() {
    let array = [];
    let keys = [];
    return dispatch => {
        firebase.database().ref('reduxTodo/').on('value', (success, fail) => {
            if (success) {
                success.forEach(element => {
                    array.push(element.val());
                    keys.push(element.key)
                    dispatch({ type: ActionTypes.VIEWTODOS, payload: array });
                    dispatch({ type: ActionTypes.GETKEYS, payload: keys });

                });
                array = [];
                keys = [];
            }
            else {
                console.log("error occurred");
            }
        })
    }
}

export function deletetodo(id) {
    return dispatch => {
        firebase.database().ref('/').child(`reduxTodo/${id}`).remove()
            .then(success => {
                // this.view()
            })
            .catch(err => {
                console.log("error", err);
            })
    }
}

export function edittodo(id) {
    return dispatch => {
        firebase.database().ref(`reduxTodo/${id}`).on('value', (success, fail) => {
            if (success) {
                dispatch({ type: ActionTypes.EDITTODO, payload: success.val() });
            }
            else {
                console.log("error occurred");
            }
        })
    }
}

export function updatetodo(id, todo) {
    return dispatch => {
        firebase.database().ref('/').child('reduxTodo/' + id).set(todo)
        dispatch({ type: ActionTypes.UPDATETODOS, payload: todo })
    }
}