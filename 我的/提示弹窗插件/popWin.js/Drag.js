function Drag(cls){
	var _this=this;
	this.disX=0;
	this.disY=0;
	this.oTarget=document.querySelector(cls);	
	this.oTarget.onmousedown=function (ev){
		_this.fnDown(ev);		
		return false;
	};
}

Drag.prototype.fnDown=function (ev){
	var _this=this;
	var oEvent=ev||event;
	this.disX=oEvent.clientX-this.oTarget.parentNode.parentNode.offsetLeft;
	this.disY=oEvent.clientY-this.oTarget.parentNode.parentNode.offsetTop;
	console.log(this.disX);	
	console.log(this.disY);	
	console.log(this.oTarget.parentNode.parentNode.offsetLeft);	
	console.log(this.oTarget.parentNode.parentNode.offsetTop);	
	console.log(oEvent.clientX);	
	console.log(oEvent.clientY);		
	document.onmousemove=function (ev){
		_this.fnMove(ev);
	};	
	document.onmouseup=function (){
		_this.fnUp();
	};
};

Drag.prototype.fnMove=function (ev){
	var oEvent=ev||event;	
	this.oTarget.parentNode.parentNode.style.left=oEvent.clientX-this.disX+'px';
	this.oTarget.parentNode.parentNode.style.top=oEvent.clientY-this.disY+'px';
};

Drag.prototype.fnUp=function (){
	document.onmousemove=null;
	document.onmouseup=null;
};

//---------------限制拖动范围-----------------------
function LimitDrag(id){
	Drag.call(this, id);
}

//LimitDrag.prototype=Drag.prototype;

for(var i in Drag.prototype){
	LimitDrag.prototype[i]=Drag.prototype[i];
}

LimitDrag.prototype.fnMove=function (ev){
	var oEvent=ev||event;
	var l=oEvent.clientX-this.disX;
	var t=oEvent.clientY-this.disY;
	
	if(l<0){
		l=0;
	}
	else if(l>document.documentElement.clientWidth-this.oTarget.parentNode.parentNode.offsetWidth){
		l=document.documentElement.clientWidth-this.oTarget.parentNode.parentNode.offsetWidth;
	}
	
	if(t<0){
		t=0;
	}
	else if(t>document.documentElement.clientHeight-this.oTarget.parentNode.parentNode.offsetHeight){
		t=document.documentElement.clientHeight-this.oTarget.parentNode.parentNode.offsetHeight;
	}
	
	this.oTarget.parentNode.parentNode.style.left=l+'px';
	this.oTarget.parentNode.parentNode.style.top=t+'px';
};