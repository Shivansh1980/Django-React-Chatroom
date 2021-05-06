import React, { Component } from 'react'
import { loadAllMessages } from '../HelperClasses/ChatMessage';
import Menu from './Menu';

export class AnswerBox extends Component {
    message_api = this.props.message_api;

    state = {
        isLoggedIn: true,
        isNewAnswer: true,
        messages: []
    };

    
    componentDidMount() {
        this.setState({
            messages: this.message_api.get_answered_messages()
        })
    }
    render() {
        if (this.state.isNewAnswer) {
            return (
                <div id="answers_box" className="AnswerBox">
                   
                </div>
            )
        }
        else {
            this.state.isNewAnswer = false;
            return (
                <div className="AnswerBox">
                    
                </div>
            )
        }
    }
}

export default AnswerBox
