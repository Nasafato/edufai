(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/alangou/04.PersonalProjects/edufai/src/js/App.js":[function(require,module,exports){
var Holder = require('./Holder');

React.render(React.createElement(Holder, {url: "/api/nextimage"}), document.getElementById('app'));

},{"./Holder":"/Users/alangou/04.PersonalProjects/edufai/src/js/Holder.js"}],"/Users/alangou/04.PersonalProjects/edufai/src/js/Holder.js":[function(require,module,exports){
var SlideView = require('./SlideView');
var TagContainer = require('./TagContainer');


// Holds all the other views
var Holder = React.createClass({displayName: "Holder",
    getInitialState: function() {
        return ({
                    imageName: '',
                    imageURL: '',
                    tagNames: [],
                    tagsChecked: {} 
                });
    },
    loadNextImageFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(image) {
                var tagsChecked = {};
                for (var i = 0; i < image.tagNames.length; i++) {
                    tagsChecked[image.tagNames[i]] = false;
                }
                this.setState(
                    {imageName: image.imageName,
                     imageURL: image.imageURL,
                     tagNames: image.tagNames,
                     tagsChecked: tagsChecked}
                );
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadNextImageFromServer()
    },
    handleSubmit: function() {
        this.loadNextImageFromServer()
    },
    // sets the appropriate tag as checked
    handleCheckbox: function(tagName, value) {
        var tagsChecked = this.state.tagsChecked;
        tagsChecked[tagName] = value;
        this.setState({tagsChecked: tagsChecked});
    },
    render: function() {
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "holder"}, 
                    React.createElement(SlideView, {imageURL: this.state.imageURL}), 
                    React.createElement(TagContainer, {
                        tagNames: this.state.tagNames, 
                        tagsChecked: this.state.tagsChecked, 
                        handleSubmit: this.handleSubmit, 
                        handleCheckbox: this.handleCheckbox}
                    )
                )
            )
        );
    }
});

module.exports = Holder;

},{"./SlideView":"/Users/alangou/04.PersonalProjects/edufai/src/js/SlideView.js","./TagContainer":"/Users/alangou/04.PersonalProjects/edufai/src/js/TagContainer.js"}],"/Users/alangou/04.PersonalProjects/edufai/src/js/SlideView.js":[function(require,module,exports){
var SlideView = React.createClass({displayName: "SlideView",
    render: function() {
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-12"}, 
                    React.createElement("div", {className: "slideView"}, 
                        React.createElement("img", {
                            src: this.props.imageURL, 
                            width: "400px", 
                            height: "400px"}
                        )
                    )
                )
            )
        );
    }
});

