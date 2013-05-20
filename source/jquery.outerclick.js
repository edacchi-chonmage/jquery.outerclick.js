;(function ($) {
	var
		Outerclick,
		$html = $('html'),
		handler = typeof $().on ? 'on' : 'bind';

	Outerclick = function ($elementTarget, functionCall) {
		this.$elementTarget = $elementTarget;
		this.functionCall = functionCall;

		this.init();
	};
	Outerclick.prototype = {
		init: function () {
			this.bindEvent();
		},
		bindEvent: function () {
			$html[handler]('click', $.proxy(function (e) {
				this.checkOuterclick(e);
			}, this));
		},
		checkOuterclick: function (e) {
			var
				clickX = e.pageX,
				clickY = e.pageY,
				offsetElementTarget = this.$elementTarget.offset(),
				offsetTopElementTarget = offsetElementTarget.top,
				offsetBottomElementTarget = offsetTopElementTarget + this.$elementTarget.height(),
				offsetLeftElementTarget = offsetElementTarget.left,
				offsetRightElementTarget = offsetLeftElementTarget + this.$elementTarget.width();

			if (!(
				clickY > offsetTopElementTarget &&
				clickY < offsetBottomElementTarget &&
				clickX > offsetLeftElementTarget &&
				clickX < offsetRightElementTarget
			)) {
				this.functionCall(e);
			}
		}
	};
	$.fn.outerclick = function (functionCall) {
		this.each(function () {
			new Outerclick($(this), functionCall);
		});
	};
})(jQuery);
