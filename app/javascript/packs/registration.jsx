import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

class Registration extends Component {
    render() {
        return (
            <div>
                <p>Hola nuevo componente</p>
            </div>
        );
    }
}

Registration.propTypes = {

};

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(<Registration/>,
         document.getElementById('react-container'));
  })
