import React, { Component } from 'react';
import { Post } from './post';
import { MuiThemeProvider } from 'material-ui';

export class Posts extends Component {
    
    publications(){
        if(this.props.posts){
            return this.props.posts.map((post, key) => 
                        (<Post key={post.id} html_content={post.html_content}></Post>));
        }
        return "";
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {this.publications()}
                </div>          
            </MuiThemeProvider>
        );
    }
}
