//var Parent = require('./Parent');

//React.render(<Parent />, document.getElementById('app'));

var TagRow = React.createClass({
    render: function() {
        var tagName = this.props.tagName;
        return (
            <tr>
                <td>{tagName}</td>
            </tr>
        );
    }
});


var TagTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.tagNames.forEach(function(tagName) {
            rows.push(<TagRow tagName={tagName} />);
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Tag Name</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});

var SlideView = React.createClass({
    render: function() {
        return (
            <div className="slideView">
                <img src={this.props.imageURL} />
            </div>
        );
    }
});

var Holder = React.createClass({
    render: function() {
        return (
            <div className="holder">
                <SlideView imageURL={this.props.image.imageURL} />
                <TagTable tagNames={this.props.image.tagNames} />
            </div>
        );
    }
});


image = {
    tagNames: [
    'bridge',
    'people',
    'monument',
    'architecture'
    ],
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Taj_Mahal_in_March_2004.jpg/200px-Taj_Mahal_in_March_2004.jpg'
};


React.render(<Holder image={image} />,
             document.getElementById('app'));
