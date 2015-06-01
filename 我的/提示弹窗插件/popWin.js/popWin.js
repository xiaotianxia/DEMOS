//-----------------------------
//blabla
//-----------------------------

(function(window,document){
// 函数声明区
    function initHTML(options){
        var popWinHTML='<div class="mask"><div class="win"><div class="topCont"><div class="titleDiv"><p>'
                      +options.title
                      +'</p></div><div class="close">&times;</div></div><div class="contentCont"><div class="imageDiv"><div class="'
                      +options.infoType
                      +'"></div></div><div class="content"><p>'
                      +options.content
                      +'</p></div></div><div class="btnCont">'
                      +(options.isCancelBtn?'<button class="btn confirmBtn">确定</button>':'')
                      +'<button class="btn cancelBtn">取消</button></div></div></div>';
        document.body.innerHTML+=popWinHTML;
    }
    function getElement(eleCls){
        return document.querySelector(eleCls);
    }
    Object.prototype.extend=function (opts){
        var option={};
        for(var i in this){
            if(typeof opts[i]=="boolean"){
                option[i]=opts[i];
            }
            else{
                option[i]=opts[i]||this[i];
            }
        }
        return option;
    }
    function topCentering(elem){
        var height = elem.clientHeight;
        var padding = parseInt(getComputedStyle(elem).getPropertyValue('padding'), 10);
        elem.style.marginTop=-parseInt(height / 2 + padding) + 'px';
    }
    function openWin(elem){
        elem.style.display="block";
    }
    function closeWin(elem){
        elem.style.display="none";
        // document.body.removeChild(elem);
    }



//函数调用区 
    window.popWin=function(option){
        var defaults={
            "title":"提示信息",
            "infoType":"success",
            "content":"提示内容",
            "isCancelBtn":true
        }
        var options=defaults.extend(option);
        // console.log(options);
        initHTML(options);
        var oMask=getElement(".mask");
        var oWin=getElement(".win");
        var oClose=getElement(".close");
        var oCancelBtn=getElement(".cancelBtn");
        openWin(oMask);
        topCentering(oWin);
        oClose.onclick=oCancelBtn.onclick=function(){
            closeWin(oMask);
        }
    }
})(window,document);