module.exports = SlideView;

},{}],"/Users/alangou/04.PersonalProjects/edufai/src/js/TagContainer.js":[function(require,module,exports){
var TagList = require('./TagList')
var TagSubmit = require('./TagSubmit')

var TagContainer = React.createClass({displayName: "TagContainer",
    render: function() {
        return (
            React.createElement("div", {className: "col-md-12"}, 
                React.createElement("div", null, 
                    React.createElement(TagList, {
                        tagNames: this.props.tagNames, 
                        tagsChecked: this.props.tagsChecked, 
                        handleCheckbox: this.props.handleCheckbox}
                    ), 
                    React.createElement(TagSubmit, {handleSubmit: this.props.handleSubmit})
                )
            )
        );
    }
});

module.exports = TagContainer;

},{"./TagList":"/Users/alangou/04.PersonalProjects/edufai/src/js/TagList.js","./TagSubmit":"/Users/alangou/04.PersonalProjects/edufai/src/js/TagSubmit.js"}],"/Users/alangou/04.PersonalProjects/edufai/src/js/TagList.js":[function(require,module,exports){
// creates a list of checkboxes of all the tags
var TagList = React.createClass({displayName: "TagList",
    handleChange: function(tag, e) {
        this.props.handleCheckbox(tag, e.currentTarget.checked);
    },
    render: function() {
        var self = this;
        var checkboxes = this.props.tagNames.map(function(tag) {
            return (
                React.createElement("li", null, 
                    React.createElement("label", null, 
                        React.createElement("input", {
                            type: "checkbox", 
                            value: tag, 
                            checked: self.props.tagsChecked[tag], 
                            onChange: this.handleChange.bind(this, tag)}
                        ), 
                        tag
                    )
                )
            );
        }.bind(this));
        return (
            React.createElement("ul", null, 
                checkboxes
            )
        );
    }
});

module.exports = TagList;

},{}],"/Users/alangou/04.PersonalProjects/edufai/src/js/TagSubmit.js":[function(require,module,exports){
var TagSubmit = React.createClass({displayName: "TagSubmit",
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.handleSubmit();
    },
    render: function() {
        return (
            React.createElement("form", {onSubmit: this.handleSubmit}, 
                React.createElement("input", {type: "submit"})
            ) 
        );
    }
});

module.exports = TagSubmit;

},{}]},{},["/Users/alangou/04.PersonalProjects/edufai/src/js/App.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWxhbmdvdS8wNC5QZXJzb25hbFByb2plY3RzL2VkdWZhaS9zcmMvanMvQXBwLmpzIiwiL1VzZXJzL2FsYW5nb3UvMDQuUGVyc29uYWxQcm9qZWN0cy9lZHVmYWkvc3JjL2pzL0hvbGRlci5qcyIsIi9Vc2Vycy9hbGFuZ291LzA0LlBlcnNvbmFsUHJvamVjdHMvZWR1ZmFpL3NyYy9qcy9TbGlkZVZpZXcuanMiLCIvVXNlcnMvYWxhbmdvdS8wNC5QZXJzb25hbFByb2plY3RzL2VkdWZhaS9zcmMvanMvVGFnQ29udGFpbmVyLmpzIiwiL1VzZXJzL2FsYW5nb3UvMDQuUGVyc29uYWxQcm9qZWN0cy9lZHVmYWkvc3JjL2pzL1RhZ0xpc3QuanMiLCIvVXNlcnMvYWxhbmdvdS8wNC5QZXJzb25hbFByb2plY3RzL2VkdWZhaS9zcmMvanMvVGFnU3VibWl0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUVqQyxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLE1BQU0sRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsZ0JBQWdCLENBQUEsQ0FBRyxDQUFBLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7QUNGOUUsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzdDOztBQUVBLDRCQUE0QjtBQUM1QixJQUFJLDRCQUE0QixzQkFBQTtJQUM1QixlQUFlLEVBQUUsV0FBVztRQUN4QixRQUFRO29CQUNJLFNBQVMsRUFBRSxFQUFFO29CQUNiLFFBQVEsRUFBRSxFQUFFO29CQUNaLFFBQVEsRUFB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WUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUFFO1FBQ3RCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzdCO0lBQ0QsTUFBTSxFQUFFLFdBQVc7UUFDZjtZQUNJLG9CQUFBLE1BQUssRUFBQSxDQUFBLENBQUMsUUFBQSxFQUFRLENBQUUsSUFBSSxDQUFDLFlBQWMsQ0FBQSxFQUFBO2dCQUMvQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLFFBQVEsQ0FBQSxDQUFHLENBQUE7WUFDcEIsQ0FBQTtVQUNUO0tBQ0w7QUFDTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgSG9sZGVyID0gcmVxdWlyZSgnLi9Ib2xkZXInKTtcblxuUmVhY3QucmVuZGVyKDxIb2xkZXIgdXJsPScvYXBpL25leHRpbWFnZScgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG4iLCJ2YXIgU2xpZGVWaWV3ID0gcmVxdWlyZSgnLi9TbGlkZVZpZXcnKTtcbnZhciBUYWdDb250YWluZXIgPSByZXF1aXJlKCcuL1RhZ0NvbnRhaW5lcicpO1xuXG5cbi8vIEhvbGRzIGFsbCB0aGUgb3RoZXIgdmlld3NcbnZhciBIb2xkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlTmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVVJMOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGFnTmFtZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICB0YWdzQ2hlY2tlZDoge30gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgfSxcbiAgICBsb2FkTmV4dEltYWdlRnJvbVNlcnZlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHRoaXMucHJvcHMudXJsLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhZ3NDaGVja2VkID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWFnZS50YWdOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0YWdzQ2hlY2tlZFtpbWFnZS50YWdOYW1lc1tpXV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAge2ltYWdlTmFtZTogaW1hZ2UuaW1hZ2VOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVUkw6IGltYWdlLmltYWdlVVJMLFxuICAgICAgICAgICAgICAgICAgICAgdGFnTmFtZXM6IGltYWdlLnRhZ05hbWVzLFxuICAgICAgICAgICAgICAgICAgICAgdGFnc0NoZWNrZWQ6IHRhZ3NDaGVja2VkfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcm9wcy51cmwsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvYWROZXh0SW1hZ2VGcm9tU2VydmVyKClcbiAgICB9LFxuICAgIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9hZE5leHRJbWFnZUZyb21TZXJ2ZXIoKVxuICAgIH0sXG4gICAgLy8gc2V0cyB0aGUgYXBwcm9wcmlhdGUgdGFnIGFzIGNoZWNrZWRcbiAgICBoYW5kbGVDaGVja2JveDogZnVuY3Rpb24odGFnTmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHRhZ3NDaGVja2VkID0gdGhpcy5zdGF0ZS50YWdzQ2hlY2tlZDtcbiAgICAgICAgdGFnc0NoZWNrZWRbdGFnTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGFnc0NoZWNrZWQ6IHRhZ3NDaGVja2VkfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbGRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8U2xpZGVWaWV3IGltYWdlVVJMPXt0aGlzLnN0YXRlLmltYWdlVVJMfSAvPlxuICAgICAgICAgICAgICAgICAgICA8VGFnQ29udGFpbmVyIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnTmFtZXM9e3RoaXMuc3RhdGUudGFnTmFtZXN9IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnc0NoZWNrZWQ9e3RoaXMuc3RhdGUudGFnc0NoZWNrZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fVxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ2hlY2tib3g9e3RoaXMuaGFuZGxlQ2hlY2tib3h9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIb2xkZXI7XG4iLCJ2YXIgU2xpZGVWaWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVWaWV3XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy5pbWFnZVVSTH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9JzQwMHB4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD0nNDAwcHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNsaWRlVmlldztcbiIsInZhciBUYWdMaXN0ID0gcmVxdWlyZSgnLi9UYWdMaXN0JylcbnZhciBUYWdTdWJtaXQgPSByZXF1aXJlKCcuL1RhZ1N1Ym1pdCcpXG5cbnZhciBUYWdDb250YWluZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPFRhZ0xpc3QgXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdOYW1lcz17dGhpcy5wcm9wcy50YWdOYW1lc30gXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdzQ2hlY2tlZD17dGhpcy5wcm9wcy50YWdzQ2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUNoZWNrYm94PXt0aGlzLnByb3BzLmhhbmRsZUNoZWNrYm94fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8VGFnU3VibWl0IGhhbmRsZVN1Ym1pdD17dGhpcy5wcm9wcy5oYW5kbGVTdWJtaXR9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhZ0NvbnRhaW5lcjtcbiIsIi8vIGNyZWF0ZXMgYSBsaXN0IG9mIGNoZWNrYm94ZXMgb2YgYWxsIHRoZSB0YWdzXG52YXIgVGFnTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uKHRhZywgZSkge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUNoZWNrYm94KHRhZywgZS5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY2hlY2tib3hlcyA9IHRoaXMucHJvcHMudGFnTmFtZXMubWFwKGZ1bmN0aW9uKHRhZykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGFnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGYucHJvcHMudGFnc0NoZWNrZWRbdGFnXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzLCB0YWcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0YWd9XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAge2NoZWNrYm94ZXN9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhZ0xpc3Q7XG4iLCJ2YXIgVGFnU3VibWl0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlU3VibWl0KCk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIC8+XG4gICAgICAgICAgICA8L2Zvcm0+IFxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhZ1N1Ym1pdDtcbiJdfQ==
