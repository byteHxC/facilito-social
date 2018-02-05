module.exports = {
    resolve: {
        alias: {
            React: 'react',
            ReactDOM: 'react-dom'
        }
    },
    externals:{
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-addons-transition-group': 'var window.React.addons.TransitionGroup',
        'react-addons-css-transition-group': 'var window.React.addons.CSSTransitionGroup',
        'react/lib/ReactTransitionGroup': 'var window.React.addons.TransitionGroup',
        'react/lib/ReactCSSTransitionGroup': 'var window.React.addons.CSSTransitionGroup'
        } 
}