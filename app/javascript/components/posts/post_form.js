import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { MuiThemeProvider, RaisedButton } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import reqwest from 'reqwest';
import { redA400, blueA400, pink500 } from 'material-ui/styles/colors';
import { markdown } from 'markdown';

export class PostForm extends Component {
    constructor(){
        super();
        this.state = {
            markdown_content: '',
            html_content: '',
            error: '',
        }
    }
    syncField(ev, fieldName){
        let element = ev.target;
        let value = element.value;
        let jsonState = {};
        jsonState[fieldName] = value;
        this.setState(jsonState);
    }

    submit(){
        reqwest({
            url: '/posts.json',
            method: 'POST',
            data: {
                post: {
                    markdown_content: this.state.markdown_content,
                    html_content: markdown.toHTML(this.state.markdown_content)
                }
            },
            headers: {
                'X-CSRF-Token': window.FacilitoSocial.token
            }
        }).then( data => {
            this.props.add(data);
            this.refs.markdown_content.resetValue();
        }).catch(console.log)
    }
    render() {
        return (
            <MuiThemeProvider>
                <Formsy.Form onValidSubmit={() => this.submit()}> 
                    <FormsyText
                        name="post[markdown_content]"
                        ref="markdown_content"
                        required
                        onChange={ e => this.syncField(e, 'markdown_content') }
                        fullWidth={true}
                        floatingLabelText="Cuéntanos que está pasando..."
                        multiLine={true} />
                    <div className="text-right">
                        <RaisedButton
                            label="Publicar"
                            type="submit"
                            backgroundColor={pink500}
                            labelColor="#ffffff"
                        />
                    </div>
                </Formsy.Form>
            </MuiThemeProvider>
        );
    }
}