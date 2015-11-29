var TagList = require('./TagList')
var TagSubmit = require('./TagSubmit')

var TagContainer = React.createClass({
    render: function() {
        return (
            <div className="col-md-12">
                <div>
                    <TagList 
                        tagNames={this.props.tagNames} 
                        tagsChecked={this.props.tagsChecked}
                        handleCheckbox={this.props.handleCheckbox}
                    />
                    <TagSubmit handleSubmit={this.props.handleSubmit}/>
                </div>
            </div>
        );
    }
});

module.exports = TagContainer;
