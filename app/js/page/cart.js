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
var k = 0;
var pr = 0;
var myScroll = new IScroll('#wrapper', {
	mouseWheel: false,
	// 		scrollbars: true
	bounce: false,
	click: true,
	tap: true,
	probeType: 1, //为了实现滚动中状态的监听 1频率比较慢  2 较快
	//		tap:true
});

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
			//console.log(data);
			//alert(data[0].number)
			for(var i = 0; i < data.length; i++) {
				var cartLi = "<li><div class='dv1'><img src=" + data[i].goodsListImg + " /></div><div class='dv2'><h3><span>" + data[i].goodsName + "</span><span class='iconfont remove' id='" + data[i].goodsID + "'>&#xe68d;</span></h3><div><p>单价: <a>¥</a><span>" + data[i].price + "</span></p><p>数量: <button class='jian' index='" + data[i].goodsID + "'>-</button><input index='" + data[i].goodsID + "' class='iptNub" + i + "' type='text'/><button class='add' index='" + data[i].goodsID + "'>+</button></p></div></div></li>";
				$(".cartUl").append(cartLi);
				$(".iptNub" + i).val(data[i].number);
				myScroll.refresh();
				k = k + parseInt(data[i].number);
				pr = pr + parseInt(data[i].number) * parseInt(data[i].price);
			}
			$(".shuliang").html(k);
			$(".allPrice").html(pr);

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
$(document).on("click", ".dv2 .remove", function() {

	var userObj = JSON.parse(localStorage.getItem("user"));
	var userName = userObj.userID;
	//				alert(userName);
	//				alert($(this).attr('id'))
	var datasJSON = {
		"userID": userName,
		"goodsID": $(this).attr('id'),
		"number": 0
	}
	var cartArray = JSON.parse(localStorage.getItem('cart'));
	var le = cartArray.length;
	var textArray = []
	for(var i = 0; i < le; i++) {
		if(cartArray[i] == $(this).attr('id')) {
			textArray.push(i)
		}
	}
	for(var i = textArray.length; i >= 0; i--) {
		cartArray.splice(textArray[i], 1);
	}
	cartsArray = JSON.stringify(cartArray);
	localStorage.setItem("cart", cartsArray);
	$.ajax({
		type: "post",
		url: "http://datainfo.duapp.com/shopdata/updatecar.php",
		data: datasJSON,
		success: function(data) {
			if(data == 1) {
				$(".cartUl").html("");
				var dataJSON = {
					"userID": userName
				}
				$.ajax({
					type: "post",
					url: "http://datainfo.duapp.com/shopdata/getCar.php",
					dataType: "JSONP",
					data: dataJSON,
					success: function(data) {
						var k = 0;
						var pr = 0;

						//console.log(data);
						for(var i = 0; i < data.length; i++) {
							var cartLi = "<li><div class='dv1'><img src=" + data[i].goodsListImg + " /></div><div class='dv2'><h3><span>" + data[i].goodsName + "</span><span class='iconfont remove' id='" + data[i].goodsID + "'>&#xe68d;</span></h3><div><p>单价: <span class='danjia'>" + data[i].price + "</span></p><p>数量: <button class='jian' index='" + data[i].price + "'>-</button><input index='" + data[i].goodsID + "' class='iptNub' type='text'/><button class='add' index='" + data[i].goodsID + "' pr='" + data[i].price + "'>+</button></p></div></div></li>";
							$(".cartUl").append(cartLi);
							$(".iptNub").val(data[i].number);
							k = k + parseInt(data[i].number);
							pr = pr + parseInt(data[i].number) * parseInt(data[i].price);
							myScroll.refresh();
						}
						$(".shuliang").html(k);
						$(".allPrice").html(pr);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("XMLHttpRequest==" + XMLHttpRequest);
						console.log("textStatus==" + textStatus);
						console.log("errorThrown==" + errorThrown);
					}
				});
			} else if(data == 0) {
				alert("删除失败，请重试");
			}

			var dataJSON = {
				"userID": userName
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("XMLHttpRequest==" + XMLHttpRequest);
			console.log("textStatus==" + textStatus);
			console.log("errorThrown==" + errorThrown);
		}
	});
})
$(document).on("click", ".add", function() {
	var shuA = $(this).parent().children("input").val();
	shuA++;

	if(shuA >= 99) {
		shuA = 99
	}
	var priceGet = parseInt($(this).parent().parent().children("p:first").children("span").html());
	console.log(priceGet)
		//alert(shuA)
	var userObj = JSON.parse(localStorage.getItem("user"));
	var userName = userObj.userID;
	//				alert(userName);
	//				alert($(this).attr('id'))
	var dataJSON = {
		"userID": userName,
		"goodsID": $(this).attr('index'),
		"number": shuA
	}
	var cartArray = JSON.parse(localStorage.getItem('cart'));
	cartArray.push($(this).attr('index'));
	var cartsArray = JSON.stringify(cartArray);
	localStorage.setItem("cart", cartsArray);
	$(".shuliang").html(parseInt($(".shuliang").html()) + 1);
	$(".allPrice").html(parseInt($(".allPrice").html()) + priceGet);
	$.ajax({
		type: "post",
		url: "http://datainfo.duapp.com/shopdata/updatecar.php",
		data: dataJSON,
		success: function(data) {
			if(data == 1) {

			} else if(data == 0) {
				alert("删除失败，请重试");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("XMLHttpRequest==" + XMLHttpRequest);
			console.log("textStatus==" + textStatus);
			console.log("errorThrown==" + errorThrown);
		}
	});
	$(this).parent().children("input").val(shuA);
});
$(document).on("click", ".jian", function() {
	var shuL = $(this).parent().children("input").val();
	var priceGet = parseInt($(this).parent().parent().children("p:first").children("span").html());
	shuL--;
	if(shuL <= 0) {
		shuL = 1;
		return;
	}
	var userObj = JSON.parse(localStorage.getItem("user"));
	var userName = userObj.userID;
	//				alert(userName);
	//				alert($(this).attr('id'))
	var dataJSON = {
		"userID": userName,
		"goodsID": $(this).attr('index'),
		"number": shuL
	}
	var cartArray = JSON.parse(localStorage.getItem('cart'));
	for(var i = 0; i < cartArray.length; i++) {
		if(cartArray[i] == $(this).attr('index')) {
			$(".shuliang").html(parseInt($(".shuliang").html()) - 1);
			$(".allPrice").html(parseInt($(".allPrice").html()) - priceGet);
			cartArray.splice(i, 1);
			break;
		}
	}
	var cartsArray = JSON.stringify(cartArray);
	localStorage.setItem("cart", cartsArray);

	$.ajax({
		type: "post",
		url: "http://datainfo.duapp.com/shopdata/updatecar.php",
		data: dataJSON,
		success: function(data) {
			if(data == 1) {

			} else if(data == 0) {
				alert("删除失败，请重试");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("XMLHttpRequest==" + XMLHttpRequest);
			console.log("textStatus==" + textStatus);
			console.log("errorThrown==" + errorThrown);
		}
	});
	$(this).parent().children("input").val(shuL);
});

//alert(k)

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);