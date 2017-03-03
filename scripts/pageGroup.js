// JavaScript Document
$(function(){
	//根据总页数判断，如果小于5页，则显示所有页数，如果大于5页，则显示5页。根据当前点击的页数生成
	
	var pageCount = 11;//模拟后台总页数
	var order=$("#order").val();//辨别是脑洞大开页面还是颜值爆表页面
	//生成分页按钮
	if(pageCount>5){
		page_icon(1,5,0);
	}else{
		page_icon(1,pageCount,0);
	}
	
	//点击分页按钮触发
	$("#pageGro li").live("click",function(){
		var num = parseInt($(this).html());
		get_show_area(order,num,16);//调用函数
		if(pageCount > 5){
			var pageNum = parseInt($(this).html());//获取当前页数
			pageGroup(pageNum,pageCount);
		}else{
			$(this).addClass("on");
			$(this).siblings("li").removeClass("on");
		}
	});
	
	//点击上一页触发
	$("#pageGro .pageUp").click(function(){
		var num = parseInt($("#pageGro li.on").html())-1;//调用函数
		if(num==0){num=1;}
		get_show_area(order,num,16);
		if(pageCount > 5){
			var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
			pageUp(pageNum,pageCount);
		}else{
			var index = $("#pageGro ul li.on").index();//获取当前页
			if(index > 0){
				$("#pageGro li").removeClass("on");//清除所有选中
				$("#pageGro ul li").eq(index-1).addClass("on");//选中上一页
			}
		}
	});
	
	//点击下一页触发
	$("#pageGro .pageDown").click(function(){
		var num = parseInt($("#pageGro li.on").html())+1;
		get_show_area(order,num,16);//调用函数
		if(pageCount > 5){
			var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
			pageDown(pageNum,pageCount);
		}else{
			var index = $("#pageGro ul li.on").index();//获取当前页
			if(index+1 < pageCount){
				$("#pageGro li").removeClass("on");//清除所有选中
				$("#pageGro ul li").eq(index+1).addClass("on");//选中上一页
			}
		}
	});
});

//点击跳转页面
function pageGroup(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,0);
		break;
		case 2:
			page_icon(1,5,1);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,3);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,4);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,2);
		break;
	}
}

//根据当前选中页生成页面点击按钮
function page_icon(page,count,eq){
	var ul_html = "";
	for(var i=page; i<=count; i++){
		ul_html += "<li>"+i+"</li>";
	}
	$("#pageGro ul").html(ul_html);
	$("#pageGro ul li").eq(eq).addClass("on");
}

//上一页
function pageUp(pageNum,pageCount){
	switch(pageNum){
		case 1:
		break;
		case 2:
			page_icon(1,5,0);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,2);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,3);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,1);
		break;
	}
}

//下一页
function pageDown(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,1);
		break;
		case 2:
			page_icon(1,5,2);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,4);
		break;
		case pageCount:
		break;
		default:
			page_icon(pageNum-2,pageNum+2,3);
		break;
	}
}


//输入三个值的函数并调用此函数
//自己写的ajax
function get_show_area(order,pageNum,count){
	var string='ghdbccount='+count+'order='+order+'page='+pageNum;
    $.ajax({
      type:'POST',
      url:"http://admin.dbc2u.com/zjdbc2u/cosplay/gets.php/Index/get_list.html",
      dataType:'json',
      data:{sign:$.md5(string),count:count,order:order,page:pageNum},
      success:function(json){
        var data=eval(json);
        $("#show_area li").remove();
        for (var i = 0; i < data.length; i++) {
          var tmp_data=data[i];
		  if(tmp_data.name==null){
			break;
		}
          var html='<li><img class="img" src="'
          +tmp_data.img1
          +'" width="228" height="140"><div class="number">'
          +tmp_data.id+'</div><div class="ticket"><span>'
          +tmp_data.name+' '+tmp_data.vout_count
          +'票</span><a href="#" class="big-link" data-reveal-id="myModal">投票</a></div></li>';
          $("#show_area").append(html);
        };
      }
    });
}