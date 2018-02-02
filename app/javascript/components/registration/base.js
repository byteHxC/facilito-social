import React, { Component } from 'react';
import { blueA400, redA400 } from 'material-ui/styles/colors';

export const styles = {
    buttonTop: {
        marginTop: '1em',
    },
    underlineStyle: {
        borderColor: blueA400,
    },
    floatingLabelFocusStyle: {
        color: blueA400
    },
    leftSpace: {
        marginLeft: '1em'
    },
    red: redA400
}


export class Base extends Component {
    constructor(){
        super();
        this.state = {
            canSubmit: true,
            email: '',
            password: '',
            passwordConfirmation: '',
            error: ''
        }
    }
    enableSubmitButton(){
        this.setState({ canSubmit: true });
    }
    disableSubmitButton(){
        this.setState({ canSubmit: false });
    }
    syncField(ev, fieldName){
        let element = ev.target;
        let value = element.value;
        let jsonState = {};
        jsonState[fieldName] = value;
        this.setState(jsonState);
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}
