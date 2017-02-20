$("#jieshao").click(function() {
	window.location.href = 'jieshao.html';
});
$(".fanhui").click(function() {
	window.location.href = 'index.html';
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
var mySwiper = new Swiper('.cusSwiper', {
	pagination: '.swiper-pagination',
	paginationType: 'bullets'
});
$.ajax({
	type: "post",

	url: "http://datainfo.duapp.com/shopdata/getGoods.php",
	data: dataJSON,
	dataType: "JSONP",
	success: function(data) {
		console.log(data[0].goodsBenUrl);
		var benUrl = JSON.parse(data[0].goodsBenUrl)
		for(var i = 0; i < benUrl.length; i++) {

			//						console.log(overtop[1]);
			var imgs = "<div class='swiper-slide'><img src=" + benUrl[i] + " /></div>";
			mySwiper.appendSlide(imgs);
			//						$(".imgs").append(imgs);

		}
		mySwiper.update();
		//				mySwiper.onResize();

	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("XMLHttpRequest==" + XMLHttpRequest);
		console.log("textStatus==" + textStatus);
		console.log("errorThrown==" + errorThrown);
	}
});