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


            .set('#slide01 .logobox',{css:{position:"absolute",top:"50px",left:"150px",opacity:0.9}})
            .set('#slide01 .navbar-header',{css:{position:"absolute",top:"-90px",left:"50px",opacity:0.9}})
            .set('#slide01 .partners',{css:{position:"absolute",width:"400px",top:"-70px",right:"50px",opacity:0.9}})

            .set('#slide01 .tag-1a',{css:{position:"absolute",top:"56%",left:"30%",opacity:0}})
            .set('#slide01 .tag-2a',{css:{position:"absolute",top:"85%",left:"30%",opacity:0}})
            .set('#slide01 .tag-3a',{css:{position:"absolute",top:"70%",left:"98%",opacity:0}})
            .set('#slide01 .tag-4a',{css:{position:"absolute",top:"72%",left:"79%",opacity:0}})
            .set('#slide01 .tag-5a',{css:{position:"absolute",top:"115%",left:"30%",opacity:0}})
            .set('#slide01 .tag-6a',{css:{position:"absolute",top:"135%",left:"30%",opacity:0}})
            .set('#slide01 .tag-7a',{css:{position:"absolute",top:"155%",left:"30%",opacity:0}})

            .set('#slide01 .image1',{css:{display:"block",position:"absolute",top:"0%",left:"-100%",opacity:0}})
            .set('#slide01 .image1b',{css:{display:"block",position:"absolute",top:"0%",left:"20%",opacity:0}})
            .set('#slide01 .image2',{css:{display:"block",position:"absolute",top:"30%",left:"-80%",opacity:0}})
            .set('#slide01 .image2b',{css:{display:"block",position:"absolute",top:"30%",left:"20%",opacity:0}})

            .set('#slide01 .image3',{css:{display:"block",position:"absolute",top:"30%",left:"-70%",width:"34%",height:"100%",opacity:0}})
            .set('#slide01 .image3b',{css:{display:"block",position:"absolute",top:"30%",left:"87%",width:"34%",height:"100%",opacity:0}})
            .set('#slide01 .image4',{css:{display:"block",position:"absolute",top:"30%",left:"-100%",width:"34%",height:"100%",opacity:0}})
            .set('#slide01 .image4b',{css:{display:"block",position:"absolute",top:"30%",left:"70%",width:"34%",height:"100%",opacity:0}})

            .set('#slide01 .image5',{css:{display:"block",position:"absolute",top:"60%",left:"100%",opacity:0}})
            .set('#slide01 .image5b',{css:{display:"block",position:"absolute",top:"60%",left:"20%",opacity:0}})
            .set('#slide01 .image6',{css:{display:"block",position:"absolute",top:"80%",left:"150%",opacity:0}})
            .set('#slide01 .image6b',{css:{display:"block",position:"absolute",top:"80%",left:"20%",opacity:0}})
            .set('#slide01 .image7',{css:{display:"block",position:"absolute",top:"100%",left:"200%",opacity:0}})
            .set('#slide01 .image7b',{css:{display:"block",position:"absolute",top:"100%",left:"20%",opacity:0}})

            .set('#slide01 .category-box-7',{css:{opacity:1}})

            .to($('#slide01 .image7'), 0, {css:{left:"20%",opacity:0.6}}, 0)
            .to($('#slide01 .image6'), 0.2, {css:{left:"20%",opacity:0.6}}, 0)
            .to($('#slide01 .image5'), 0.3, {css:{left:"20%",opacity:0.6}}, 0)
            .to($('#slide01 .image4'), 0.4, {css:{left:"70%",opacity:0.6}}, 0)
            .to($('#slide01 .image3'), 0.5, {css:{left:"87%",opacity:0.6}}, 0)
            .to($('#slide01 .image2'), 0.6, {css:{left:"20%",opacity:0.6}}, 0)
            .to($('#slide01 .image1'), 0.7, {css:{left:"20%",opacity:0.6}}, 0)

            //OFF 1
            .to($('#slide01 .image7b'), 1, {css:{opacity:0.9}}, 0.2)
            .to($('#slide01 .tag-7a'), 0.4, {css:{opacity:1}},'-=1')
	    	.to($('#slide01 h1'), 0.6, {autoAlpha: 0, ease:Power1.easeNone}, 1.5)
	    	.to($('#slide01 section'), 0.6, {autoAlpha: 0, ease:Power1.easeNone}, 1.5)
            .fromTo($('#slide01 .category-box-7'), 2, {y: '0'}, {y: 20, autoAlpha: 0, ease:Power1.easeOut}, '-=1')
			//ON 2
	    	.set($('#slide01 h1'), {text: 'Provisioning'})//numero2
	    	.set($('#slide01 p'), {text: ".."})
	    	.fromTo($('#slide01 h1'), 0.7, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '+=0')
            .to($('#slide01 .image6b'), 1.5, {autoAlpha: 1, ease:Power1.easeIn}, 1)
            .to($('#slide01 .tag-6a'), 0.4, {css:{opacity:1}},'-=1')
	    	.fromTo($('#slide01 section'), 0.6, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.6')
            .fromTo($('#slide01 .category-box-6'), 1, {y: '+=40'}, {y: 0, autoAlpha: 1, ease:Power1.easeIn}, '-=2')
			//OFF 2
            .fromTo($('#slide01 h1'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '+=1')
            .fromTo($('#slide01 section'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '-=0.5')
            .fromTo($('#slide01 .category-box-6'), 2, {y: '0'}, {y: 20, autoAlpha: 0, ease:Power1.easeOut}, '-=1')
			//ON 3
            .set($('#slide01 h1'), {text: 'Runtime'})//numero3
            .set($('#slide01 p'), {text: "Runtime"})
            .fromTo($('#slide01 h1'), 0.7, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0')
            .fromTo($('#slide01 .image5b'), 1.5, {y: '0'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.5')
            .to($('#slide01 .tag-5a'), 0.4, {css:{opacity:1}},'-=1')
            .fromTo($('#slide01 section'), 0.6, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.6')
            .fromTo($('#slide01 .category-box-5'), 1, {y: '+=40'}, {y: 0, autoAlpha: 1, ease:Power1.easeIn}, '-=2')
            //OFF 3
            .fromTo($('#slide01 h1'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '+=1')
            .fromTo($('#slide01 section'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '-=0.5')
            .fromTo($('#slide01 .category-box-5'), 2, {y: '0'}, {y: 20, autoAlpha: 0, ease:Power1.easeOut}, '-=1')
            //ON 4
            .set($('#slide01 h1'), {text: 'Platforms'})//numero3
            .set($('#slide01 p'), {text: "Platforms"})
            .fromTo($('#slide01 h1'), 0.7, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0')
            .fromTo($('#slide01 .image4b'), 1.5, {y: '0'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.5')
            .to($('#slide01 .tag-4a'), 0.4, {css:{opacity:0.9}},'-=1')
            .fromTo($('#slide01 section'), 0.6, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.6')
            .fromTo($('#slide01 .category-box-4'), 1, {y: '+=40'}, {y: 0, autoAlpha: 1, ease:Power1.easeIn}, '-=2')
            //OFF 4
            .fromTo($('#slide01 h1'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '+=1')
            .fromTo($('#slide01 section'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '-=0.5')
            .fromTo($('#slide01 .category-box-4'), 2, {y: '0'}, {y: 20, autoAlpha: 0, ease:Power1.easeOut}, '-=1')
            //ON 5
            .set($('#slide01 h1'), {text: 'Obserbability & Analysis'})//numero3
            .set($('#slide01 p'), {text: "Obserbability & Analysis"})
            .fromTo($('#slide01 h1'), 0.7, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0')
            .fromTo($('#slide01 .image3b'), 1.5, {y: '0'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.5')
            .to($('#slide01 .tag-3a'), 0.4, {css:{opacity:0.9}},'-=1')
            .fromTo($('#slide01 section'), 0.6, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.6')
            .fromTo($('#slide01 .category-box-3'), 1, {y: '+=40'}, {y: 0, autoAlpha: 1, ease:Power1.easeIn}, '-=2')
            //OFF 5
            .fromTo($('#slide01 h1'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '+=1')
            .fromTo($('#slide01 section'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '-=0.5')
            .fromTo($('#slide01 .category-box-3'), 2, {y: '0'}, {y: 20, autoAlpha: 0, ease:Power1.easeOut}, '-=1')
            //ON 6
            .set($('#slide01 h1'), {text: 'Orchestration and Management'})//numero3
            .set($('#slide01 p'), {text: "Orchestration and Management"})
            .fromTo($('#slide01 h1'), 0.7, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0')
            .fromTo($('#slide01 .image2b'), 1.5, {y: '0'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.5')
            .to($('#slide01 .tag-2a'), 0.4, {css:{opacity:0.9}},'-=1')
            .fromTo($('#slide01 section'), 0.6, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.6')
            .fromTo($('#slide01 .category-box-2'), 1, {y: '+=40'}, {y: 0, autoAlpha: 1, ease:Power1.easeIn}, '-=2')
            //OFF 6
            .fromTo($('#slide01 h1'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '+=1')
            .fromTo($('#slide01 section'), 0.6, {y: '0'}, {y: 0, autoAlpha: 0, ease:Power1.easeOut}, '-=0.5')
            .fromTo($('#slide01 .category-box-2'), 2, {y: '0'}, {y: 20, autoAlpha: 0, ease:Power1.easeOut}, '-=1')
            //ON 7
            .set($('#slide01 h1'), {text: 'Data + Application  + APIs'})//numero3
            .set($('#slide01 p'), {text: "Data + Application "})
            .fromTo($('#slide01 h1'), 0.7, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0')
            .fromTo($('#slide01 .image1b'), 1.5, {y: '0'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.5')
            .to($('#slide01 .tag-1a'), 0.4, {css:{opacity:0.9}},'-=1')
            .fromTo($('#slide01 section'), 0.6, {y: '+=20'}, {y: 0, autoAlpha: 1, ease:Power1.easeOut}, '-=0.6')
            .fromTo($('#slide01 .category-box-1'), 1, {y: '+=40'}, {y: 0, autoAlpha: 1, ease:Power1.easeIn}, '-=2')

        	.set($('#slide01 h1'), {css:{color:"red"}}, '+=2');



	    var pinScene01 = new ScrollMagic.Scene({
	        triggerElement: '#slide01', 
	        triggerHook: 0,
	        duration: "850%"
	    })
	    .setPin("#slide01")
	    .setTween(pinScene01Tl)
	    .addTo(controller);


        function getData(){
            $.ajax({
                type: 'GET',
                url: 'datatest/data.json',
                data: { get_param: 'value' },
                success: function (data) {

                	//The categories
                    for (var i in data.children){

                        var category =data.children[i];
                        var boxClass= ".category-box-"+category.key ;

                        var element = $('<h2>')
                            .addClass('category')
                            .text(category.name);
						$(boxClass).append(element);

                        //The Subcategories
						for(var c in category.children){
							var subCategory = category.children[c];

                            var boxItemsClass= "box-items"+category.key+"-"+c ;
                            var boxitems = $('<div>')
                                .addClass(boxItemsClass)
                            $(boxClass).append(boxitems);

                            var element = $('<h5>')
                                .addClass('subcategory')
                                .text(subCategory.name);
                            $(boxClass).append(element);

                            console.log(subCategory.name);
                            for(var m in subCategory.items){

                                var company = subCategory.items[m];
                                console.log(company.name);
                                var companyItem= "item-"+category.key+'-'+c+'-'+m;
								console.log('uniquecompanyid:'+companyItem);

                                var item=$('<div>')
                                    .addClass('item')
                                    .addClass(companyItem)
                                    .attr("style","display:inline-block");

                                $("."+boxItemsClass).after(item);

                                var image =$('<div>')
                                    .addClass('company')
                                    .attr('style',"background-image:url('"+company.logo+"')");
                                $("."+companyItem).append(image);

                                var name =$('<div>')
                                    .addClass('company-name')
                                    .text(company.name)
                                $("."+companyItem).append(name);

                                //console.log(subCategory.items[m]);
							}


						}



                        for(var g in category.children){




                            // var company = items[g];
                            //
                            // //console.log("this is g:"+ g);
                            // var itemClass= "item-"+category.key+"-"+g ;
                            // //console.log("count:"+counter+",itemClass:"+ itemClass);
                            //
                            // var item=$('<div>')
                            //     .addClass('item')
                            //     .addClass(itemClass)
                            //     .attr("style","display:inline-block");
                            //
                            // $("."+boxItemsClass).append(item);
                            //
                            //
                            // var image =$('<div>')
                            //     .addClass('company')
                            //     .attr('style',"background-image:url('"+company.logo+"')");
                            // $("."+itemClass).append(image);
                            //
                            // var name =$('<div>')
                            //     .addClass('company-name')
                            //     .text(company.name)
                            // $("."+itemClass).append(name);

                        }



                    }

                }

            });

        }
		getData();



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