import React, { Component } from 'react';
import WebpackerReact from 'webpacker-react';
import reqwest from 'reqwest';
import { Posts } from '../components/posts/posts';
import { PostForm } from '../components/posts/post_form';

export class PostGroup extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
        this.add = this.add.bind(this);
    }
    componentDidMount() {
        this.getPosts();
    }
    getPosts(){
        reqwest({
            url: 'posts.json',
            method: 'GET',
        }).then ( posts => {
            console.log('Termine la consulta')
            this.setState({
                posts
            })
        })
    }
    add(post){
        this.setState({
            posts: [post].concat(this.state.posts)
        });
    }
    render() {
        return (
            <div>
                <PostForm add={this.add}/>
                <div className="posts-container" >
                    <Posts posts={this.state.posts}/>
                </div>
            </div>
        );
    }
}

WebpackerReact.setup({ PostGroup });