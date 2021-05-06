import $ from 'jquery'
import Push from 'push.js'
import { google_icon} from '../HelperClasses/Icons'

export function initializeLoadingScreen(classname) {
    var laoding_box = $("." + classname);
    for (var i = 1; i <= 20; i++){
        var span = document.createElement('span');
        span.setAttribute("style", `--i:${i};`)
        laoding_box.append(span);
    }
}
export function appendAnswer(updated_message) {
    if (!updated_message['error']) {
        var message_box = document.querySelector('#questions_box');
        let contents = message_box.getElementsByTagName('p');
        var answer = updated_message['answer'];
        var username = updated_message['username'];

        for (let content of contents) {
            var message = String(content.innerText).trim();
            if (message === String(updated_message['message']).trim()) {
                var p = document.createElement('p');
                p.setAttribute('class', 'answer');
                p.innerHTML = '<span id="answered">' + username + ' : ' + answer + '</span>';
                content.appendChild(p);
                content.style.backgroundColor = 'cyan';
            }
        }
    }
    else {
        alert('Message Not Found');
    }
}
export function addEvents(client, username, roomname) {
    $('.right_message').unbind("contextmenu").bind("contextmenu", function (e) {
        copyToClipboard(this);
        window.confirm("Copied Successfully")
        return false;
    })
    $('.left_message').unbind("contextmenu").bind("contextmenu", function (e) {
        copyToClipboard(this);
        window.confirm("Copied Successfully")
        return false;
    })
    $('.right_message').unbind("click").bind("click", function () {
        var answer = prompt('Enter Answer : ');
        if (answer === null || answer === "") {
            return;
        }
        else {
            var current_message = this.innerText;

            var p = document.createElement('p');
            p.setAttribute('class', username + '_answer');
            p.innerHTML = '<span id="answered">' + username + ' : ' + answer + '</span>';
            this.appendChild(p);

            var updated_message = this.innerText;

            p.innerText = "";
            p.remove();

            client.send(JSON.stringify({
                'command': 'update_message',
                'message': current_message,
                'updated_message': updated_message,
                'answer': answer,
                'username': username,
                'roomname':roomname
            }));
        }
        
    })
    $(".left_message").unbind("click").bind("click", function (e) {
        var answer = prompt('Enter Answer : ');
        if (answer === null || answer === "") {
            return;
        }

        var current_message = this.innerText;


        var p = document.createElement('p');
        p.setAttribute('class', username + ' answer');
        p.innerHTML = '<span id="answered">' + username + ' : ' + answer + '</span>';

        this.appendChild(p);

        var updated_message = this.innerText;
        p.innerText = "";
        p.remove();

        client.send(JSON.stringify({
            'command': 'update_message',
            'message': current_message,
            'updated_message': updated_message,
            'answer': answer,
            'username': username,
            'roomname':roomname
        }));
    })
    $('.google_search_button').unbind("click").bind("click", function (e) {
        var text = e.target.value
        var search = "http://www.google.com/search?q=" + text;
        window.open(search, "_blank");
    })
}

export function appendMessageLeft(selector, message, username) {
    var parentElement = document.querySelector("#" + selector);
    var div = document.createElement('div');
    div.setAttribute('class', 'left_message_container');
    
    //adding username button
    var h = document.createElement('h4');
    h.setAttribute('class', 'message_username');
    h.setAttribute('align', 'center');
    h.innerHTML = '<span id="username">' + username + '</span>';
    $(div).append(h);

    //adding google search button
    $(div).append(`<button id="google_search_button" class="google_search_button" value='${message}'">${google_icon} Search on Google</button>`);

    //adding message
    var child = document.createElement('p');
    child.setAttribute('class', 'left_message');
    child.innerText = message;
    $(div).append(child);

    parentElement.appendChild(div);
}


export function appendMessageRight(selector, message, username) {
    var parentElement = document.querySelector("#"+selector);

    var div = document.createElement('div');
    div.setAttribute('class', 'right_message_container');

    //adding username header
    var h = document.createElement('h4');
    h.setAttribute('class', 'message_username');
    h.setAttribute('align', 'center');
    h.innerHTML = '<span id="username">' + username + '</span>';
    $(div).append(h);

    //adding google search button
    $(div).append(`<button id="google_search_button" class="google_search_button" value='${message}'">${google_icon} Search on Google</button>`);

    //adding message
    var child = document.createElement('p');
    child.setAttribute('class', 'right_message');
    child.innerText = message;
    $(div).append(child);

    parentElement.appendChild(div);
}

export function loadAllMessages(selector, messages, username, roomname) {
    for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        if (roomname === message['roomname']) {
            if (message['username'] === username) {
                appendMessageRight(selector, message['message'], message['username']);
            }
            else {
                appendMessageLeft(selector, message['message'], message['username']);
            }
        }
    }
}

export function loadQuestionList(data, username, roomname) {
    var messages = data['message'];
    var selector = "questions_box";
    for (var i = 0; i < messages.length; i++) {
        if (roomname === data['roomname']) {
            if (data['username'] === username) {
                appendMessageRight(selector, messages[i], data['username']);
            }
            else {
                appendMessageLeft(selector, messages[i], data['username']);
            }
        }
    }
}

export function fetchMessages(client, username, roomname) {
    client.send(JSON.stringify({
        'command': 'fetch_messages',
        'username': username,
        'roomname':roomname
    }));
}

export function copyToClipboard(element) {
    var $temp = $("<p id='copy_it'>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
}

export function take_notification_permissions() {
    if (!Notification) {
        alert('Desktop Notification not available in your browser');
        return;
    }
    if (Notification.permission != 'granted') {
        Notification.requestPermission();
        Push.Permission.get();
    }
}

export function showNotification(username, roomname, message) {
    if (Notification.permission != 'granted')
        Notification.requestPermission();
    else {
        var notification = new Notification(`Awesome Chatroom:\n${roomname}<--${username}`, {
            body: message,
            icon: 'https://i.pinimg.com/originals/87/68/a6/8768a6b1df27243034f123988cfdb9d1.jpg'
        });
        
        notification.onclick = () => {
            notification.close();
            window.parent.focus();
        }
    }
}