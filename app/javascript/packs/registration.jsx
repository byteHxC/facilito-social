import React, { Component } from 'react';
import WebpackerReact from 'webpacker-react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Login } from 'components/registration/login';
import { Signup } from 'components/registration/signup'
injectTapEventPlugin();

class Registration extends Component {
    constructor(){
        super();
        this.state = {
            showLogin: false
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(e) {
        e.preventDefault();
        this.setState({
            showLogin: !this.state.showLogin
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.showLogin ? 
                        <Login toggle={() => this.toggle}/> :
                        <Signup toggle={() => this.toggle}/>
                }
            </div>
                
        );
    }
}

WebpackerReact.setup({Registration});
