var TagSubmit = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.handleSubmit();
    },
    render: function() {
        return (
            <div className="form-group">
            <button type="submit" className="btn btn-default">Submit</button>
            </div>
        );
    }
});

module.exports = TagSubmit;
