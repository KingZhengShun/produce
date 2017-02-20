//如果本地存储没有保存数据，则显示出场动画
if (!window.localStorage.getItem("first")) {
	window.localStorage.setItem("first", "true"); //设置数据

	$('#myIscroll').hide();
	$('.swiper-container').show();

	$('.exprience').tap(function() {
		$('#myIscroll').show()
		$('.swiper-container').hide();

		//如果没有加载过数据，则加载数据
		if (skill) {
			$.ajax({
				'type': 'get',
				'url': 'http://3.592606942.applinzi.com/skill.php',
				'async': 'true',
				'success': function(data) {
					var dataUrl = data.indexOf("<");
					dataStr = data.substring(0, dataUrl);
					var data = JSON.parse(dataStr);

					$('.wrapper').css({ //默认显示第一个技能页面
						'display': 'none'
					})
					$('#wrapper1').css({
						'display': 'block'
					})
					$('#header .title').html('技能');

					$.each(data, function() { //加载第一个页面的内容
						$('<li>' +
							'<img src=' + this.src + ' alt="规范">' +
							'<div class="infoContainer">' +
							'<p>' + this.category + '</p>' +
							'<p>' + this.time + '&nbsp;&nbsp;' + this.level + '</p>' +
							'<p>' + this.name + '</p>' +
							'</div>' +
							'</li>').appendTo($('#scroller1 ul'))
					})



					var myScroll;
					myScroll = new IScroll('#wrapper1', {
						mouseWheel: true
					});

					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);

					skill = false;
				}
			})
		}

	})

} else {
	if (skill) {
		$.ajax({
			'type': 'get',
			'url': 'http://3.592606942.applinzi.com/skill.php',
			'async': 'true',
			'success': function(data) {
				var dataUrl = data.indexOf("<");
				dataStr = data.substring(0, dataUrl);
				var data = JSON.parse(dataStr);

				$('.wrapper').css({ //默认显示第一个技能页面
					'display': 'none'
				})
				$('#wrapper1').css({
					'display': 'block'
				})
				$('#header .title').html('技能');

				$.each(data, function() { //加载第一个页面的内容
					$('<li>' +
						'<img src=' + this.src + ' alt="规范">' +
						'<div class="infoContainer">' +
						'<p>' + this.category + '</p>' +
						'<p>' + this.time + '&nbsp;&nbsp;' + this.level + '</p>' +
						'<p>' + this.name + '</p>' +
						'</div>' +
						'</li>').appendTo($('#scroller1 ul'))
				})


				setTimeout(function() {
					var myScroll;
					myScroll = new IScroll('#wrapper1', {
						mouseWheel: true
					});

					document.addEventListener('touchmove', function(e) {
						e.preventDefault();
					}, false);

					skill = false;
				}, 500)
			}
		})
	}
}
