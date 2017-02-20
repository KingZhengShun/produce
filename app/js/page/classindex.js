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

$(document).on("click", ".dv2 button", function(event) {
	console.log(event)
	event.stopPropagation()
	if(localStorage.getItem("user")) {
		if(localStorage.getItem("cart")) {

		} else {
			var idArray = [];
			var idsArray = JSON.stringify(idArray);
			alert(idsArray)
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

		//				alert(userName);
		//				alert($(this).attr('id'))
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

var myScroll = new IScroll('#wrapper', {
	click: true,
	tap: true,

});
var dataJSON = {
	'classID': localStorage.getItem('classID')
}

$.ajax({
	type: "post",
	url: "http://datainfo.duapp.com/shopdata/getGoods.php",
	data: dataJSON,
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
	document.location.href = 'jieshao.html';
});
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);