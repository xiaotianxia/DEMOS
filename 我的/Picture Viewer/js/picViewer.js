//生成九宫格
$(function(){
    var smallPicStr='';
    var smallPicArr=[];
    for(var i=0,len=imgData.length;i<len;i++){
        var fragStr='<li><img class="smallPic" src="img/pic/'
                   +imgData[i].imgName+'" id="imgNO'
                   +(i+1)+'"/></li>';
        smallPicArr.push(fragStr);
    }
    smallPicStr+=smallPicArr.join("");
    smallPicStr+='';
    var $ninePicBox=$(".ninePicBox");
    var $listCont=$(".listCont");
    $(smallPicStr).appendTo($ninePicBox);//九宫格小图
    $(smallPicStr).appendTo($listCont);//横排预览图
    var $mask=$(".mask");
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
    function checkNO(m){
        if(m>9){
            m=1;
        }
        if(m<1){
            m=9;
        }
        return m;
    }
    function shift(flag){
        var num=parseInt(curImgId.substr(-1));
        if(flag=="next"){
            num=checkNO(num+1);      
        }
        else if(flag=="prev"){
            num=checkNO(num-1);      
        }
        nextImgId=curImgId.substr(0,5)+num;
        console.log(nextImgId);
        curImgId=nextImgId;
        $(".imgCur").attr("src",$("#"+nextImgId).attr("src"));
    }



    $(".close,.imgBox,.mid").click(function(){
        close($mask);
    });
    //九宫格
    $(".ninePicBox").on("click",function(e){
        src=e.target.src;//全局
        curImgId=$(e.target).attr("id");
        show($mask);
        $(".imgCur").attr("src",src);
    });
    //9图预览
    $(".preview").on("click",function(e){
        var curId=$(e.target).attr("id");
        var curSrc=$("#"+curId).attr("src");
        console.log(curSrc);
        $(".imgCur").attr("src",curSrc);
    });
    //next
    $(".right").click(function(){
        shift("next");
    });
    //prev
    $(".left").click(function(){
        shift("prev");
    });
})