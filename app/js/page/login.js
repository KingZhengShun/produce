$("#indexToReg").click(function() {
	window.location.href = 'register.html';
})

$("#loginBtn").click(function() {

	var userNmae = $("#loginName").val();
	var userPwd = $("#loginPwd").val();
	if(userNmae && userPwd) {

	} else {
		$("section span").css("opacity", "1");
		$("#loginName").css("border", "1px solid red");
		$("#loginPwd").css("border", "1px solid red");
	}
	if(userNmae && userPwd) {
		var dataJSON = {
			"status": "login",
			"userID": userNmae,
			"password": userPwd
		}
		$.ajax({
			type: "post",
			url: "http://datainfo.duapp.com/shopdata/userinfo.php",
			data: dataJSON,
			success: function(data) {
				//						console.log(data);
				var c = JSON.parse(data);
				if(data == 0) {
					alert("用户名不存在");
				} else if(data == 2) {
					alert("用户名密码不符");
				} else {
					//alert(dataJSON)
					//alert(c.userID);
					//localStorage.removeItem("user");
					if($("#check").prop("checked")) {
						var tmpUser = JSON.stringify(dataJSON);
						//alert(tmpUser)
						localStorage.setItem('user', tmpUser);
						window.location.href = 'index.html';
					} else {
						var datasJSON = {
							"status": "login",
							"userID": userNmae,
						};
						var tmpUser = JSON.stringify(datasJSON);
						localStorage.setItem('user', tmpUser);
						window.location.href = 'index.html';

					}
					//console.log(data)
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("XMLHttpRequest==" + XMLHttpRequest);
				console.log("textStatus==" + textStatus);
				console.log("errorThrown==" + errorThrown);
			}
		});
	}
})
$("#forget").click(function() {
	localStorage.removeItem("user");
})
if(localStorage.getItem('user')) {
	var userObj = localStorage.getItem('user');
	var userObjs = JSON.parse(userObj);
	$("#loginName").val(userObjs.userID);
	$("#loginPwd").val(userObjs.password);
}