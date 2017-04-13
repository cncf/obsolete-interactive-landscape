// Init controller
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    duration: $('section').height(),
    triggerHook: .025,
    reverse: true
  }
});


/*
 object to hold href values of links inside our nav with
 the class '.anchor-nav'

 scene_object = {
 '[scene-name]' : {
 '[target-scene-id]' : '[anchor-href-value]'
 }
 }
 */
var scenes = {
  'intro': {
    'intro': 'intro-anchor'
  },
  'scene2': {
    'section-1': 'anchor1'
  },
  'scene3': {
    'section-2': 'anchor2'
  },
  'scene4': {
    'section-3': 'anchor3'
  },
  'scene5': {
    'section-4': 'anchor4'
  },
  'scene6': {
    'section-5': 'anchor5'
  },
  'scene7': {
    'section-6': 'anchor6'
  },
  'scene8': {
    'section-7': 'anchor7'
  },
  'scene9': {
    'section-8': 'anchor8'
  },
  'scene10': {
    'section-9': 'anchor9'
  }
}

for(var key in scenes) {
  // skip loop if the property is from prototype
  if (!scenes.hasOwnProperty(key)) continue;

  var obj = scenes[key];

  for (var prop in obj) {
    // skip loop if the property is from prototype
    if(!obj.hasOwnProperty(prop)) continue;

    new ScrollMagic.Scene({ triggerElement: '#' + prop })
        //.setClassToggle('#' + obj[prop], 'active')
        //.setClassToggle('#module-' + obj[prop], 'active')
        .setClassToggle('.element-' + obj[prop], 'active')
        .addTo(controller);
  }
}



// Change behaviour of controller
// to animate scroll instead of jump
controller.scrollTo(function(target) {

  TweenMax.to(window, 1, {
    scrollTo : {
      y : target,
      autoKill : true // Allow scroll position to change outside itself
    },
    ease : Cubic.easeInOut
  });

});


//  Bind scroll to anchor links using Vanilla JavaScript
var anchor_nav = document.querySelector('.anchor-nav');

