var SlideView = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="slideView">
                        <img 
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
