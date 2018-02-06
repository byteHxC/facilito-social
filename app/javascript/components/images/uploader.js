import React, { Component } from 'react';
import reqwest from 'reqwest';

const styles = {
    image: {
        width: '150px',
    },
    progressBar: {
        height: '20px',
        width: '150px',
        backgroundColor: '#222',
        position: 'relative'
    }
}
export class Uploader extends Component {
    constructor(){
        super();
        this.state = {
            progress: 0,
            id: 0,
            imageURL: ""
        }
    }
    componentDidMount() {
        this.getImageUrl();
        this.upload();
    }
    getImageUrl(){
        let imageURL = URL.createObjectURL(this.props.image);
        this.setState({
            imageURL
        })
    }
    image(){
        if(this.state.imageURL){
            return <img src={this.state.imageURL}  style={styles.image} />
        }
        return "";
    }
    upload(){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/images.json');
        
        xhr.onload = (ev) => {
            if(ev.lengthComputable){
                let progress = (ev.loaded / ev.total) * 100;
                this.setState({
                    progress
                })
            }
        }
        xhr.onreadystatechange = (ev) => {
            if(xhr.readyState == 4){
                console.log('Ya se subio');
                this.setState({
                    progress: 100
                })
                let response = JSON.parse(xhr.response);
                this.props.notify(response.id)
            }
        }
        xhr.setRequestHeader('X-CSRF-Token', window.FacilitoSocial.token);
        xhr.send(this.formData());
    }
    formData(){
        let formData = new FormData();
        formData.append('image[image_file', this.props.image);
        return formData;
    }
    render() {
        return (
            <div>
                <div>{this.image()}</div>
                <div style={styles.progressBar}>
                    <div style={{ position: 'absolute', height: '100%', width:(this.state.progress)+'%', backgroundColor:'#2962ff', color: 'white'}}>
                        {this.state.progress}
                    </div>
                </div>
            </div>
        );
    }
}
