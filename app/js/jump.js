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
  'scene1': {//7
    'infrastructure': 'anchor1'
  },
  'scene1-1': {//7-0
    'infrastructure_details': 'anchor1-1'
  },
  'scene2': {//6
    'provisioning': 'anchor2'
  },
  'scene2-1': {//6-0
    'infrastructure_automation': 'anchor2-1'
  },
  'scene2-2': {//6-1
    'host_management': 'anchor2-2'
  },
  'scene2-3': {//6-2
    'secure_images': 'anchor2-3'
  },
  'scene3': {//5
    'runtime': 'anchor3'
  },
  'scene3-1': {//5-0
    'os': 'anchor3-1'
  },
  'scene3-2': {//5-1
    'cloud_native_storage': 'anchor3-2'
  },
  'scene3-3': {//5-2
    'container_runtime': 'anchor3-3'
  },
  'scene3-4': {//5-3
    'cloud_native_network': 'anchor3-4'
  },
  'scene4': {//4
    'orchestration_and_management': 'anchor4'
  },
  'scene4-1': {//4-0
    'scheduling_and_orchestration': 'anchor4-1'
  },
  'scene4-2': {//4-1
    'coordination_and_services_discovery': 'anchor4-2'
  },
  'scene4-3': {//4-2
    'service_management': 'anchor4-3'
  },
  'scene5': {//1a
    'data': 'anchor5'
  },
  'scene5-1': {//1a-0
    'database': 'anchor5-1'
  },
  'scene5-2': {//1a-1
    'data_warehouse': 'anchor5-2'
  },
  'scene5-3': {//1a-2
    'messaging_streaming': 'anchor5-3'
  },
  'scene6': {//1b
    'application_definition_and_development': 'anchor6'
  },
  'scene6-1': {//1b-0
    'language_and_frameworks': 'anchor6-1'
  },
  'scene6-2': {//1b-1
    'scm': 'anchor6-2'
  },
  'scene6-3': {//1b-2
    'registry_services': 'anchor6-3'
  },
  'scene6-4': {//1b-3
    'application_definition': 'anchor6-4'
  },
  'scene6-5': {//1b-4
    'ci_cd': 'anchor6-5'
  },
  'scene7': {//1c
    'apis': 'anchor7'
  },
  'scene7-1': {//1c-0
    'services_as_code': 'anchor7-1'
  },
  'scene7-2': {//1c-1
    'api_management': 'anchor7-2'
  },
  'scene8': {//3
    'platforms': 'anchor8'
  },
  'scene8-1': {//3-0
    'paas': 'anchor8-1'
  },
  'scene8-2': {//3-1
    'event_based_compute': 'anchor8-2'
  },
  'scene9': {//2
    'observability_and_analysis': 'anchor9'
  },
  'scene9-1': {//2-0
    'monitoring': 'anchor9-1'
  },
  'scene9-2': {//2-1
    'logging': 'anchor9-2'
  },
  'scene9-3': {//2-2
    'tracing': 'anchor9-3'
  },
  'scene9-4': {//2-4
    'specialized_tools': 'anchor9-4'
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
          $("."+titleItemsClass).text(subCategory.name+"("+category.key+"-"+c+")");


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

  $("#uno").click(function(){
    $(".ui.basic.modal.uno").modal('setting',{
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






