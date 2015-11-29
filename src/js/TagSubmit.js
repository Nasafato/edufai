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

module.exports = TagSubmit;
