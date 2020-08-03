(function($, w) {
	$.extend({
		// content 为提示内容
		// type 提示的类型  info err warning
		toolTips: function(e) {
			if (w.timer) {
				clearTimeout(w.timer)
			}
			$('.alert').remove()

			var html = $(`<div class="alert  alert-${e.type}">${e.content}</div>`)
			$('body').append(html)


			w.timer = setTimeout(function() {
				html.remove()

				if (e.success) {
					e.success()
				}
			}, e.time || 3000);
		}
	})
})(jQuery, window)
