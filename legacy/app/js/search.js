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

// search.addWidget(
//     instantsearch.widgets.pagination({
//         container: '#pagination',
//         cssClasses: {
//             root: 'pagination',
//             active: 'active'
//         }
//     })
// );



// search.addWidget(
//     instantsearch.widgets.menu({
//         container: '#cats',
//         attributeName: 'category',
//         limit: 30,
//         templates: {
//             header: 'Category'
//         },
//         cssClasses: {
//             list: 'btn btn-primary',
//             count: 'badge pull-right',
//             active: 'active'
//         }
//     })
// );

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
        attributeName: 'oss',
        operator: 'and',
        limit: 30,
        cssClasses: {
            list: 'nav nav-list',
            count: 'badge pull-right',
            active: 'active'
        }
    })
);


search.addWidget(
    instantsearch.widgets.menu({
        container: '#categorymenu',
        attributeName: 'category',
        cssClasses: {
            list: 'nav nav-list',
            count: 'badge pull-right',
            active: 'active'
        }
    })
);

search.addWidget(
    instantsearch.widgets.hierarchicalMenu({
        container: '#categories',
        attributes: ['category', 'subcategory'],
        sortBy: ['name:asc'],
        cssClasses: {
            list: 'nav nav-list',
            count: 'badge pull-right',
            active: 'active'
        }
    })
);

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

    var namethis = getAllUrlParams().namethis;
    console.log(namethis);
    $('#sectionTitle').text(namethis);


});

$(document).ready(function(){

    //TODO: Replace this for event trigger
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
        var city1 = params['hFR[category][0]'];
        var city2 = params['hFR[category][1]'];
        var city3 = params['hFR[category][2]'];
        var city4 = params['hFR[category][3]'];

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
            $("#filter1").html(cities);
        });

    }
    //DOMAIN
    var domain1 = params['fR[subcategory][0]'];
    var domain2 = params['fR[subcategory][1]'];
    var domain3 = params['fR[subcategory][2]'];
    var domain4 = params['fR[subcategory][3]'];

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
        $("#filter2").fadeIn().html(domains);
    });


}

//Loading URL without reloading page
function processAjaxData(response, urlPath){
    document.getElementById("sectionTitle").innerHTML = response.html;
    document.title = response.pageTitle;
    window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}




function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i=0; i<arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
            // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
}

function processURL(urlPath){
    window.history.pushState("","", urlPath);
}


//FILTERS WINDOW OPEN - CLOSE
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("sidenavTrigger").style.opacity = "0";
    document.getElementById("sidenavTrigger").style.color = "black";
    //document.getElementById("sidenavTrigger").style.opacity = "0";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("sidenavTrigger").style.opacity = "1";
    document.getElementById("sidenavTrigger").style.color = "white";
    //document.getElementById("sidenavTrigger").style.opacity = "1";
}

