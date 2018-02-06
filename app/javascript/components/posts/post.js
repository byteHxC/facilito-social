import React, { Component } from 'react';
import { Card, CardText, CardMedia } from 'material-ui';
import renderHTML from 'react-render-html';
import { Carousel } from '../images/carousel';

export class Post extends Component {
    content(){
        if(this.props.post.html_content){
            return renderHTML(this.props.post.html_content);
        }
        return "";
    }
    image(){
        if(this.props.post.images.length > 0){
            return (
                <CardMedia>
                    <Carousel images={this.props.post.images}/>
                </CardMedia>)
        }
        return "";
    }
    render() {
        return (
            <Card style={{ marginTop: '30px' }}>
                {this.image()}
                
                <CardText> { this.content() } </CardText>
            </Card>
        );
    }
}
