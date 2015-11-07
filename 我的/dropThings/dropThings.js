$(function(){
    DropThings = {
    
        init: function() {
            this.dropThingsNum = 30;
            this.winWidth=window.innerWidth;
            this.body=$('body');

            for (var i = 0; i < this.dropThingsNum; i++) {
                this.body.append(this.createDropThings());
            }

            this.createCloseBtn();
            this.bindEvent();
        },

        bindEvent:function(){
            this.closeBtn.on('click',this.closeDrop);
        },

        createCloseBtn:function(){
            this.closeBtn=$('<div class="dropThingsClose">&times;</div>');
            this.body.append(this.closeBtn);
        },

        createDropThings:function() {
            this.dropThingsDiv = $('<div class="dropThings">');
            this.dropThingsImg = $('<img>');
            
            this.dropThingsImg.attr('src','images/dropThings' + this.randomInteger(1, 6) + '.png');

            this.spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip'; 

            this.fadeAndDropDuration = this.randomFloat(5, 11)+'s';
            this.spinDuration = this.randomFloat(4, 8)+'s';
            this.dropDelay = this.randomFloat(0, 5)+'s';
        /*=============================================== 
        ===drop:直落
        ===dropLeft:向左落
        ===dropright:向右落
        =================================================*/
            var rnd = Math.random();
            if( rnd < 0.5){
                this.dropThingsDiv.css({
                    'top': '-100px',
                    'left': this.randomInteger(0, this.winWidth)+'px',
                    'webkitAnimationName':'fade, drop',
                    'webkitAnimationDuration': this.fadeAndDropDuration + ', ' + this.fadeAndDropDuration,
                    'webkitAnimationDelay': this.dropDelay + ', ' + this.dropDelay
                });
            }
            if( rnd >= 0.5 && rnd < 0.75){
                this.dropThingsDiv.css({
                    'top': '-100px',
                    'left': this.randomInteger(0, this.winWidth)+'px',
                    'webkitAnimationName':'fade, dropLeft',
                    'webkitAnimationDuration': this.fadeAndDropDuration + ', ' + this.fadeAndDropDuration,
                    'webkitAnimationDelay': this.dropDelay + ', ' + this.dropDelay
                });
            }
            if( rnd >= 0.75 && rnd <= 1){
                this.dropThingsDiv.css({
                    'top': '-100px',
                    'left': this.randomInteger(0, this.winWidth)+'px',
                    'webkitAnimationName':'fade, dropRight',
                    'webkitAnimationDuration': this.fadeAndDropDuration + ', ' + this.fadeAndDropDuration,
                    'webkitAnimationDelay': this.dropDelay + ', ' + this.dropDelay
                });
            } 

            this.dropThingsImg.css({
                'webkitAnimationName': this.spinAnimationName,
                'webkitAnimationDuration':this.spinDuration
            });

            this.dropThingsDiv.append(this.dropThingsImg);
            return this.dropThingsDiv;
        },

        closeDrop:function(){
            $(".dropThings").each(function(idx,item){
                item.remove();
            });
            setTimeout(function(){
                $('.dropThingsClose').remove();
            },200);
        },

        randomInteger: function (min, max){
            return min + Math.floor(Math.random() * (max - min));
        },

        randomFloat: function (min, max){
            return min + Math.random() * (max - min);
        }

    }


    DropThings.init();
})