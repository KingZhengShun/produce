var React = require("react");
var $ = require('zepto-modules');
require('zepto-modules/ajax');
module.exports = $;

var Swiper=require('')

var BannerDiv=React.createClass({


	getInitialState:function(){
		return {
			data:[],
		}
	},
	
	render:function(){

		var tmpHTML=[];
		var dataAll = this.state.data;
		console.log(dataAll);
		var len=dataAll.length;

		if(len>0){
			var imgUrls=JSON.parse(dataAll[0].goodsBenUrl);
			for (var i = imgUrls.length - 1; i >= 0; i--) {
				var nowSrc = imgUrls[i];
				console.log(nowSrc)
				if(nowSrc){
					tmpHTML.push(<SwiperSlide imgSrc={nowSrc}/>);
				}
			}
		}
		
		return (
			<li id="bannerDiv">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{tmpHTML}
					</div>
				</div>
			</li>
		)
	},

	componentDidMount:function(){
		var _this = this;
		$.post('http://datainfo.duapp.com/shopdata/getBanner.php', {}, function(data, textStatus, xhr) {			
			var data=data.slice(9, -1);
			data=JSON.parse(data);
			console.log(data);
			console.log(_this);
			_this.setState({data:data});
			var mySwiper = new Swiper('#swiper1',{});

		});
    	console.log("banner组件已经加载完成");
	}
	
})

var SwiperSlide=React.createClass({
	render:function(){
		return (
			<div className='swiper-slide'><img src='http://res2.esf.leju.com/esf_www/statics/images/default-img/detail.png'/></div>
		)
	}
})


module.exports=BannerDiv;