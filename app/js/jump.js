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
    'starter': 'anchor0'
  },
  'scene7': {//7
    'infrastructure': 'anchor7'
  },
  'scene7-0': {//7-0
    'infrastructure_details': 'anchor7-0'
  },
  'scene6': {//6
    'provisioning': 'anchor6'
  },
  'scene6-0': {//6-0
    'infrastructure_automation': 'anchor6-0'
  },
  'scene6-1': {//6-1
    'host_management': 'anchor6-1'
  },
  'scene6-2': {//6-2
    'secure_images': 'anchor6-2'
  },
  'scene5': {//5
    'runtime': 'anchor5'
  },
  'scene5-0': {//5-0
    'os': 'anchor5-0'
  },
  'scene5-1': {//5-1
    'cloud_native_storage': 'anchor5-1'
  },
  'scene5-2': {//5-2
    'container_runtime': 'anchor5-2'
  },
  'scene5-3': {//5-3
    'cloud_native_network': 'anchor5-3'
  },
  'scene4': {//4
    'orchestration_and_management': 'anchor4'
  },
  'scene4-0': {//4-0
    'scheduling_and_orchestration': 'anchor4-0'
  },
  'scene4-1': {//4-1
    'coordination_and_services_discovery': 'anchor4-1'
  },
  'scene4-2': {//4-2
    'service_management': 'anchor4-2'
  },
  'scene1a': {//1a
    'data': 'anchor1a'
  },
  'scene1a-0': {//1a-0
    'database': 'anchor1a-0'
  },
  'scene1a-1': {//1a-1
    'data_warehouse': 'anchor1a-1'
  },
  'scene1a-2': {//1a-2
    'messaging_streaming': 'anchor1a-2'
  },
  'scene1b': {//1b
    'application_definition_and_development': 'anchor1b'
  },
  'scene1b-0': {//1b-0
    'language_and_frameworks': 'anchor1b-0'
  },
  'scene1': {//1b-1
    'scm': 'anchor1b-1'
  },
  'scene1b-2': {//1b-2
    'registry_services': 'anchor1b-2'
  },
  'scene1b-3': {//1b-3
    'application_definition': 'anchor1b-3'
  },
  'scene1b-4': {//1b-4
    'ci_cd': 'anchor1b-4'
  },
  'scene1c': {//1c
    'apis': 'anchor1c'
  },
  'scene1c-0': {//1c-0
    'services_as_code': 'anchor1c-0'
  },
  'scene1c-1': {//1c-1
    'api_management': 'anchor1c-1'
  },
  'scene3': {//3
    'platforms': 'anchor3'
  },
  'scene3-0': {//3-0
    'paas': 'anchor3-0'
  },
  'scene3-1': {//3-1
    'event_based_compute': 'anchor3-1'
  },
  'scene2': {//2
    'observability_and_analysis': 'anchor2'
  },
  'scene2-0': {//2-0
    'monitoring': 'anchor2-0'
  },
  'scene2-1': {//2-1
    'logging': 'anchor2-1'
  },
  'scene2-2': {//2-2
    'tracing': 'anchor2-2'
  },
  'scene2-3': {//2-3
    'specialized_tools': 'anchor2-3'
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
        .addTo(controller)
        //.addIndicators()
        .on("update", function (e) {
          $("#scrollDirection").text(e.target.controller().info("scrollDirection"));
        })
        // .on("enter", function (e) {
        //   console.log('enter:');
        //   console.log(this.triggerElement().id);
        // })
        // .on("leave", function (e) {
        //   console.log('leave:');
        //   var leaving= this.triggerElement().id ;
        //   console.log(leaving);
        //   keyControl(leaving , 'data');
        // })
        // .on("enter leave", function (e) {
        //   $("#state").text(e.type == "enter" ? "inside" : "outside");
        //
        // })
        .on("start end", function (e) {
          $("#lastHit").text(e.type == "start" ? "top" : "bottom");

        })
        .on("progress", function (e) {
          $("#progress").text(e.progress.toFixed(3));

        });

  }
}



