import React, { Component } from 'react';
import { Card, CardText } from 'material-ui';
import renderHTML from 'react-render-html';

export class Post extends Component {
    content(){
        if(this.props.html_content){
            return renderHTML(this.props.html_content);
        }
        return "";
    }
    render() {
        return (
            <Card>
                <CardText> { this.content() } </CardText>
            </Card>
        );
    }
}