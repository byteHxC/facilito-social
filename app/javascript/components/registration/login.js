import React from 'react';
import reqwest from 'reqwest';
import Formsy from 'formsy-react';
import { 
    MuiThemeProvider,
    RaisedButton
    } from 'material-ui';

import { FormsyText } from 'formsy-material-ui/lib';

import { Base, styles } from './base';

export class Login extends Base {
    
    submit(){
        reqwest({
            url: '/users/sign_in.json',
            method: 'POST',
            data: {
                user: {
                    email: this.state.email,
                    password: this.state.password,
                }
            },
            headers: {
                'X-CSRF-Token': window.FacilitoSocial.token
            }
        }).then( data => {
            // console.log(data)
            this.reload();
        }).catch(err => this.handleError(err));
    }
    handleError(err) {
        const errorMessage = JSON.parse(err.response).error;
        this.setState({
            error: errorMessage
        })

    }
    render() {
        return (
            <MuiThemeProvider>
                <Formsy.Form onValid={ () => this.enableSubmitButton() } 
                            onInvalid={ () => this.disableSubmitButton() }
                            onValidSubmit={ () => this.submit()}>
                    <div>{this.state.error}</div>
                    <div>
                        <FormsyText 
                            onChange={ e => this.syncField(e, 'email') }
                            name="email"
                            required
                            validations="isEmail"
                            validationError="Asegúrate de introducir un correo electronico válido"
                            floatingLabelText="Correo electronico"
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            />
                    </div>
                    <div>
                        <FormsyText 
                            onChange={ e => this.syncField(e, 'password') }
                            name="password"
                            required
                            type="password"
                            validationError="Asegúrate de introducir un correo electronico válido"
                            floatingLabelText="Contraseña"
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            />
                    </div>
                    <div>
                        <RaisedButton
                            style={styles.buttonTop}
                            disabled={!this.state.canSubmit}
                            backgroundColor={styles.red}
                            labelColor='#ffffff'
                            type="submit"
                            label="Inciar sesión"/>
                        <a href="#" style={styles.leftSpace} onClick={this.props.toggle()}>Crear cuenta</a>
                    </div>
                </Formsy.Form>
            </MuiThemeProvider>
        );
    }
}
