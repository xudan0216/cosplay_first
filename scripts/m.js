$(function(){
    $(".nav-list .list").each(function(){
		$(this).hover(function(){
			$(".nav-list .list .sub-list").hide();
			$(".nav-list .list").removeClass("active");
			$(this).addClass("active");
			$(this).find(".sub-list").show()
		})
	})

	$("#btn-statNav").hover(function(){
		$("#statNav-cont").toggle()
	})

	$(".btn-hd-click").hover(function(){
		$(this).find(".cont").toggle()
	})

	
	//cf

	jQuery("#banner-slideBox").slide({mainCell:".bd ul",autoPlay:true});
	jQuery("#gonglue-slide").slide();
	jQuery("#gengxin-slide").slide();
	jQuery("#zhuanti-slide").slide();
	jQuery("#newvideo-slide").slide();


})