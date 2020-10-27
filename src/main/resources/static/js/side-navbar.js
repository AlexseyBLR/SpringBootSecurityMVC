(function($) {

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#side-menu-collapse-button').on('click', function () {
      $('#side-menu').toggleClass('active');
  });

})(jQuery);
