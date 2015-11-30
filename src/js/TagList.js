// creates a list of checkboxes of all the tags
var TagButton = require('./TagButton');

var TagList = React.createClass({
    render: function() {
        var rows = []
        var self = this;
        var checkboxes = this.props.tagNames.map(function(tag) {
            return (
                <TagButton
                    tagName={tag}
                    checked={this.props.tagsChecked[tag]}
                    handleCheckbox={this.props.handleCheckbox}
                /> 
            );
        }.bind(this));
        return (
            <div className="form-group">
                {checkboxes}
            </div>
        );
    }
});

module.exports = TagList;