// Change behaviour of controller
// to animate scroll instead of jump
// controller.scrollTo(function(target) {
//
//   TweenMax.to(window, 1, {
//     scrollTo : {
//       y : target,
//       autoKill : true // Allow scroll position to change outside itself
//     },
//     ease : Cubic.easeInOut
//   });
//
// });


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

        $(".category-title-"+category.key).text(category.name);

        //PUSHING CATEGORY NAME
        var element = $('<h2>')
            .addClass('categ-big categ-color'+category.key)
            .text(category.name);
        $(boxClass).append(element);

        //PUSHING CATEGORY BRIEF
        var element = $('<p>')
            .addClass('categ-brief categ-color'+category.key)
            .text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate');
        $(boxClass).append(element);

        //CREATING CATEGORY CONTAINER AND PUSHING IT TO MAIN CONTAINER
        var companiesClass= "companies-"+category.key ;
        var companies = $('<div>')
            .addClass(companiesClass + " companies");
        $(boxClass).append(companies);

        //++++++++++++++++++++++++++++++++++++++++++++++++
        //THE SUBCATEGORIES IN THE CATEGORY COVER
        for(var c in category.children){
          var subCategory = category.children[c];

          //DEFINING SUB-CATEGORY CONTAINER
          var subCategKey= category.key+"-"+c ;
          var boxItemsClass= "box-items"+category.key+"-"+c ;

          //create container for the SUB-CATEGORY
          var boxitems = $('<div>')
              .addClass(boxItemsClass)
              .addClass('box-itemsDISABLED');
          $("."+companiesClass).append(boxitems);

          //PUSHING CATEGORY NAME
          var element = $('<h5>')
              .addClass("title-items"+subCategKey+' subcateg');
          $("."+companiesClass).append(element);

          //PUSHING SUBCATEGORY NAME
          $(".title-items"+subCategKey).text(subCategory.name);


          //subcategory template
          var subCategoryModule= "<div class='RealShit stillbox'>"+
                "<h1 class='category-title-"+category.key+" categ'></h1>"+
                "<div class='box-2'>"+
                  "<h1 class='title-items"+subCategKey+"' ></h1>"+
                  "<div class='category-detail"+subCategKey+" box-items'>"+
                  "</div>"+
                "</div>"+
              "</div>";

          //THIS CREATES THE HIDDEN MODAL FOR EACH COMPANY
          var element =$('<div>')
              .addClass("real module element-anchor"+subCategKey)
              .html(subCategoryModule);
          $("#subCategContainer").append(element);



          //++++++++++++++++++++++++++++++++++++++++++++++++
          //THE SUBCATEGORIES DETAIL

          var categoryDetail= "category-detail"+category.key+"-"+c ;

          //PUSHING SUBCATEGORY COMPANIES
          for(var m in subCategory.items){

            var company = subCategory.items[m];
            var companyModal= "modal-"+category.key+'-'+c+'-'+m;
            var companyItem= "item-"+category.key+'-'+c+'-'+m;
            var companyTooltip= "tooltip-"+category.key+'-'+c+'-'+m;

            //COMPANY CONTAINER
            var item=$('<div>')
                .attr("id",companyModal)
                .addClass('item')
                .addClass(companyItem+" c-tooltip")
                .attr("style","display:inline-block");
            $("."+categoryDetail).append(item);

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
                "<div class='ui icon header'>"+ category.name +" / <span>"+ subCategory.name +"</span>"+
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

            initIndividualModal(companyModal);


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



function keyControl(prev,next){
  console.log('keyControll was called with prev as:'+prev );
  $("body").keydown(function(e) {
    if(e.keyCode == 37) { // left
      console.log('left');
      window.location.hash = "#"+prev;
    }
    else if(e.keyCode == 39) { // right

      console.log('right');
      window.location.hash = "#"+next;
    }
  });
}



//This function to be called everytime the trigger walks into the scene
//This will keep the parameters updated
//It remain silent waiting for a keyboard action
//In case keys are pressed it will take you to the section
//otherwise won't do anything.


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






