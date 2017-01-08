var React =require("react");
var Header = require("./header.js"); 
var Footer =require("./footer.js");
var Section = require("./section/section.js");

var InderxApp = React.createClass({
	render:function(){
		return (
			<div>
				<Header />
				<Section />		
				<Footer />
			</div>
		)
	}
});
module.exports=InderxApp;