
var NavBarLink = React.createClass({
    render: function() {
        return (
            <a href={this.props.url}>{this.props.text}</a>
        );
    }
});

var NavBarItem = React.createClass({
    render: function() {
        return (
            <li>
                <NavBarLink url={this.props.url} text={this.props.text} />
            </li>
        ); 
    }
});

var NavBarHeader = React.createClass({
    render: function() {
        return (
            <div className="navbar-header">
                <a className="navbar-brand" href="#">Edufai</a>
            </div>
        );
    }
});


var NavBar = React.createClass({
    generateNavBarItem: function(link) {
        return (<NavBarItem url={link['url']} text={link['text']} />);
    },
    render: function() {
        var navBarItems = [];
        for (var i = 0; i < this.props.links.length; i++) {
            navBarItems.push(this.generateNavBarItem(this.props.links[i]));
        }
        return (
            <div className="container-fluid">
                <NavBarHeader />
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        {navBarItems}
                    </ul>
                </div>
            </div>
        ); 
    }
});

module.exports = NavBar;

links = [
    {url: 'https://www.google.com', text: 'Google'},
    {url: 'http://anandtech.com', text: 'AnandTech'}
];

// React.render(<NavBar links={links} />, document.getElementById('navbar'));


