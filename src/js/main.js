// Holds all the other views
var Holder = React.createClass({
    getInitialState: function() {
        return ({
                    imageName: '',
                    imageURL: '',
                    tagNames: [],
                    tagsChecked: {} 
                });
    },
    loadNextImageFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(image) {
                var tagsChecked = {};
                for (var i = 0; i < image.tagNames.length; i++) {
                    tagsChecked[image.tagNames[i]] = false;
                }
                this.setState(
                    {imageName: image.imageName,
                     imageURL: image.imageURL,
                     tagNames: image.tagNames,
                     tagsChecked: tagsChecked}
                );
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadNextImageFromServer()
    },
    handleSubmit: function() {
        this.loadNextImageFromServer()
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
                <SlideView imageURL={this.state.imageURL} />
                <TagContainer 
                    tagNames={this.state.tagNames} 
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

React.render(<Holder url='/api/nextimage' />, document.getElementById('app'))
//React.render(<Holder image={image}/>, document.getElementById('app'));
