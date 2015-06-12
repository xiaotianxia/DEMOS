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
    $(smallPicStr).appendTo($ninePicBox);
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




    $(".close,.imgBox,.mid").click(function(){
        close($mask);
    });
    $(".ninePicBox").on("click",function(e){
        src=e.target.src;//全局
        curImgId=$(e.target).attr("id");
        show($mask);
        $(".imgCur").attr("src",src);
    });
    $(".right").click(function(){
        var nextImgId=curImgId.substr(0,5)+(parseInt(curImgId.substr(-1))+1);
        curImgId=nextImgId;
        console.log(nextImgId);
        $(".imgCur").attr("src",$("#"+nextImgId).attr("src"));
    });
    $(".left").click(function(){

    });
})