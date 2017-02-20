var name = $("#regName").val();
var pwd = $("#regPwd").val();
var pwdTwo = $("#regPwdTwo").val();
$("#regToIndex").click(function() {
	window.location.href = 'login.html';
})
$("#regPwdTwo").change(function() {
	if(pwd == pwdTwo) {

	} else {
		$(".twoPwd").css("opacity", "1");
	}
})
if(pwd == pwdTwo) {

} else {
	$("#regPwdTwo").css("border", "1px solid red")
	$(".twoPwd").css("opacity", "1");
}
$("#registerBtn").click(function() {
	var name = $("#regName").val();
	var pwd = $("#regPwd").val();
	var pwdTwo = $("#regPwdTwo").val();
	if(name && pwd && pwdTwo) {

	} else {
		$("section span").css("opacity", 1);
		$("section input").css("border", "1px solid red");
		return;
	}
	if(name && pwd) {
		var dataJSON = {
			"status": "register",
			"userID": name,
			"password": pwd
		}

		$.ajax({
			type: "post",
			url: "http://datainfo.duapp.com/shopdata/userinfo.php",
			data: dataJSON,
			success: function(data) {
				console.log(data);
				if(data == 1) {
					var tmpUser = JSON.stringify(dataJSON);
					localStorage.setItem('user', tmpUser);
				} else if(data == 0) {
					$("section span").css("opacity", 1);
					$("section input").css("border", "1px solid red");
				} else if(data == 2) {
					alert("系统错误，请稍后重试");
				}
				window.location.href = 'index.html'
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("XMLHttpRequest==" + XMLHttpRequest);
				console.log("textStatus==" + textStatus);
				console.log("errorThrown==" + errorThrown);
			}
		});
	}

})