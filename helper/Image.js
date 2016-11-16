'use strict'
var React = require('react');
var {
  Image,
  Dimensions,
} = require('react-native');

var {width} = Dimensions.get('window')

var baseStyle = {
  backgroundColor: 'transparent',
}
var ResizableImage = React.createClass({
  getInitialState: function() {
    return {
      // set width 1 is for preventing the warning
      // You must specify a width and height for the image %s
      width: this.props.style.width | 1,
      height: this.props.style.height | 1,
    }
  },
  componentDidMount: function() {
    //avoid repaint if width/height is given
  var o_width = this.props.style.width;
  var o_height = this.props.style.height;
  var l_width = 0;
  var l_height = 0;

  var maxWidth = this.props.attri.maxWidth ? this.props.attri.maxWidth : width;

  var that = this;
  var fullScreen = function(w, h){

    if((that.props.attri.full_screen === '1') || w > maxWidth){
      l_width = maxWidth;
      l_height = h*l_width/w;
    }else {
      l_width = w;
      l_height = h;
    }

    if(that.state.width != l_width || that.state.height != l_height){
      that.setState({
        width: l_width,
        height: l_height,
      })
    }

  }

    if (o_width && o_height) {
    fullScreen(o_width, o_height);
    return;
  }

  if(this.props.attri.size){
    var sizeinfo = this.props.attri.size.split(',');
    if(sizeinfo.length >=2){
      fullScreen(parseInt(sizeinfo[0]), parseInt(sizeinfo[1]));
      return;
    }
  }else {
    fullScreen(maxWidth, 117 / 375 * maxWidth);
  }

  // Image.getSize(this.props.source.uri, (w, h) => {
  //  fullScreen(w, h);
  // });
  },

  render: function() {
  // if(!this.state.width && !this.state.height) return null;

  var style = Object.assign(baseStyle, this.props.style, this.state);
  var source = Object.assign({}, this.props.source, this.state);

    return (
      <Image
        style={style}
        source={source} />
    )
  },
})

module.exports = ResizableImage
