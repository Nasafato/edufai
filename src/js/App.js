var Holder = require('./Holder');

React.render(<Holder url='/api/nextimage' />, document.getElementById('app'));


var NavBar = require('./NavBar');

React.render(<NavBar links={links} />, document.getElementById('navbar'));

links = [
    {url: 'https://www.google.com', text: 'Google'},
    {url: 'http://anandtech.com', text: 'AnandTech'}
];
