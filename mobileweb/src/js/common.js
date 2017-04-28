$(function(){
	var aBtn=true;
	$("#openMenu").click(function(){
		menuSwitch()
	});
	$(".close").click(function(){
		menuSwitch()
	});
	function menuSwitch(){
		if(aBtn){
			$(".menu").css("display","block");
			$(".menu").animate({"top":"0"},"fast");
			aBtn=false;
		}else{
			$(".menu").animate({"top":"-100%"},"fast",function(){$(".menu").css("display","none");});
			aBtn=true;
		}
	}

$(".menu ul li").click(function(){
	if($(this).hasClass("open")){
		$(this).removeClass("open").find(".subNav").slideUp("fast");
		
	}else{
		$(this).addClass("open").find(".subNav").slideDown("fast");
		$(this).siblings().removeClass("open").find(".subNav").slideUp("fast");
	}
	
})
//	$("#openMenu").click(function(){
//		menuSwitch1()
//	});
//	$(".close").click(function(){
//		menuSwitch1()
//	});
//	function menuSwitch1(){
//		if(aBtn){
//			$(".mainmenu").animate({"top":"0"},"fast");
//			aBtn=false;
//		}else{
//			$(".mainmenu").animate({"top":"-100%"},"fast");
//			aBtn=true;
//		}
//	}
})