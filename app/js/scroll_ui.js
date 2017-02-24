(function ($) {

	// Init ScrollMagic
    var controller = new ScrollMagic.Controller();

    // get all slides
	var slides = ["#slide01", "#slide02", "#slide03"];

	// get all headers in slides that trigger animation
	var headers = ["#slide01 header", "#slide02 header", "#slide03 header"];

	// get all break up sections
	var breakSections = ["#cb01", "#cb02", "#cb03"];

	// number of loaded images for preloader progress 
	var loadedCount = 0; //current number of images loaded
	var imagesToLoad = $('.bcg').length; //number of slides with .bcg container
	var loadingProgress = 0; //timeline progress - starts at 0

	$('.bcg').imagesLoaded({
	    background: true
	  }
	).progress( function( instance, image ) {
		loadProgress();
	});

	function loadProgress(imgLoad, image)
	{
	 	//one more image has been loaded
		loadedCount++;

		loadingProgress = (loadedCount/imagesToLoad);

		//console.log(loadingProgress);

		// GSAP timeline for our progress bar
		TweenLite.to(progressTl, 0.7, {progress:loadingProgress, ease:Linear.easeNone});

	}

	//progress animation instance. the instance's time is irrelevant, can be anything but 0 to void  immediate render
	var progressTl = new TimelineMax({paused:true,onUpdate:progressUpdate,onComplete:loadComplete});

	progressTl
		//tween the progress bar width
		.to($('.progress span'), 1, {width:100, ease:Linear.easeNone});

	//as the progress bar witdh updates and grows we put the precentage loaded in the screen
	function progressUpdate()
	{
		//the percentage loaded based on the tween's progress
		loadingProgress = Math.round(progressTl.progress() * 100);
		//we put the percentage in the screen
		$(".txt-perc").text(loadingProgress + '%');

	}

	function loadComplete() {

		// preloader out
		var preloaderOutTl = new TimelineMax();

		preloaderOutTl
			.to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
			.to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
			.set($('body'), {className: '-=is-loading'})
			.set($('#intro'), {className: '+=is-loaded'})
			.to($('#preloader'), 0.7, {yPercent: 100, ease:Power4.easeInOut})
			.set($('#preloader'), {className: '+=is-hidden'})
			.from($('#intro .title'), 1, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.2')
			.from($('#intro p'), 0.7, {autoAlpha: 0, ease:Power1.easeOut}, '+=0.2')
			.from($('.scroll-hint'), 0.3, {y: -20, autoAlpha: 0, ease:Power1.easeOut}, '+=0.1');

		return preloaderOutTl;
	}

	// Enable ScrollMagic only for desktop, disable on touch and mobile devices
	if (!Modernizr.touch) {

		// SCENE 1
		// create scenes for each of the headers
		headers.forEach(function (header, index) {
		    
		    // number for highlighting scenes
			var num = index+1;

		    // make scene
		    var headerScene = new ScrollMagic.Scene({
		        triggerElement: header, // trigger CSS animation when header is in the middle of the viewport 
		        offset: -95 // offset triggers the animation 95 earlier then middle of the viewport, adjust to your liking
		    })
		    .setClassToggle('#slide0'+num, 'is-active') // set class to active slide
		    //.addIndicators() // add indicators (requires plugin), use for debugging
		    .addTo(controller);
		});

	    // SCENE 2
	    // change color of the nav for dark content blocks
	    breakSections.forEach(function (breakSection, index) {
		    
		    // number for highlighting scenes
			var breakID = $(breakSection).attr('id');

		    // make scene
		    var breakScene = new ScrollMagic.Scene({
		        triggerElement: breakSection, // trigger CSS animation when header is in the middle of the viewport 
		        triggerHook: 0.75
		    })
		    .setClassToggle('#'+breakID, 'is-active') // set class to active slide
		    .on("enter", function (event) {
			    $('nav').attr('class','is-light');
			})
		    .addTo(controller);
		});

	    // SCENE 3
	    // change color of the nav back to dark
		slides.forEach(function (slide, index) {

			var slideScene = new ScrollMagic.Scene({
		        triggerElement: slide // trigger CSS animation when header is in the middle of the viewport
		    })
		    .on("enter", function (event) {
			    $('nav').removeAttr('class');
			})
		    .addTo(controller);
	    });

	    // SCENE 4 - parallax effect on each of the slides with bcg
	    // move bcg container when slide gets into the view
		slides.forEach(function (slide, index) {

			var $bcg = $(slide).find('.bcg');

			var slideParallaxScene = new ScrollMagic.Scene({
		        triggerElement: slide, 
		        triggerHook: 1,
		        duration: "100%"
		    })
		    .setTween(TweenMax.from($bcg, 1, {y: '-40%', autoAlpha: 0.3, ease:Power0.easeNone}))
		    .addTo(controller);
	    });

	    // SCENE 5 - parallax effect on the intro slide
	    // move bcg container when intro gets out of the the view

	    var introTl = new TimelineMax();

	    introTl
	    	.to($('#intro header, .scroll-hint'), 0.2, {autoAlpha: 0, ease:Power1.easeNone})
	    	//.to($('#intro .bcg'), 1.4, {y: '20%', ease:Power1.easeOut}, '-=0.2')
	    	.to($('#intro'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone}, 0);

		var introScene = new ScrollMagic.Scene({
	        triggerElement: '#intro', 
	        triggerHook: 0,
	        duration: "100%"
	    })
	    .setTween(introTl)
	    .addTo(controller);

	    // SCENE 6 - pin the first section
	    // and update text

	    var pinScene01Tl = new TimelineMax();

	    pinScene01Tl

            .set('#slide01 .image1',{css:{display:"block",position:"absolute",top:"0px",left:"150px",width:"300px",opacity:0.9}})
            .set('#slide01 .image2',{css:{display:"block",position:"absolute",top:"50px",left:"150px",width:"300px",opacity:0.2}})
            .set('#slide01 .image3',{css:{display:"block",position:"absolute",top:"150px",left:"100px",width:"300px",opacity:0.2}})
	    	.to($('#slide01 h1'), 0.2, {autoAlpha: 0, ease:Power1.easeNone}, 1.5)
            .to($('#slide01 .image1'), 0.2, {autoAlpha: 0.2, ease:Power1.easeNone}, 1.5)
	    	.to($('#slide01 section'), 0.2, {autoAlpha: 0, ease:Power1.easeNone}, 1.5)

	    	.set($('#slide01 h1'), {text: 'Floor 222222'})//numero2
	    	.set($('#slide01 p'), {text: "Subtitle 222222"})
	    	.fromTo($('#slide01 h1'), 0.7, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '+=0.4')
            .to($('#slide01 .image2'), 0.5, {autoAlpha: 0.9, ease:Power1.easeNone}, 1.5)
	    	.fromTo($('#slide01 section'), 0.6, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.6')

    		.set($('#slide01 h1'), {text: 'Floor 333333'})//numero 3
            .set($('#slide01 p'), {text: "Subtitle 333333"})
            .fromTo($('#slide01 h1'), 0.7, {y: '+=0'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '+=0.4')
            .fromTo($('#slide01 section'), 0.6, {y: '+=0'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.6')
            .to($('#slide01 .image3'), 0.5, {autoAlpha: 0.9, ease:Power1.easeNone}, 1.5)
            .set($('#slide01 h1'), {autoAlpha: 1}, '+=2');



	    var pinScene01 = new ScrollMagic.Scene({
	        triggerElement: '#slide01', 
	        triggerHook: 0,
	        duration: "250%"
	    })
	    .setPin("#slide01")
	    .setTween(pinScene01Tl)
	    .addTo(controller);

	    // SCENE 7 - pin the second section
	    // and update text

	    var pinScene02Tl = new TimelineMax();

	    pinScene02Tl
	    	.to($('#slide02 h1'), 0.2, {autoAlpha: 0, ease:Power1.easeNone}, 1.5)
	    	.to($('#slide02 section'), 0.2, {autoAlpha: 0, ease:Power1.easeNone}, 1.5)
	    	.set($('#slide02 h1'), {text: "Title here"})
	    	.set($('#slide02 p'), {text: "Subtitle here"})
	    	.to($('#slide02 .bcg'), 0.6, {scale: 1.2, transformOrigin: '0% 0%', ease:Power0.easeNone})
	    	.fromTo($('#slide02 h1'), 0.7, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '+=0.4')
	    	.fromTo($('#slide02 section'), 0.6, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.6')
	    	.set($('#slide02 h1'), {autoAlpha: 1}, '+=2.5');

	    var pinScene02 = new ScrollMagic.Scene({
	        triggerElement: '#slide02', 
	        triggerHook: 0,
	        duration: "300%"
	    })
	    .setPin("#slide02")
	    .setTween(pinScene02Tl)
	    .addTo(controller);

	    // change behaviour of controller to animate scroll instead of jump
		controller.scrollTo(function (newpos) {
			TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease:Power1.easeInOut});
		});

		//  bind scroll to anchor links
		$(document).on("click", "a[href^='#']", function (e) {
			var id = $(this).attr("href");
			if ($(id).length > 0) {
				e.preventDefault();

				// trigger scroll
				controller.scrollTo(id);

					// if supported by the browser we can even update the URL.
				if (window.history && window.history.pushState) {
					history.pushState("", document.title, id);
				}
			}
		});

	}

}(jQuery));