anchor_nav.addEventListener('click', function(e) {
  var target = e.target,
      id     = target.getAttribute('href');

  if(id !== null) {
    if(id.length > 0) {
      e.preventDefault();
      controller.scrollTo(id);

      if(window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  }
});


/*
 * Bind scroll to anchor links using jQuery

 $(document).on("click", "a[href^=#]", function(e) {
 var id = $(this).attr("href");

 if($(id).length > 0) {
 e.preventDefault();

 // trigger scroll
 controller.scrollTo(id);

 // If supported by the browser we can also update the URL
 if (window.history && window.history.pushState) {
 history.pushState("", document.title, id);
 }
 }

 });

 */

// GETTING DATA

function getData(){
  $.ajax({
    type: 'GET',
    url: 'datatest/data.json',
    data: { get_param: 'value' },
    success: function (data) {

      //The categories
      for (var i in data.children){

        var category =data.children[i];
        //DEFINING CATEGORY CONTAINER
        var boxClass= ".category-box-"+category.key ;

        //PUSHING CATEGORY NAME
        var element = $('<h2>')
            .addClass('category')
            .text(category.name);
        $(boxClass).append(element);

        //CREATING CATEGORY CONTAINER AND PUSHING IT TO MAIN CONTAINER
        var companiesClass= "companies-"+category.key ;
        var companies = $('<div>')
            .addClass(companiesClass + " companies");
        $(boxClass).append(companies);

        //++++++++++++++++++++++++++++++++++++++++++++++++
        //THE SUBCATEGORIES
        for(var c in category.children){
          var subCategory = category.children[c];

          //DEFINING SUB-CATEGORY CONTAINER
          var boxItemsClass= "box-items"+category.key+"-"+c ;
          var titleItemsClass= "title-items"+category.key+"-"+c ;

          var boxitems = $('<div>')
              .addClass(boxItemsClass)
              .addClass('box-items');
          $("."+companiesClass).append(boxitems);

          //PUSHING SUBCATEGORY NAME


          $("."+titleItemsClass).text(subCategory.name);


          //PUSHING SUBCATEGORY COMPANIES
          for(var m in subCategory.items){

            var company = subCategory.items[m];
            var companyModal= "modal-"+category.key+'-'+c+'-'+m;
            var companyItem= "item-"+category.key+'-'+c+'-'+m;
            var companyTooltip= "tooltip-"+category.key+'-'+c+'-'+m;

            //COMPANY TOOLTIP
            var item=$('<div>')
                .addClass('item')
                .addClass(companyItem+" c-tooltip")
                .attr("style","display:inline-block");
            $("."+boxItemsClass).append(item);

            //COMPANY IMAGE
            var image =$('<h4>')
                .addClass('company')
                .attr('style',"background-image:url('"+company.logo+"')")
                .attr("data-placement","top")
                .attr("title", company.productname);
            $("."+companyItem).append(image);

            //COMPANY NAME
            var name =$('<div>')
                .addClass('company-name')
                .text(company.productname);
            $("."+companyItem).append(name);



            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // MODAL
            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            var modalTemplate = "<div class='item-modal ui basic modal uno'>" +
                "<i class='close icon'></i>" +
                "<div class='ui icon header'> Header text"+
                "</div>"+
                "<div class='content'>"+
                  "<div>" +
                    "<img class='item-image" src="images/logos/js.png'/>" +
                  "</div>" +
                  "<div>" +
                    "<h2>Javascript</h2>" +
                    "<p> Javascript is a high-level, dynamic, untyped</p><hr/>" +
                    "<p>"+
                      " OSS <i class='check icon'></i>"+
                      " <i class='twitter icon'></i> | "+
                      " <i class='github icon'></i> "+
                    "</p>"+
                  "</div>"+
                "</div>"+
                "<div class='actions'>"+
                  "<div class='ui labeled button left floated mini' tabindex='0'>"+
                    "<div class='ui blue button mini'>"+
                      "<i class='github icon'></i> Github stars"+
                    "</div>"+
                    "<a class='ui basic blue left pointing label mini'> 1,049"+
                    "</a>"+
                  "</div>"+
                  "<div class='ui red basic cancel button small'> Close"+
                  "</div>"+
                  "<div class='ui blue ok inverted button small'>"+
                    "<i class='checkmark icon'></i> Visit Website"+
                  "</div>"+
                "</div>"+
            "</div>";


            //THIS CREATES THE HIDDEN MODAL FOR EACH COMPANY
            var allModals =$('<div>')
                .html(modalTemplate);
            $("#allModals").append(allModals);

            var modalContainer =$('<div>')
                .addClass(companyModal+ " c-tooltiptext")
                .text(company.productname);
            $("#companyModals").append(modalContainer);

            //THIS CREATES A USELESS DIV WITH A VALUE , STUPID I KNOW
            var modalTrigger =$('<div>')
                .addClass("findme_"+companyModal)
                .attr("value",companyModal);

            $("."+companyItem).append(modalTrigger);



            //The image
            var image2 =$('<img>')
                .addClass('companyLogo')
                .attr('src',company.logo);
            $("."+companyModal).append(image2);


            //The text content
            var content =$('<div>')
                .addClass(companyTooltip+"_content")
                .addClass(" content");
            $("."+companyModal).append(content);

            //var companyContent = "."+companyModal+"_content";
            var companyContent = "."+companyModal;

            //Twitter
            var social =$('<i>')
                .addClass("fa fa-twitter right")
                .attr("href",company.twitter);
            $("."+companyModal).append(social);

            //Github Stars
            var stars =$('<a>')
                .addClass("label right")
                .attr("href", company.github)
                .text(company.ghstars);
            $("."+companyModal).append(stars);

            //Github
            var social =$('<i>')
                .addClass("fa fa-github right")
                .attr("href", company.twitter);
            $(stars).append(social);

            //OSS

            if(company.oss){
              var oss =$('<span>')
                  .addClass("label right")
                  .text("OSS");
              $(companyContent).append(oss);
            }

            //The Product
            var productName =$('<h5>')
                .text(company.productname);
            $(companyContent).append(productName);

            //The Company Name
            var companyName =$('<p>')
                .text(company.company);
            $(companyContent).append(companyName);

            //Description
            var description =$('<p>')
                .text(company.brief);
            $(companyContent).append(description);

          }

        }

      }

    }

  });

}
getData();



$(document).ready(function(){
  //sidebar
  $("#sidebarTrigger").click(function(){
    $('.ui.sidebar')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('toggle')
    ;

  });

  //modal
  // $("#trigger1").click(function(){
  //   $('.ui.basic.modal')
  //       .modal('show');
  //       blurrr();
  //
  // });



  $("#uno").click(function(){
      $('.ui.basic.modal.uno').modal('setting',{
        onHide: function(){
          console.log('hidden');
          unblurrr();
        },
        onShow: function(){
          console.log('shown');
          blurrr();
        }
      }).modal('show');
  });

  $("#dos").click(function(){
    $('.ui.basic.modal.dos').modal('setting',{
      onHide: function(){
        console.log('hidden');
        unblurrr();
      },
      onShow: function(){
        console.log('shown');
        blurrr();
      }
    }).modal('show');
  });

  $("#tres").click(function(){
    $('.ui.basic.modal.tres').modal('setting',{
      onHide: function(){
        console.log('hidden');
        unblurrr();
      },
      onShow: function(){
        console.log('shown');
        blurrr();
      }
    }).modal('show');
  });




});

function blurrr(){
  $(".module").toggleClass("outfocus");
  $(".cloud-menu").toggleClass("outfocus");
  $("#companyModals").toggleClass("yesvisible");
}
function unblurrr(){
  $(".module").toggleClass("outfocus");
  $(".cloud-menu").toggleClass("outfocus");
  $("#companyModals").toggleClass("yesvisible");
  console.log("on focus again");
}





