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

module.exports = TagList;
