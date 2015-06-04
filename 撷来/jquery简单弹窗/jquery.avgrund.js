(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	$.fn.avgrund = function (options) {
		var defaults = {
			width: 380, // max = 640
			height: 280, // max = 350
			showClose: true,//关闭按钮
			showCloseText: '&times;',//关闭按钮内容
			closeByEscape: true,//Esc键控制关闭
			closeByDocument: true,//document关闭
			holderClass: '',//
			overlayClass: '',//
			enableStackAnimation: true,//
			onBlurContainer: '',//使变模糊的容器名
			openOnEvent: true,//
			setEvent: 'click',//触发弹窗出现的事件
			onLoad: false,
			onUnload: false,
			template: '<p>测试文本。。。。</p>'//弹窗里要展示的内容：function (elem) { }或者$('.content')
		};
		options = $.extend(defaults, options);
		return this.each(function() {
			var self = $(this),
				body = $('body'),
				maxWidth = options.width > 640 ? 640 : options.width,
				maxHeight = options.height > 350 ? 350 : options.height,
				template = typeof options.template === 'function' ? options.template(self) : options.template;
				body.addClass('avgrund-ready');
			if ($('.avgrund-overlay').length === 0) {
				body.append('<div class="avgrund-overlay ' + options.overlayClass + '"></div>');
			}
			if (options.onBlurContainer !== '') {
				$(options.onBlurContainer).addClass('avgrund-blur');
			}
			function onDocumentKeyup (e) {
				if (options.closeByEscape) {
					if (e.keyCode === 27) {
						deactivate();
					}
				}
			}
			function onDocumentClick (e) {
				if (options.closeByDocument) {
					if ($(e.target).is('.avgrund-overlay, .avgrund-close')) {
						e.preventDefault();
						deactivate();
					}
				} else if ($(e.target).is('.avgrund-close')) {
						e.preventDefault();
						deactivate();
				}
			}
			function activate () {
				if (typeof options.onLoad === 'function') {
					options.onLoad(self);
				}
				setTimeout(function() {
					body.addClass('avgrund-active');
				}, 100);
				var $popin = $('<div class="avgrund-popin ' + options.holderClass + '"></div>');
				$popin.append(template);
				body.append($popin);
				$('.avgrund-popin').css({
					'width': maxWidth + 'px',
					'height': maxHeight + 'px',
					'margin-left': '-' + (maxWidth / 2 + 10) + 'px',
					'margin-top': '-' + (maxHeight / 2 + 10) + 'px'
				});
				if (options.showClose) {
					$('.avgrund-popin').append('<a href="#" class="avgrund-close">' + options.showCloseText + '</a>');
				}
				if (options.enableStackAnimation) {
					$('.avgrund-popin').addClass('stack');
				}
				body.bind('keyup', onDocumentKeyup)
					.bind('click', onDocumentClick);
			}

			function deactivate () {
				body.unbind('keyup', onDocumentKeyup)
					.unbind('click', onDocumentClick)
					.removeClass('avgrund-active');
				setTimeout(function() {
					$('.avgrund-popin').remove();
				}, 500);
				if (typeof options.onUnload === 'function') {
					options.onUnload(self);
				}
			}
			if (options.openOnEvent) {
				self.bind(options.setEvent, function (e) {
					e.stopPropagation();
					if ($(e.target).is('a')) {
						e.preventDefault();
					}
					activate();
				});
			} else {
				activate();
			}
		});
	};
}));
