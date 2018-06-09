import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Dashboard extends Component {

    state = {
        nome: '',
        email: ''
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    render () {
        return <div>
                <header className="App-header">
                    <h1 className="App-title">Bem vindo a Sammy, a assistente virtual inteligente e divertida da SysMap.</h1>
                </header>
                <section name="chat" className="chatContainer">
                    <div>
                        <input
                            type="text"
                            className="dashInput"
                            name="name"
                            placeholder="Digite seu nome"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div>
                        <input 
                            type="email"
                            className="dashInput"
                            name="email"
                            placeholder="Digite seu email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    {this.disabledName
                    ? <div>
                        <span> Digite o seu nome completo </span>
                    </div>
                    : null}
                    {this.disabledEmail
                    ? <div>
                        <span> Digite o seu nome completo </span>
                    </div>
                    : null}
                    
                    <div>
                        <NavLink to={`/Chat/${this.state.name}/${this.state.email}`} className="startButton"> Iniciar conversa </NavLink>
                    </div>
                </section>
            </div>;
    };
}

export default Dashboard;