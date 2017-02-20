$('#index').click(function() {
	window.location.href = 'index.html';
});
$("#class").click(function() {
	window.location.href = 'class.html';
});
$("#cart").click(function() {
	window.location.href = 'cart.html';
});
$("#myXiu").click(function() {
	window.location.href = 'myXiu.html';
});
$("#more").click(function() {
	window.location.href = 'more.html';
});
var myScroll = new IScroll('#wrapper', {
	mouseWheel: false,
	// 		scrollbars: true
	bounce: false,
	click: true,
	tap: true,
	probeType: 1, //为了实现滚动中状态的监听 1频率比较慢  2 较快
	//		tap:true
});
$.ajax({
	type: "post",
	url: "http://datainfo.duapp.com/shopdata/getclass.php",
	success: function(data) {
		var c = JSON.parse(data);
		//console.log(c[1]);
		for(var i = 0; i < c.length; i++) {
			var li = "<li id='" + c[i].classID + "' class='classLi'>" + c[i].className + "<span>></span></li>";
			$("#classUl").append(li);
			myScroll.refresh();
		}

	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("XMLHttpRequest==" + XMLHttpRequest);
		console.log("textStatus==" + textStatus);
		console.log("errorThrown==" + errorThrown);
	}
});
$(document).on("click", "#classUl .classLi", function() {
	localStorage.setItem("classID", $(this).attr("id"));
	document.location.href = "classindex.html";
})

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);