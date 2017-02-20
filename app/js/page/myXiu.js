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
		$("#toIndex").click(function(){
			window.location.href = 'login.html';
		})
		$("#toReg").click(function(){
			window.location.href = 'register.html';
		})
		if(localStorage.getItem("user")){
			var tmpUser = localStorage.getItem("user");
			var tnpUser = JSON.parse(tmpUser)
			$('.userName').html(tnpUser.userID)
			$('#toIndex').css("display",'none');
			$('#toReg').css("display",'none');
		}