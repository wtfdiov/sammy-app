import React, { Component } from 'react';
import {
    MessageList,
    Input,
    Button
} from 'react-chat-elements';

import Identicon from 'identicon.js';
import moment from 'moment';
import axios from 'axios';

export class Chat extends Component {

    state = {
        show: true,
        messageList: [],
        inputMessage: '',
        projectId: null
    };

    componentDidMount() {
        axios.post('http://40.121.17.16:5000/v1/users/session', {
            projectId: 'sammantha-athenas',
            name: this.props.match.params.name,
            email: this.props.match.params.email
        })
        .then(response => this.setState({projectId: response.data.response}))
        .catch(error => console.log(error));
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    photo(size) {
        return new Identicon(String(Math.random()) + String(Math.random()), {
            margin: 0,
            size: size || 20,
        }).toString()
    }

    handleChange(e) {
        this.setState({ inputMessage: e.target.value });
    }

    receiveMessage(message){
        var list = this.state.messageList;
        list.push({
            id: String(Math.random()),
            type: 'text',
            text: message,
            avatar: `data:image/png;base64,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`,
            avatarFlexible: true,
            statusColor: 'navyblue',
            position: 'left',
            alt: `Mensagem: ${message}`,
            date: new Date(),
            dateString: moment(new Date()).format('HH:mm'),
        });
        this.setState({
            messageList: list
        });
    }

    addMessage() {
        var list = this.state.messageList;
        list.push({
            id: String(Math.random()),
            type: 'text',
            text: this.state.inputMessage,
            avatar: `data:image/png;base64,${this.photo()}`,
            avatarFlexible: true,
            statusColor: 'lightgreen',
            position: 'right',
            alt: 'teste alt',
            date: new Date(),
            dateString: moment(new Date()).format('HH:mm'),
        });

        axios.post('http://40.121.17.16:5000/v1/conversation', {
            session: `projects/sammantha-athena/agent/sessions/${this.state.projectId}`,
            queryInput: {
                text: {
                    text: this.state.inputMessage,
                    languageCode: 'pt-BR'
                }
            }
        })
        .then(response => {
            this.receiveMessage(response.data.response)
            this.setState({
                messageList: list,
                inputMessage: ''
            });
        })
        .catch(error => console.log(error));

    }

    render() {

        if (this.state.projectId){
            (
                <div className="App">
                <section name="chat" className="chatContainer">
                <div className='container'>
                    <div
                        className='right-panel'>
                        <MessageList
                            className='message-list'
                            lockable={true}
                            downButtonBadge={10}
                            dataSource={this.state.messageList} />
    
                        <Input
                            placeholder="Envie sua mensagem para Sammy..."
                            ref='input'
                            className="chatInput"
                            multiline={true}
                            value={this.state.inputMessage}
                            onChange={(e) => this.handleChange(e)}
                            // buttonsFloat='left'
                            onKeyPress={(e) => {
                                if (e.shiftKey && e.charCode === 13) {
                                    return true;
                                }
                                if (e.charCode === 13) {
                                    this.refs.input.clear();
                                    this.addMessage();
                                    e.preventDefault();
                                    return false;
                                }
                            }}
                            rightButtons={
                                <Button
                                    text='ENVIAR'
                                    onClick={() => this.addMessage()} />
                            } />
                    </div>
                </div>
                </section>
          </div>
            )        
        } else {
            return (<div>Não foi possível construir o chat</div>)
        }

    }
}

export default Chat;