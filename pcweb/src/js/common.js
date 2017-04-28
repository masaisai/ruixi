
$(function() {
	carousel();

	function carousel() {
		position();
		$(window).resize(function() {
			position();
		})
		var timer = null;
		var a = 0;
		bannerPlay();
		//$(".banner").hover(function(){clearInterval(timer)},function(){bannerPlay()});
		$(".prev").hover(function() {
			clearInterval(timer)
		}, function() {
			bannerPlay()
		});
		$(".next").hover(function() {
			clearInterval(timer)
		}, function() {
			bannerPlay()
		});
		$(".banner .hd ul li").hover(function() {
			clearInterval(timer);
			a = $(this).index();
			picSwitch();
		}, function() {
			bannerPlay()
		});

		$(".prev").click(function() {
			a--;
			if(a < 0) {
				a = $(".banner .bd ul li").length - 1;
			}
			picSwitch();
		});

		$(".next").click(function() {
			a++;
			if(a >= $(".banner .bd ul li").length) {
				a = 0;
			}
			picSwitch();
		})

		function position() {
			var w = $(window).width();
			var h = parseInt((6 / 16) * w);
			$(".banner").css("height", h + "px");
			var aTop = parseInt((h - 50) / 2);
			$(".prev").css("top", aTop + "px");
			$(".next").css("top", aTop + "px");
		}

		function bannerPlay() {
			if(timer) {
				clearInterval(timer)
			};
			timer = setInterval(function() {
				a++;
				if(a >= $(".banner .bd ul li").length) {
					a = 0;
				}
				picSwitch();
			}, 5000)
		}

		function picSwitch() {
			$(".banner .hd ul li").eq(a).addClass("active").siblings().removeClass("active")
			$(".banner .bd ul li").eq(a).fadeIn().siblings().fadeOut();
//			$(".banner .bd ul li").eq(a).find(".text").animate({
//				"margin-top": "-65px",
//				"opacity": 1
//			});
//			$(".banner .bd ul li").eq(a).siblings().find(".text").animate({
//				"margin-top": "50px",
//				"opacity": 0
//			});
		}
	}

	//mouseChange({"obj":".banner .bd ul li","area":".banner","type":1});
//	mouseChange({
//		"obj": ".banner .bd ul li .text h1",
//		"area": ".banner",
//		"x": 1,
//		"y": 1,
//		"xs": 0.02,
//		"ys": 0.03
//	});
//	mouseChange({
//		"obj": ".banner .bd ul li .text h3",
//		"area": ".banner",
//		"x": -1,
//		"y": 1,
//		"xs": 0.02,
//		"ys": 0.02
//	});
	mouseChange({
		"obj": ".news .bd ul",
		"area": ".news",
		"x": -1,
		"y": 1,
		"xs": 0.02,
		"ys": 0.02
	});

	function mouseChange(option) {
		option = $.extend({}, {
			"obj": ".banner .bd ul li .text h3",
			"area": ".banner",
			"xs": 0.05,
			"ys": 0.05,
			"x": 1,
			"y": 1,
			"type": 0
		}, option);
		var ePageX = null;
		var ePageY = null;
		var left = parseInt($(option.obj).css("left"));
		var top = parseInt($(option.obj).css("top"));
		$(option.area).mousemove(function(event) {
			event = event || window.event;
			ePageX = event.pageX;
			ePageY = event.pageY - $(document).scrollTop();
			var width = $(window).width() / 2;
			var height = $(window).height() / 2;
			var cx = (width - ePageX) * option.xs * option.x;
			var cy = (height - ePageY) * option.ys * option.y;
			var l = left + cx;
			var t = top + cy;
			if(option.type == 0) {
				$(option.obj).css({
					left: l,
					top: t,
					"transition": "0.3s"
				})
			} else if(option.type == 1) {

				$(option.obj).css({
					"background-position": cx + "px " + cy + "px",
					"transition": "0.3s"
				})
			}

		});
		$(option.area).mouseleave(function(event) {
			event = event || window.event;
			ePageX = event.pageX;
			ePageY = event.pageY;
			$(option.obj).css({
				"left": left + "px",
				"top": top + "px",
				"transition": "0.3s"
			})
		})
	}

	$.fn.extend({
		slider: function(sibling) {
			var firstLeft=$(".nav ul li.current").position().left;
			
			$(this).click(function(){$(this).addClass("current").siblings().removeClass("current");firstLeft=$(this).position().left;})
			sibling.first().after("<li id='bgli'></li>");
			
			$(this).hover(function() {
				var nowleft = $(this).position().left + ($(this).outerWidth() / 2) - 36;

				$("#bgli").moveTo({
					left: nowleft
				}, 1, function() {}, 10);
				$(this).addClass("show").siblings().removeClass("show");
			}, function() {
				$("#bgli").moveTo({
					left: firstLeft+($(".nav ul li.current").outerWidth()) / 2 - 36
				}, 1, function() {}, 10)
				$(".nav ul li.current").addClass("show").siblings().removeClass("show");
			})
		}
	})

	var $li = $(".nav>ul li");
	$li.slider($li)
	$("#bgli").css("left",$(".nav ul li.current").position().left+($(".nav ul li.current").outerWidth()/2) - 36 + "px");
	$(".nav ul li .subNav").each(function(){
		$(this).css("left",($(this).parent("li").outerWidth()/2)-36 + "px")
	})
	$(document).scroll(function() {
		if($(document).scrollTop() > 300) {
			$(".header.scroll").css({
				"background-color": "rgba(255,255,255,1)",
				"height": "80px",
				"box-shadow": "0 0 3px #e8e8e8"
			});
			$(".header.scroll .nav ul li a").css("color", "rgba(0,0,0,1)");
			$(".header.scroll .logo").css("padding-top", "14px");
			$(".header.scroll .logo h1").css("color", "black");
			$(".header.scroll .nav ul li").css({
				"height": "80px",
				"line-height": "80px"
			});
			$(".nav ul li .subNav").css("top","100px")
	$(".nav ul li").hover(function(){
		$(this).find(".subNav").css("display","block").stop(true).animate({"top":"80px","opacity":"1"},"fast")
	},function(){
		$(this).find(".subNav").stop(true).animate({"top":"100px","opacity":"0"},"fast",function(){$(this).css("display","none")})
	})
			
		} else {
			$(".header.scroll").css({
				"background-color": "rgba(0,0,0,0.5)",
				"height": "100px",
				"box-shadow": "none"
			});
			$(".header.scroll .nav ul li a").css("color", "rgba(255,255,255,1)");
			$(".header.scroll .logo").css("padding-top", "24px");
			$(".header.scroll .logo h1").css("color", "white");
			$(".nav ul li").css({
				"height": "100px",
				"line-height": "100px"
			});
			$(".nav ul li .subNav").css("top","120px")
	$(".nav ul li").hover(function(){
		$(this).find(".subNav").css("display","block").stop(true).animate({"top":"100px","opacity":"1"},"fast")
	},function(){
		$(this).find(".subNav").stop(true).animate({"top":"120px","opacity":"0"},"fast",function(){$(this).css("display","none")})
	})
		}
	})
	
	
	//返回顶部
	var offset = 300,
		offset_opacity = 1200,
		scroll_top_duration = 700,
		$back_to_top = $('.cd-top');
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0
		 	}, scroll_top_duration
		);
	});

})
window.onload = function() {

	//配置
	var config = {
		vx: 4, //点x轴速度,正为右，负为左
		vy: 4, //点y轴速度
		height: 2, //点高宽，其实为正方形，所以不宜太大
		width: 2,
		count: 100, //点个数
		color: "210, 211, 211", //点颜色
		stroke: "227,229,229", //线条颜色
		dist: 6000, //点吸附距离
		e_dist: 20000, //鼠标吸附加速距离
		max_conn: 10 //点到点最大连接数
	}
	//调用
	CanvasParticle(config);

	$(document).scroll(function() {
		// console.log($(".serviceWrap").offset().top)
		// console.log($(document).scrollTop())
		// console.log($(window).height())
		loadSection()
	})
	loadSection()

	function loadSection() {
		if(($(".serviceWrap").offset().top - $(document).scrollTop() - $(window).height()) <= -100) {

			$(".section").addClass("active")
		}
		//else{
		// 		$(".section").removeClass("active")
		// 	}
	}
}


    
