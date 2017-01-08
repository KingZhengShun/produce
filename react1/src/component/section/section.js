var React = require("react");
var CusNav = require("./nav.js");
var CusIscroll = require("./iscroll.js");

var Container=React.createClass({
	render:function(){
		return (
			<section id="container">
				<CusNav />
				<CusIscroll />
			</section>
		)
	}
});

module.exports=Container;
