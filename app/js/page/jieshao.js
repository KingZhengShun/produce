$(".fanhui").click(function() {
	window.location.href = 'index.html';
});
$("#jieshao").click(function() {
	window.location.href = 'jieshao.html';
});
$("#xiangqing").click(function() {
	window.location.href = 'xiangqing.html';
});
$("#fanhui").click(function() {
	window.location.href = 'index.html';
});
$("#shipai").click(function() {
	window.location.href = 'shipai.html';
});
var goods = localStorage.getItem("doodsID");

var dataJSON = {
	"goodsID": goods
}
$.ajax({
	type: "post",

	url: "http://datainfo.duapp.com/shopdata/getGoods.php",
	data: dataJSON,
	dataType: "JSONP",
	success: function(data) {
		//console.log(data);
		for(var i = 0; i < data.length; i++) {
			var dv = "<div><img src='" + data[i].goodsListImg + "'/></div><button><div></div><span>¥" + data[i].price + "</span><span>" + data[i].goodsName + "</span></button><p>市场价：<s>¥" + data[i].price + "</s><span class='zhe'>" + data[i].discount + "折</span><span class='peo'>" + data[i].buynumber + "人购买</span></p>"
			$("section").append(dv)
		}

	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("XMLHttpRequest==" + XMLHttpRequest);
		console.log("textStatus==" + textStatus);
		console.log("errorThrown==" + errorThrown);
	}
});