import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { MuiThemeProvider, RaisedButton, FlatButton } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import reqwest from 'reqwest';
import { redA400, blueA400, pink500 } from 'material-ui/styles/colors';
import { markdown } from 'markdown';
import { ImageAddAPhoto }  from 'material-ui/svg-icons/';
import { Uploader } from '../images/uploader';

export class PostForm extends Component {
    constructor(){
        super();
        this.state = {
            markdown_content: '',
            html_content: '',
            error: '',
            images: [],
            ids: []
        }
        this.openFilePicker = this.openFilePicker.bind(this);
        this.storeImageID = this.storeImageID.bind(this);
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
                    html_content: markdown.toHTML(this.state.markdown_content),
                    image_ids: this.state.ids
                }
            },
            headers: {
                'X-CSRF-Token': window.FacilitoSocial.token
            }
        }).then( data => {
            this.props.add(data);
            this.refs.markdown_content.resetValue();
            this.setState({
                images: [],
                ids: []
            })
        }).catch(console.log)
    }
    openFilePicker(){
        this.refs.picker.click();
    }
    handleChangeFiles(ev){
        let files = ev.target.files;
        for( var i = 0; i < files.length; i++){
            let file = files[i];
            this.setState({
                images: this.state.images.concat([file])
            })
        }

    }
    storeImageID(id){
        this.setState({
            ids: this.state.ids.concat([id])
        })
    }
    images( ){
        if(this.state.images.length > 0){
            return this.state.images.map( (image, index) => {
                return ( <Uploader image={image} key={index} notify={this.storeImageID} /> )
            })
        }
    }
    render() {
        return (
            <MuiThemeProvider>
                <Formsy.Form onValidSubmit={() => this.submit()}> 
                
                <input
                    onChange={ e => this.handleChangeFiles(e) }
                    style={{ display: 'none'}} 
                    type="file" 
                    multiple="true" 
                    ref="picker"/>
                    <FormsyText
                        name="post[markdown_content]"
                        ref="markdown_content"
                        required
                        onChange={ e => this.syncField(e, 'markdown_content') }
                        fullWidth={true}
                        floatingLabelText="Cuéntanos que está pasando..."
                        multiLine={true} />
                    { this.images() }
                    <div className="text-right">
                        <FlatButton 
                            onClick={this.openFilePicker}
                            icon={ <ImageAddAPhoto /> }/>
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