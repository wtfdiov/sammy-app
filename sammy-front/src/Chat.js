import React, { Component } from 'react';
import {
    MessageList,
    Input,
    Button
} from 'react-chat-elements';

import Identicon from 'identicon.js';
import moment from 'moment';
import axios from 'axios';

import { sammyPhoto } from './img'

export class Chat extends Component {

    state = {
        show: true,
        messageList: [],
        inputMessage: '',
        projectId: null
    };

    componentDidMount() {
        axios.post(`http://40.121.17.16:5000/v1/users/session`, {
            projectId: 'sammantha-athena',
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
            title: 'Sammy diz:',
            text: message,
            avatar: sammyPhoto,
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
            title: 'Você disse:',
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
            session: this.state.projectId,
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
            return (
                <div className="App">
                <section name="chat" className="chatContainer">
                <div className='container'>
                    <div
                        className='right-panel'>
                        <MessageList
                            className='message-list'
                            downButtonBadge={10}
                            toBottomHeight="100%"
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