//var Parent = require('./Parent');

//React.render(<Parent />, document.getElementById('app'));

var TagRow = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.props.tagName
        );
    },
    render: function() {
        var tagName = this.props.tagChecked ?
            <span style={{color: 'red'}}>
                {this.props.tagName}
            </span> :
            this.props.tagName;
        return (
            <tr>
                <td>{tagName}</td>
                <td>
                    <form>
                        <input 
                            type="checkbox" 
                            checked={this.props.tagChecked} 
                            onChange={this.handleChange} 
                        />
                    </form>
                </td>
            </tr>
        );
    }
});

function isTagNameChecked(listOfTagNames, tagName) {
    for (var i = 0; i < listOfTagNames.length; i++) {
        if (listOfTagNames[i] === tagName) {
            return true;
        }
    }
    return false;
}

var TagTable = React.createClass({
    render: function() {
        var self = this;
        var rows = [];
        var tagsChecked = this.props.tagsChecked;
        this.props.tagNames.forEach(function(tagName) {
            if (isTagNameChecked(tagsChecked, tagName)) {
                rows.push(<TagRow
                            tagName={tagName}
                            tagChecked={true}
                            onUserInput={self.props.onUserInput}
                            />);
            } else {
                rows.push(<TagRow 
                            tagName={tagName} 
                            tagChecked={false}
                            onUserInput={self.props.onUserInput}
                            />);
            }
        }.bind(this));

        return (
            <div className="tagTable row">
                <div className="col-lg-12">
                    <table>
                        <thead>
                            <tr>
                                <th>Tag Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

var SlideView = React.createClass({
    render: function() {
        return (
            <div className="slideView row">
                <div className="col-lg-12">
                    <img src={this.props.imageURL} />
                </div>
            </div>
        );
    }
});

var Holder = React.createClass({
    getInitialState: function() {
        return {
            tagsChecked: ['bridge','people']
        };
    },
    handleUserInput: function(checkedTagName, isChecked) {
        var tagsChecked = this.state.tagsChecked;
        var index = tagsChecked.indexOf(checkedTagName);
        if (index > -1) {
            tagsChecked.splice(index, 1);
        } else {
            tagsChecked.push(checkedTagName);
        }
        this.setState({
            tagsChecked: tagsChecked 
        });
    },
    render: function() {
        return (
            <div className="holder container-fluid">
                <SlideView 
                    imageURL={this.props.image.imageURL} 
                />
                <TagTable 
                    tagNames={this.props.image.tagNames} 
                    tagsChecked={this.state.tagsChecked}
                    onUserInput={this.handleUserInput}
                />
            </div>
        );
    }
});

image = {
    tagNames: [
        'bridge',
        'people',
        'monument',
        'architecture'
    ],
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Taj_Mahal_in_March_2004.jpg/200px-Taj_Mahal_in_March_2004.jpg'
};


React.render(<Holder image={image} />,
             document.getElementById('app'));
