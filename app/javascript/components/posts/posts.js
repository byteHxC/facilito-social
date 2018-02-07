import React, { Component } from 'react';
import { Post } from './post';
import { MuiThemeProvider } from 'material-ui';

export class Posts extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
    }
    publications(){
        if(this.state.posts){
            return this.state.posts.map((post, key) => 
                        (<Post key={post.id}  post={post}></Post>));
        }
        return "";
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            posts: nextProps.posts
        })
    }
    componentDidMount() {
        this.subscribe();
    }
    
    subscribe(){
        App.post = App.cable.subscriptions.create("PostChannel", {
            connected: () => {
                console.log("Conectado a PostChannel");
                
            },
            disconnected: () => {

            },
            received: (data) => {
                let post = JSON.parse(data.data);
                this.setState({
                    posts: [post].concat(this.state.posts)
                })
            }
        })

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
