// Holds all the other views
var Holder = React.createClass({
    getInitialState: function() {
        var tagsChecked = {}; // manages the checkboxes
        for (var i = 0; i < this.props.image.tagNames.length; i++) {
            tagsChecked[this.props.image.tagNames[i]] = false;
        }
        return ({
                    image: this.props.image,
                    tagsChecked: tagsChecked
                });
    },
    // TODO: make this connect with the server and fetch the next image
    handleSubmit: function() {
        image2 = {
            tagNames: [
                'nature',
                'forest',
                'trees',
                'wildlife'
            ],
            imageURL: 'http://www.vccd.org/new%20bridge%20(640x425).jpg'
        }
        tagsChecked = {}
        for (var i = 0; i < image2.tagNames.length; i++) {
            tagsChecked[image2.tagNames[i]] = false
        }
        this.setState({image: image2, tagsChecked: tagsChecked});
    },

    // sets the appropriate tag as checked
    handleCheckbox: function(tagName, value) {
        var tagsChecked = this.state.tagsChecked;
        tagsChecked[tagName] = value;
        this.setState({tagsChecked: tagsChecked});
    },
    render: function() {
        return (
            <div className="holder">
                <SlideView imageURL={this.state.image.imageURL} />
                <TagContainer 
                    tagNames={this.state.image.tagNames} 
                    tagsChecked={this.state.tagsChecked}
                    handleSubmit={this.handleSubmit}
                    handleCheckbox={this.handleCheckbox}
                />
            </div>
        );
    }
});

// holds the picture
var SlideView = React.createClass({
    render: function() {
        return (
            <div className="slideView">
                <img 
                    src={this.props.imageURL} 
                    width='400px'
                    height='400px'
                />
            </div>
        );
    }
});

// holds the list of tags as well as the submit button
var TagContainer = React.createClass({
    render: function() {
        return (
            <div>
                <TagList 
                    tagNames={this.props.tagNames} 
                    tagsChecked={this.props.tagsChecked}
                    handleCheckbox={this.props.handleCheckbox}
                />
                <TagSubmit handleSubmit={this.props.handleSubmit}/>
            </div>
        );
    }
});

// creates a list of checkboxes of all the tags
var TagList = React.createClass({
    handleChange: function(tag, e) {
        this.props.handleCheckbox(tag, e.currentTarget.checked);
    },
    render: function() {
        var self = this;
        var checkboxes = this.props.tagNames.map(function(tag) {
            return (
                <li>
                    <label>
                        <input 
                            type="checkbox" 
                            value={tag}
                            checked={self.props.tagsChecked[tag]}
                            onChange={this.handleChange.bind(this, tag)}
                        />
                        {tag}
                    </label>
                </li>
            );
        }.bind(this));
        return (
            <ul>
                {checkboxes}
            </ul>
        );
    }
});

// submits the checked tags and moves on to the next image
var TagSubmit = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.handleSubmit();
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="submit" />
            </form> 
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

image2 = {
    tagNames: [
        'nature',
        'forest',
        'trees',
        'wildlife'
    ],
    imageURL: 'http://www.vccd.org/new%20bridge%20(640x425).jpg'
}

React.render(<Holder image={image}/>, document.getElementById('app'));
