var TagList = require('./TagList')
var TagSubmit = require('./TagSubmit')

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

module.exports = TagContainer;
