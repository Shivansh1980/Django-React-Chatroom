import React, { Component } from 'react'
import { appendMessageLeft, appendMessageRight, loadAllMessages, fetchMessages, take_notification_permissions, showNotification, loadQuestionList} from '../HelperClasses/ChatMessage'
import { addEvents, appendAnswer, initializeLoadingScreen } from '../HelperClasses/ChatMessage';
import $, { Callbacks } from 'jquery'
import Dropzone from 'react-dropzone'
import './CustomBox'
import CustomBox from './CustomBox';
import { FaArrowCircleDown } from 'react-icons/fa'
import {
    show_image_to_text_box,
    hide_image_to_text_box,
    hide_loading_screen,
    show_loading_screen,
    display_questions_box_items_at_start,
    show_progress_box,
    hide_progress_box
} from '../HelperClasses/AlterCSS'

export class QuestionBox extends Component {
    
    client = this.props.message_api.get_client();
    username = this.props.message_api.get_username();
    roomname = this.props.message_api.get_roomname();

    constructor(props) {
        super(props);
        this.message_api = this.props.message_api;
        this.message_api.load_messages();

        this.sendMessage = this.sendMessage.bind(this);
        this.handle_upload_image = this.handle_upload_image.bind(this);
        this.handle_clear_room_messages = this.handle_clear_room_messages.bind(this);
        this.handle_update_progress = this.handle_update_progress.bind(this);
        this.handle_go_to_last_message = this.handle_go_to_last_message.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    state = {
        connected: '',
        inputquestion: '',
        file: null,
        formData: null,
        progress:0.01
    }

    logoutHandler(event) {
        localStorage.removeItem("username");
        localStorage.removeItem("roomname");
        window.location.reload();
    }

    handle_go_to_last_message(event) {
        var question_box = document.getElementById('questions_box');
        question_box.scrollTop = question_box.scrollHeight;
    }

    handle_update_progress(new_progress) {
        this.setState({
            progress:new_progress
        })
    }
    
    sendMessage(event) {
        this.message_api.send_message_to_room('new_message', this.state.inputquestion);
        this.setState({
            inputquestion: '',
        })
        event.preventDefault();
        
    }
    handle_clear_room_messages(event) {
        var password = prompt('Enter Password : ');
        this.message_api.clear_room_messages(password);
    }
    handle_upload_image(event, data) {
        var to_text = false;
        var upload = false;
        if ($("#convert_to_text").is(":checked"))
            to_text = true;
        if ($("#direct_upload").is(":checked")) {
            upload = true;
        }
        if (data["button"] == "upload") {
            if (to_text && upload)
                alert("You can't tick both");
            else if (!to_text && !upload) {
                alert("Please Select Atleast One or Cancel");
            }
            else if (upload && !to_text) {
                var description = $('#image_description').val();
                if (description == "" || description == null) description = "";
                this.message_api.send_file_to_group(this.state.file, description);
                hide_image_to_text_box();
            }
            else {
                hide_image_to_text_box();
                show_progress_box();
                var update_progress = this.handle_update_progress;
                this.message_api.send_image_text(this.state.file[0], function (progress) {
                    update_progress(progress)
                })
            }
        }
        else {
            hide_image_to_text_box();
        }
        event.preventDefault();
    }
    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        this.setState({
            file:acceptedFiles
        })
        show_image_to_text_box();
    }

    componentDidMount() {
        take_notification_permissions();

        //show loading screen
        initializeLoadingScreen("loading");
        show_loading_screen();

        this.client.onopen = () => {
            this.setState({
                connected:'Welcome, You are Connected With '+this.roomname
            })
            console.log("connected to websocket");
            
            fetchMessages(this.client, this.username, this.roomname);

            document.removeEventListener('copy', function () {
                return;
            })
            document.addEventListener('copy', function (e) {
                var text = $('#copy_it').val();
                console.log(text);
                if(e.clipboardData == null || text == null || e == null) return
                e.clipboardData.setData('text/plain', text);
                e.preventDefault();
                $('#copy_it').remove();
            });
        }
    }
    render() {
        return (
            <div className="QuestionsBox">
                <CustomBox boxName="image_to_text_box" handler={this.handle_upload_image} />
                <CustomBox boxName="progress_box" progress={this.state.progress} />
                <CustomBox boxName="logout_box" logoutHandler={ this.logoutHandler}/>
                <div className="question_box_header">
                    <Dropzone
                        onDrop={this.onDrop}
                        accept="image/*"
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (

                            <div {...getRootProps({ className: "dropzone", id: "dropzone" })}>
                                <input {...getInputProps()} />
                                {!isDragActive && 'Click here or drop a file to upload!'}
                                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                {isDragReject && "File type not accepted, sorry!"}
                            </div>
                        )}
                    </Dropzone>
                    <button id="clear_message_button" onClick={ this.handle_clear_room_messages}>Clear All Messages</button>
                </div>
                <div id="questions_box" className="questions_box">
                    <div className="loading"></div>
                    <div className="down_arrow_button" onClick={this.handle_go_to_last_message}><FaArrowCircleDown color="white" size={ 40}/></div>
                </div>
                <div className="question_input_container">
                    <textarea id="input_question"
                        type="text"
                        onChange={(event) => {
                            this.setState({ inputquestion: event.target.value })
                        }}
                        value={this.state.inputquestion}
                        placeholder="Enter Your Question here"
                    />
                    <input
                        id="post_question_button"
                        type="submit"
                        onClick={this.sendMessage}
                        value="POST" />
                </div>
                    {
                        this.client.onmessage = (e) => {
                            const data = JSON.parse(e.data);
                            //when you fetch all messages
                            if (data['type'] === 'messages') {
                                hide_loading_screen();
                                loadAllMessages("questions_box", data['messages'], this.username, this.roomname);
                                display_questions_box_items_at_start();
                            }
                            // when new message arrived
                            else if (data['type'] === 'message') {
                                var message_content = data.message;
                                var username = message_content.username;
                                var roomname = message_content.roomname;

                                if (!document.hasFocus()) {
                                    showNotification(username, roomname, message_content['message']);
                                }

                                if (username === this.username) {
                                    appendMessageRight("questions_box",message_content['message'], username);
                                }
                                else {
                                    appendMessageLeft("questions_box",message_content['message'], username);
                                }
                            }
                            else if (data['type'] === 'exists' && data.message.username === this.username) {
                                alert("This Question Already Exists You Can't Upload Same Again");
                            }
                            else if (data['type'] === 'updated_message') {
                                var updated_message = data['message'];
                                appendAnswer(updated_message);
                            }
                            
                            else if (data['type'] == 'clear_room_message') {
                                if (data['message']['status'] == 'true'){
                                    $('#questions_box').empty();
                                }
                                else if(data['message']['status'] == 'false')
                                    alert(data['message']['message']);
                            }
                            else if (data['type'] === 'new_file') {
                                var src = data['message']['dataURL'];
                                var img = document.createElement('img');
                                img.src = src;
                                img.className = 'image_file'
                                var box = document.getElementById('questions_box');
                                box.appendChild(img);
                            }
                            else if (data['type'] === 'questions_list') {
                                loadQuestionList(data, this.username, this.roomname);
                            }
                            addEvents(this.client, this.username, this.roomname);
                        }
                    }
            </div>
        )
    }
}

export default QuestionBox