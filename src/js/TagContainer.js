var TagList = require('./TagList')
var TagSubmit = require('./TagSubmit')

var TagContainer = React.createClass({
    render: function() {
        return (
            <div className="col-lg-6">
                <form className="center-block" onSubmit={this.props.handleSubmit}>
                    <TagList 
                        tagNames={this.props.tagNames} 
                        tagsChecked={this.props.tagsChecked}
                        handleCheckbox={this.props.handleCheckbox}
                    />
                    <TagSubmit />
                </form>
            </div>
        );
    }
});

module.exports = TagContainer;
