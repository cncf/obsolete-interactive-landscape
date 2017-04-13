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

            initIndividualModal(companyModal);

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


            if(company.oss){ oss=" OSS <i class='checked icon'></i>" };
            var oss=" OSS <i class='checked icon'></i>" ;

            var modalTemplate = "<i class='close icon'></i>"+
                "<div class='ui icon header'> Header text"+
                "</div>"+
                "<div class='content'>"+
                  "<div>" +
                    "<img class='item-image' src='../"+company.logo+"'/>"+
                  "</div>"+
                  "<div>"+
                    "<h2>"+company.productname+"</h2>"+
                    "<p>"+company.brief+"</p><hr/>"+
                    "<p>"+oss+"</p>"+
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
                "</div>";



            //THIS CREATES THE HIDDEN MODAL FOR EACH COMPANY
            var allModals =$('<div>')
                .addClass("item-modal ui basic modal "+companyModal)
                .html(modalTemplate);
            $("#allModals").append(allModals);


          }

        }

      }

    }

  });

}
getData();



$(document).ready(function(){
//Sketchy things happen here

});


function initIndividualModal(id){

  $("#"+id).click(function(){
    $(".ui.basic.modal."+id).modal('setting',{
      onHide: function(){
        console.log('hidden');
        blurrr();
      },
      onShow: function(){
        console.log('shown');
        blurrr();
      }
    }).modal('show');
  });

}


function blurrr(){
  $(".module").toggleClass("outfocus");
  $(".cloud-menu").toggleClass("outfocus");
  $("#companyModals").toggleClass("yesvisible");
}






