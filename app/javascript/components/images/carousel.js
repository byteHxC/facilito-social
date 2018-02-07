import React, { Component } from 'react';
import { FloatingActionButton } from 'material-ui';
import { HardwareKeyboardArrowRight, HardwareKeyboardArrowLeft} from 'material-ui/svg-icons'
const styles = {
    image: {
        maxWidth: '100%'
    },
    container: {
        overflow: "hidden",
    },
    infiniteWidth: {
        whiteSpace: 'nowrap',
        position: 'relative',
        transition: 'all 0.4s',
        left: '0'
    },
    controls: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    leftButton: {
        position: 'absolute',
        top: '47%',
        left: '-1.8em'
    },
    rightButton: {
        position: 'absolute',
        top: '47%',
        right: '-1.8em'
    }
}
export class Carousel extends Component {
    constructor(){
        super();
        this.state = {
            images: []
        }
    }
    images(){
        return this.props.images.map((image, i) => {
            return (<img key={i} style={styles.image} src={image.urls.original} />)
        })
    }
    getLeftValue(){
        let styles = window.getComputedStyle(this.refs.carousel, null);
        return parseInt(styles.getPropertyValue('left'));
    }
    getContainerWidth(){
        let styles = window.getComputedStyle(this.refs.carousel.firstChild, null);
        let imgWidth = parseInt(styles.getPropertyValue('width'));
        return imgWidth * (this.props.images.length -1);
    }
    goLeft(e){
        let currentPosition = this.getLeftValue();
        let newPosition = currentPosition + 300;
        if(newPosition > 0) newPosition = 0;
        this.refs.carousel.style.left = newPosition + 'px';
    }
    goRight(e){
        let currentPosition = this.getLeftValue();
        let newPosition = currentPosition - 300;
        if((newPosition * -1) > this.getContainerWidth()) newPosition = - this.getContainerWidth();
        this.refs.carousel.style.left = newPosition + 'px';
    }
    controls(){
        if(this.props.images.length <=1) return "";
        
        return ( 
            <div style={styles.controls}>
                <FloatingActionButton onClick={ e => this.goLeft()} style={styles.leftButton} secondary={true}>
                    < HardwareKeyboardArrowLeft/>
                </FloatingActionButton>
                <FloatingActionButton onClick={ e => this.goRight()} style={styles.rightButton} secondary={true}>
                    <HardwareKeyboardArrowRight/>
                </FloatingActionButton>
            </div>)
    }
    render() {
        return (
            <div style={{ position: 'relative'}}>
               {this.controls()}
                <div style={styles.container}>
                    <div style={styles.infiniteWidth} ref="carousel">
                        {this.images()}
                    </div>
                </div>
            </div>
            
        );
    }
}
