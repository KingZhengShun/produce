var React = require("react");
var BannerDiv = require("./swiper.js");

var CusIscroll=React.createClass({
		render:function(){
			return (
				<div id="wrapper">
					<div id="scroller">
						<ul id="listgoods">
							<BannerDiv />
							<ListItem />
						</ul>
					</div>
				</div>
			)
		}
});


 var ListItem=React.createClass({
	render:function(){
		return (
			<li className='listItem'>
				<div>
					<a href=''>
						<img src='http://res2.esf.leju.com/esf_www/statics/images/default-img/detail.png' />
					</a>
				</div>
				<div>
					<div className='itemRTop'>
						<a href=''>好衣服</a>
					</div>
					<div className='itemRBottom'>
						<div>
							<div>
							<span>¥128</span>
							<span> ¥235</span>
						</div>
						<div>8折</div>
					</div>
					<div className='addcard'>
						<span className='iconfont'>&#xe61b;</span>
					</div>
				</div>
			</div>
		</li>

		)
	}
});
 
module.exports = CusIscroll;

