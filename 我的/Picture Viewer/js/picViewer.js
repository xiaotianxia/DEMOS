//生成九宫格
$(function(){
    var $mask=$(".mask");    
    var len=imgData.length;//图片个数
    
    function init(){
        var $ninePicBox=$(".ninePicBox");
        var $listCont=$(".listCont");
        var smallPicStr='';
        var smallPicArr=[];
        for(var i=0;i<len;i++){
        var fragStr='<li><img class="smallPic" src="img/pic/'
                   +imgData[i].imgName+'" id="imgNO'
                   +(i+1)+'"/></li>';
        smallPicArr.push(fragStr);
        }
        smallPicStr+=smallPicArr.join("");
        smallPicStr+='';
        $(smallPicStr).appendTo($ninePicBox);//九宫格小图
        $(smallPicStr).appendTo($listCont);//横排预览图
    }
    function close(ele){
        ele.addClass("shrink");
        setTimeout(function(){
            ele.css({
            "display":"none"
           })
        }, 300);
    }
    function show(ele){
        ele.addClass("show");
        setTimeout(function(){
            ele.css({
            "display":"block"
           })
        }, 100);
    }
    //循环
    function checkNO(m,n){
        if(m>n){
            m=1;
        }
        if(m<1){
            m=n;
        }
        return m;
    }
    //-------------------换图-------------------------------
    function shift(flag){
        var num=parseInt(curImgId.substr(-1));
        if(flag=="next"){
            num=checkNO(num+1,len);      
        }
        else if(flag=="prev"){
            num=checkNO(num-1,len);      
        }
        nextImgId=curImgId.substr(0,5)+num;
        console.log(nextImgId);
        curImgId=nextImgId;//id变换
        $(".imgCur").attr("src",$("#"+nextImgId).attr("src"));
        $(".imgCur").attr("id",curImgId);
        activeChange(curImgId);
    }
    //-----------------预览图激活状态-----------------------------
    function activeChange(id){
        $(".preview ul li #"+id).parents("li").css({
            "border":"4px solid red"
        });
        $(".preview ul li #"+id).parents("li").siblings().css({
            "border":"4px solid #fff"
        });
    }
//=================================================================
    init();
    //----------------------关闭-------------------------------
    $(".close,.imgBox,.mid").click(function(){
        close($mask);
    });
    //---------------------九宫格-----------------------------
    $(".ninePicBox").on("click",function(e){
        var src=e.target.src;
        curImgId=$(e.target).attr("id");//获取当前图的id
        show($mask);
        $(".preview").addClass("previewShow");
        $(".imgCur").attr("src",src);
        activeChange(curImgId);
    });
    //---------------------9图预览-----------------------------
    $(".preview").on("click",function(e){
        curImgId=$(e.target).attr("id");//获取当前图的id
        var curSrc=$("#"+curImgId).attr("src");
        console.log(curImgId);
        $(".imgCur").attr("src",curSrc);
        $(".preview ul li").css({
            "border":"4px solid #fff"
        });
        activeChange(curImgId);
    });
    //---------------------next-----------------------------
    $(".right").click(function(){
        shift("next");
    });
    //---------------------prev-----------------------------
    $(".left").click(function(){
        shift("prev");
    });
})