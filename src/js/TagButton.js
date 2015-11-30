var TagButton = React.createClass({
    handleChange: function(tag, e) {
        this.props.handleCheckbox(tag, e.currentTarget.checked);
    },
    render: function() {
        var styles = {
            backgroundColor: '#911',
            color: 'white'
        };

        return (
            <label 
                className="btn btn-default"
                style={(this.props.checked) ? styles : {}}
            >
                <input
                    className="hidden"
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={this.handleChange.bind(this, this.props.tagName)}
                />
                {this.props.tagName}
            </label>
        );
    }
});

module.exports = TagButton;
