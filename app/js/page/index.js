var idArray = [];
if(localStorage.getItem("user")) {
	var userObj = JSON.parse(localStorage.getItem("user"));
	var userName = userObj.userID;
	var dataJSON = {
		"userID": userName
	}
	$.ajax({
		type: "post",
		url: "http://datainfo.duapp.com/shopdata/getCar.php",
		dataType: "JSONP",
		data: dataJSON,
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				for(var j = 0; j < data[i].number; j++) {
					idArray.push(data[i].goodsID)
				}
			}
			//	alert(idArray)
			var idsArray = JSON.stringify(idArray);
			localStorage.setItem("cart", idsArray);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("XMLHttpRequest==" + XMLHttpRequest);
			console.log("textStatus==" + textStatus);
			console.log("errorThrown==" + errorThrown);
		}
	});
} else {
	window.location.href = 'login.html';
}


$("#footer div").on("tap",function(e){
	var that = $(this);
	var index = that.index();
	switch(index) {
		case 0:
			window.location.href = 'index.html';
			break;
		case 1:
			window.location.href = 'class.html';
			break;
		case 2:
			window.location.href = 'cart.html';
			break;
		case 3:
			window.location.href = 'myXiu.html';
			break;
		case 4:
			window.location.href = 'more.html';
			break;
	}
})

$(document).on("tap", ".dv2 button", function(event) {

	event.stopPropagation();
	event.preventDefault();
	if(localStorage.getItem("user")) {
		if(localStorage.getItem("cart")) {

		} else {
			var idArray = [];
			var idsArray = JSON.stringify(idArray);
			//alert(idsArray)
			localStorage.setItem("cart", idsArray);
		}
		var userObj = JSON.parse(localStorage.getItem("user"));
		var userName = userObj.userID;
		var cartArray = JSON.parse(localStorage.getItem('cart'));
		cartArray.push($(this).attr('id'));
		var cartsArray = JSON.stringify(cartArray);
		//alert(cartsArray)
		localStorage.setItem("cart", cartsArray);
		var count = 0;
		for(var i = 0; i < cartArray.length; i++) {
			if(cartArray[i] == $(this).attr('id')) {
				count++
			}
		}
		var dataJSON = {
			"userID": userName,
			"goodsID": $(this).attr('id'),
			"number": count
		}
		$.ajax({
			type: "post",
			url: "http://datainfo.duapp.com/shopdata/updatecar.php",
			data: dataJSON,
			success: function(data) {
				if(data == 1) {
					alert("添加成功")
				} else if(data == 0) {
					alert("添加失败，请重试");
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("XMLHttpRequest==" + XMLHttpRequest);
				console.log("textStatus==" + textStatus);
				console.log("errorThrown==" + errorThrown);
			}
		});
	} else {
		window.location.href = 'login.html';
	}

});

var mySwiper = new Swiper('.cusSwiper', {
	pagination: '.swiper-pagination',
	paginationType: 'bullets',
	autoplay: 5000
});
var myScroll = new IScroll('#wrapper', {
	click: true,
	tap: true,

});
$.ajax({
	type: "post",
	url: "http://datainfo.duapp.com/shopdata/getBanner.php",
	dataType: "JSONP",
	success: function(data) {
		//console.log(data[0].goodsBenUrl);
		//					var c = eval(data[0].goodsBenUrl);

		for(var i = 0; i < data.length; i++) {
			var c = data[i].goodsBenUrl.split(',');
			var overtop = c[0].split('[');
			//						console.log(overtop[1]);
			var imgs = "<img src=" + overtop[1] + " />"
			$(".imgs div").eq(i).append(imgs);
		}
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("XMLHttpRequest==" + XMLHttpRequest);
		console.log("textStatus==" + textStatus);
		console.log("errorThrown==" + errorThrown);
	}
});
$.ajax({
	type: "post",
	url: "http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType: "JSONP",
	success: function(data) {
		var idArray = [];
		//					console.log(data[0])
		for(var i = 0; i < data.length; i++) {

			//idArray.push(data[i].goodsID)
			if(data[i].discount == 0) {
				var yuan = parseFloat(data[i].price);
				var yuanjia = yuan.toFixed(2);
			} else {
				var yuan = parseFloat(data[i].discount / 10 * data[i].price);
				var yuanjia = yuan.toFixed(2);
			}
			var reLi = "<li class='indexLi'><div class='dv1'><img src=" + data[i].goodsListImg + " /></div><div class='dv2'><h3>" + data[i].goodsName + "</h3><div><p><span class='yuanjia'>¥" + yuanjia + "</span><s class='price'>¥ " + data[i].price + "</s></p><p class='zhe'>" + data[i].discount + "折</p></div><button id='" + data[i].goodsID + "'><span class='iconfont'>&#xe61b;</span></button></div></li>";
			$(".indexUl").append(reLi);
			myScroll.refresh();
		}
		$(".addCart").click(function() {

			})
			//					var idArray = JSON.stringify(idArray)
			//					localStorage.setItem("idArray",idArray)
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		console.log("XMLHttpRequest==" + XMLHttpRequest);
		console.log("textStatus==" + textStatus);
		console.log("errorThrown==" + errorThrown);
	}
});
$(document).on("click", ".indexLi", function() {

	localStorage.setItem("doodsID", $(this).children(".dv2").children("button").attr("id"));
	document.location.href = 'jieshao.html'
})
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);