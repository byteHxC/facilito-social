import React from 'react';
import reqwest from 'reqwest';
import Formsy from 'formsy-react';
import { 
    MuiThemeProvider,
    RaisedButton
    } from 'material-ui';

import { FormsyText } from 'formsy-material-ui/lib';

import { Base, styles } from './base';

export class Signup extends Base {
    submit(){
        reqwest({
            url: '/users.json',
            method: 'POST',
            data: {
                user: {
                    email: this.state.email,
                    password: this.state.password,
                    passwordConfirmation: this.state.passwordConfirmation
                }
            },
            headers: {
                'X-CSRF-Token': window.FacilitoSocial.token
            }
        }).then( data => {
            this.reload();
            // console.log(data)
        }).catch(err => this.handleError(err));
    }
    handleError(err){
        const jsonError = JSON.parse(err.response);
        const errors = jsonError.errors;
        let errorsResponse = [];
        for (let key in errors){
            errorsResponse.push(<li key={key}>{errors[key]}</li>)
        }
        this.setState({ error: errorsResponse})
    }
    render() {
        return (
            <MuiThemeProvider>
                <Formsy.Form onValid={ () => this.enableSubmitButton() } 
                            onInvalid={ () => this.disableSubmitButton() }
                            onValidSubmit={ () => this.submit() }>
                    <ul>{this.state.error}</ul>
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
                        <FormsyText 
                            onChange={ e => this.syncField(e, 'passwordConfirmation') }
                            name="password"
                            required
                            type="password"
                            validationError="Asegúrate de introducir un correo electronico válido"
                            floatingLabelText="Confirmar contraseña"
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
                            label="Crear cuenta"/>
                        <a href="#" onClick={this.props.toggle()} style={styles.leftSpace}>Ya tengo cuenta</a>
                    </div>
                </Formsy.Form>
            </MuiThemeProvider>
        );
    }
}
