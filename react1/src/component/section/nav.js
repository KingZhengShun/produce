var React = require("react");

var CusNav=React.createClass({
	render:function(){
		return (
			<nav>
				<div>
					<span className="iconfont">&#xe615;</span>
					<input type="text" placeholder="请输入搜索内容" />
				</div>
			</nav>
		)
	}
});

module.exports=CusNav;
