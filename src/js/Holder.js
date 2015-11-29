var SlideView = require('./SlideView');
var TagContainer = require('./TagContainer');


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

module.exports = Holder;
