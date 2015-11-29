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

module.exports = SlideView;
