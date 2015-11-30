var SlideView = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-lg-6">
                    <div className="slideView">
                        <img 
                            className="center-block"
                            src={this.props.imageURL} 
                            width='400px'
                            height='400px'
                        />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SlideView;
