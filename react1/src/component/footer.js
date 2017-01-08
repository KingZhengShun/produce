var React = require("react");

var Footer= React.createClass({
	render:function(){
		return (
			<footer>
				<ul>
					<li><span className="iconfont">&#xe644;</span><span>首页</span></li>
					<li><span className="iconfont">&#xe61f;</span><span>分类</span></li>
					<li><span className="iconfont">&#xe61b;</span><span>购物车</span></li>
					<li><span className="iconfont">&#xe646;</span><span>我的秀</span></li>
					<li><span className="iconfont">&#xe615;</span><span>更多</span></li>
				</ul>
			</footer>
		)
	}
});

module.exports=Footer;