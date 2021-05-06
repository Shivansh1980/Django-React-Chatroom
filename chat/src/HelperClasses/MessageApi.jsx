import axios from "axios";
import { hide_progress_box } from "./AlterCSS";

function toDataURL(file, callback) {
    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;
        callback(dataURL);
    }
    reader.readAsDataURL(file[0]);
}
function dataUrlToFile(dataurl, filename) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export class MessageWebApi{
    hostname = window.location.host;
    ws_protocol = window.location.protocol == "https:" ? "wss" : "ws";
    // hostname = '127.0.0.1:8000'

    constructor(client) {
        this.api_url = window.location.protocol + '//' + this.hostname+'/';
        this.messages = [];
        this.client = client;
        this.username = null
        this.roomname = null
    }

    load_messages() {
        axios.get(this.api_url + "api/messageapi/")
            .then((response) => {
                var data = response.data;
                this.messages = data;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    send_file_to_group(file, description) {
        const client = this.client;
        var username = this.username
        var roomname = this.roomname
        toDataURL(file, function (dataURL) {
            client.send(JSON.stringify({
                'command': 'new_file',
                'dataURL': dataURL,
                'description':description,
                'username': username,
                'roomname': roomname
            }));
        })
    }

    // async send_image_text_using_python(event, image) {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('username', this.username);
    //     formData.append('roomname', this.roomname);
    //     formData.append('image', image[0]);

    //     axios(this.api_url+'convert_image_to_text/', {
    //         method: 'POST',
    //         data: formData,
    //         headers: {
    //             "X-CSRFToken": this.get_token(),
    //             "csrfmiddlewaretoken": this.get_token()
    //         }
    //     }).then(response => {
    //         if (response.data.status == 'error')
    //             alert('File Not Found');
    //         else
    //             this.send_message_to_room('new_message', response.data.text);
    //     }).catch(error => {
    //         alert(error);
    //     })
    // }

    send_image_text(image, callback, output) {
        var Tesseract = window.Tesseract;
        var ref = this;
        Tesseract.recognize(image)
            .progress(function (packet) {
                callback(Math.round(packet.progress*100))
            })
            .then(function (result) {
                hide_progress_box();
                ref.send_message_to_room("new_message", result.text);
            });
    }

    send_message_to_room(command, message) {
        this.client.send(JSON.stringify({
            'command': command,
            'message': message,
            'username': this.username,
            'roomname': this.roomname
        }));
    }

    clear_room_messages(password) {
        this.client.send(JSON.stringify({
            'command': 'clear_room_messages',
            'username': this.username,
            'roomname': this.roomname,
            'password': password
        }));
    }

    get_token() {
        let cookieValue = null,
            name = "csrftoken";
        if (document.cookie && document.cookie !== "") {
            let cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) == (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    get_client() {
        return this.client;
    }
    get_messages() {
        return this.messages;
    }

    get_response() {
        return this.response;
    }

    get_room_messages(roomname) {
        var messages = [];
        this.messages.map(message => {
            if(message.roomname === roomname)
                messages.push(message);
        })
        return messages;
    }

    get_answered_messages() {
        var answered_messages = []
        this.messages.map(message => {
            if (message.isanswer === true)
                answered_messages.push(message);
                
        })
        return answered_messages;
    }

    set_roomname(roomname) {
        this.roomname = roomname;
    }

    get_roomname() {
        return this.roomname;
    }

    set_username(username) {
        this.username = username
    }

    get_username() {
        return this.username;
    }

    get_hostnmae() {
        return this.hostname;
    }

    get_ws_protocol() {
        return this.ws_protocol;
    }
}