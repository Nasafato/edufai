var SlideView = React.createClass({
    render: function() {
        return (
            <div className="col-lg-6">
                <div className="slideView">
                    <img 
                        className="center-block box-shadow"
                        src={this.props.imageURL} 
                        width='400px'
                        height='400px'
                    />
                </div>
            </div>
        );
    }
});

module.exports = SlideView;
