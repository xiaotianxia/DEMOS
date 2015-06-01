//-----------------------------
//blabla
//-----------------------------

(function(window,document){
// 函数声明区
    function hasClass(elem, className) {
      return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }
    function addClass(elem, className) {
      if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
      }
    }
    function removeClass(elem,cls){
        var aNewClass="";
        var aCls=cls.split(/\s+/);//防止空格不止一个
        if(!aCls.length){
          return elem;
        }
        else{  
            for(var i=0;i<aCls.length;i++){
                var sClass=elem.className;
                var aClass=sClass.split(/\s+/);
                var pos=aClass.indexOf(aCls[i]);
                if(pos!=-1){
                    aClass.splice(pos,1);
                    aNewClass=aClass.join(" ");
                    elem.className=aNewClass;                
                }              
            }
        }
        return elem;
    }
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
    function fadeIn(elem, interval) {
      var timer=null;
      interval = interval || 16;
      elem.style.opacity = 0;
      elem.style.display = 'block';
      var last = +new Date();
      var tick = function() {
        elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
        last = +new Date();
        if(+elem.style.opacity < 1) {
          timer=setTimeout(tick, interval);
        }
        if(+elem.style.opacity >= 1) {
          clearTimeout(timer);
          elem.style.opacity=1;
        }
      };
      tick();
    }
    function fadeOut(elem, interval) {
      interval = interval || 16;
      elem.style.opacity = 1;
      var last = +new Date();
      var tick = function() {
        elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
        last = +new Date();
        if(+elem.style.opacity > 0) {
          setTimeout(tick, interval);
        }else {
          elem.style.display = 'none';
          elem.style.opacity=0;
        }
      };
      tick();
    }
    function openWin(elem,child){
        fadeIn(elem,20);
        addClass(child,"showWin");
        removeClass(child,"hideWin");
        topCentering(child);
    }
    function closeWin(elem,child){
        fadeOut(elem,20);
        addClass(child,"hideWin");
        removeClass(child,"showWin");
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
        console.log(options);
        initHTML(options);
        var oMask=getElement(".mask");
        var oWin=getElement(".win");
        var oClose=getElement(".close");
        var oCancelBtn=getElement(".cancelBtn");
        openWin(oMask,oWin);
        oClose.onclick=oCancelBtn.onclick=function(){
          closeWin(oMask,oWin);
        }
    }

})(window,document);