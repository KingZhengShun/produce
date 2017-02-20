$(".fanhui").click(function() {
	window.location.href = 'index.html';
});
$("#jieshao").click(function() {
	window.location.href = 'jieshao.html';
});
$("#xiangqing").click(function() {
	window.location.href = 'xiangqing.html';
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
		//console.log(data[0].detail);
		for(var i = 0; i < data.length; i++) {
			var dv = "<div><img src='" + data[i].goodsListImg + "'/></div><p>" + data[i].detail + "</p>"
			$("section").append(dv)
		}

	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("XMLHttpRequest==" + XMLHttpRequest);
		console.log("textStatus==" + textStatus);
		console.log("errorThrown==" + errorThrown);
	}
});