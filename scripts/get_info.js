// JavaScript Document
$(function(){
	var userid=GetQueryString("id");
	get_user_info(userid);
});


function get_user_info(userid){
	var string='ghdbcuserid='+userid;
    $.ajax({ 
      type:'POST',
      url:"http://admin.dbc2u.com/zjdbc2u/cosplay/gets.php/Index/get_userinfo.html",
      dataType:'json',
      data:{sign:$.md5(string),userid:userid},
      success:function(json){
        var data=eval(json);
        $("#photo li").remove();
        var html1='<li><img src="'+data.img1+'" onload="AutoResizeImage(850,567,this)" /></li>';
        var html2='<li><img src="'+data.img2+'" onload="AutoResizeImage(850,567,this)" /></li>';
        $("#photo").append(html1);
        $("#photo").append(html2);
        $(".tic-number").html("票数："+data.vote_count);
        $("#pro_num").html("作品编号：<b>"+data.order+"号</b>");
        $("#pro_name").html("作品名：<b>"+data.name+"</b>");
      }
    });
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}