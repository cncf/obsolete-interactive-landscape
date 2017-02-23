/* global instantsearch */

var search = instantsearch({
    appId: 'L2FA7ZC6MO',
    apiKey: '3637c90fe243b0ab50187eb3243437c6',
    indexName: 'test_cloudNative',
    urlSync: {}
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#q'
    })
);

search.addWidget(
    instantsearch.widgets.stats({
        container: '#stats'
    })
);


var hitTemplate =
    '<div style="display:inline-block">'+
    '<div class="company" style="background-image: url(\'{{_highlightResult.logo.value}}\');"></div>' +
    '<div class="company-name">{{{_highlightResult.name.value}}}</div>'+
    '</div>';

var noResultsTemplate =
     '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';


search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits',
        hitsPerPage: 30,
        templates: {
            empty: noResultsTemplate,
            item: hitTemplate
        },
        transformData: function(hit) {
            hit.stars = [];
            for (var i = 1; i <= 5; ++i) {
                hit.stars.push(i <= hit.rating);
            }
            return hit;
        }
    })
);

search.addWidget(
    instantsearch.widgets.pagination({
        container: '#pagination',
        cssClasses: {
            root: 'pagination',
            active: 'active'
        }
    })
);



search.addWidget(
    instantsearch.widgets.menu({
        container: '#city',
        attributeName: 'city',
        limit: 30,
        templates: {
            header: 'City2',
            body: '<div>Check me out</div>'
        },
        cssClasses: {
            list: 'btn btn-primary',
            count: 'badge pull-right',
            active: 'active'
        }
    })
);

// search.addWidget(
//     instantsearch.widgets.refinementList({
//         container: '#city',
//         attributeName: 'city',
//         operator: 'and',
//         limit: 10,
//         cssClasses: {
//             list: 'nav nav-list',
//             count: 'badge pull-right',
//             active: 'active'
//         }
//     })
// );

search.addWidget(
    instantsearch.widgets.refinementList({
        container: '#openSource',
        attributeName: 'openSource',
        operator: 'and',
        limit: 30,
        cssClasses: {
            list: 'nav nav-list',
            count: 'badge pull-right',
            active: 'active'
        }
    })
);



// search.addWidget(
//     instantsearch.widgets.menu({
//         container: '#lang',
//         attributeName: 'lang',
//         limit: 10
//     })
// );


//
// search.addWidget(
//   instantsearch.widgets.starRating({
//     container: '#ratings',
//     attributeName: 'rating',
//     cssClasses: {
//       list: 'nav',
//       count: 'badge pull-right'
//     }
//   })
// );

search.start();



$(document).ready(function(){

    updateCurrent(); // This will run on page load
    setInterval(function(){

        updateCurrent() // this will run after every 5 seconds
    }, 1000);


    // updateCurrent(); // This will run on page load
    // $( ".updateme" ).on( "click", function() {
    //     updateCurrent();
    // });


});







function updateCurrent() {

    var get_params = function (search_string) {

        var parse = function (params, pairs) {
            var pair = pairs[0];
            var parts = pair.split('=');
            var key = decodeURIComponent(parts[0]);
            var value = decodeURIComponent(parts.slice(1).join('='));

            // Handle multiple parameters of the same name
            if (typeof params[key] === "undefined") {
                params[key] = value;
            } else {
                params[key] = [].concat(params[key], value);
            }

            return pairs.length == 1 ? params : parse(params, pairs.slice(1))
        }

        // Get rid of leading ?
        return search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
    }

    //HEADER UPDATE
    var params = get_params(location.search);

    var handle= params['fR[entity][0]'];
    if(handle){
        $("#currentCity").html(handle);
    }else{

        //CITY
        var city1 = params['fR[city][0]'];
        var city2 = params['fR[city][1]'];
        var city3 = params['fR[city][2]'];
        var city4 = params['fR[city][3]'];

        var cities;
        if (!city1) {
            cities = "Q&A";
        } else {
            cities = city1 +
                ( city2 ? " + " + city2 : "" ) +
                ( city3 ? " + " + city3 : "") +
                ( city4 ? " + " + city4 + "..." : "");
        }


        $(this).ready(function(){
            //console.log(cities);
            $("#currentCity").html(cities);
        });

    }
    //DOMAIN
    var domain1 = params['fR[domains][0]'];
    var domain2 = params['fR[domains][1]'];
    var domain3 = params['fR[domains][2]'];
    var domain4 = params['fR[domains][3]'];

    var domains;
    if (!domain1) {
        domains = "general";
    } else {
        domains = domain1 +
            ( domain2 ? " + " + domain2 : "" ) +
            ( domain3 ? " + " + domain3 : "" ) +
            ( domain4 ? " + " + domain4 + "..." : "");

    }
    $(this).ready(function(){
        //console.log(domains);
        $("#currentDomain").fadeIn().html(domains);
    });


}


//FILTERS WINDOW OPEN - CLOSE
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("sidenavTrigger").style.width = "0";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("sidenavTrigger").style.width = "50px";
}


//test to assign links to SVG

$(this).ready(function(){
    //console.log(domains);
    $("#floor1").onclick(function(){

    })
});
