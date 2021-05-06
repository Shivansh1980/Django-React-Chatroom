import React, { Component } from 'react'
import { MessageWebApi } from '../HelperClasses/MessageApi';
import AnswerBox from './AnswerBox';
import QuestionBox from './QuestionBox';

var hostname = window.location.host
var ws_protocol = window.location.protocol == "https:" ? "wss" : "ws";
// var hostname = '127.0.0.1:8000'

export class Home extends Component {
    client = new WebSocket(
        ws_protocol
        + '://'
        + hostname
        + '/ws/chat/'
        + this.props.roomname
        + '/'
    );
    username = this.props.username;
    roomname = this.props.roomname;

    constructor(props) {
        super(props);

        this.message_api = new MessageWebApi(this.client);
        this.message_api.load_messages();
        this.message_api.set_username(this.username);
        this.message_api.set_roomname(this.roomname);

        this.question_layout_handler = this.question_layout_handler.bind(this);
        this.answer_layout_handler = this.answer_layout_handler.bind(this);
    }

    question_layout_handler() {
        this.setState({
            questions_layout: true,
            answer_layout:false
        })
    }
    answer_layout_handler() {
        this.setState({
            questions_layout: false,
            answer_layout: true
        })
    }

    state = {
        questions_layout: true,
        answer_layout: false,
    }

    render() {
        let answers_layout = this.state.answer_layout;
        let questions_layout = this.state.questions_layout;

        let layout;
        if (answers_layout) {
            layout =
                <div className="AnswerBox">
                    <AnswerBox message_api={ this.message_api}/>
                </div>
        }
        else if (questions_layout) {
            layout =
                <div className="QuestionViewContainer">
                <QuestionBox
                    message_api={this.message_api}
                    username={this.username}
                    roomname={this.roomname} />
                </div>
        }
        return (
            <div className="Home">
                {layout}
            </div>
        )
        
    }
}

export default Home
