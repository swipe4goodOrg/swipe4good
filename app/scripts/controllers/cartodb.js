'use strict';

/**
 * @ngdoc function
 * @name swipe4goodApp.controller:CartodbCtrl
 * @description
 * # CartodbCtrl
 * Controller of the swipe4goodApp
 */
angular.module('swipe4goodApp')
    .controller('CartodbCtrl', ['$scope', function($scope) {

        function init() {
            //initMap();
            //initCartoDB();
            initCartoDB2();
            //initCartoDBLeaflet();
        }

        function initCartoDB() {
            angular.element(document).ready(function() {
                cartodb.createVis('map', 'https://swipe4good.cartodb.com/api/v2/viz/5c21f48a-dc9e-11e5-befa-0e787de82d45/viz.json', {
                        shareable: true,
                        title: true,
                        description: true,
                        search: true,
                        tiles_loader: true,
                        //center_lat: 0,
                        //center_lon: 0,
                        mobile_layout: true,
                        zoom: 15
                    })
                    .done(function(vis, layers) {
                        // layer 0 is the base layer, layer 1 is cartodb layer
                        // setInteraction is disabled by default
                        layers[1].setInteraction(true);
                        layers[1].on('featureOver', function(e, latlng, pos, data) {
                            cartodb.log.log(e, latlng, pos, data);
                        });
                        // you can get the native map to work with it
                        var map = vis.getNativeMap();
                        // now, perform any operations you need
                        // map.setZoom(3);
                        // map.panTo([50.5, 30.5]);
                    })
                    .error(function(err) {
                        console.log(err);
                    });



            });

        }
        
        function createSelector(layer) {
                
                var sql = new cartodb.SQL({ user: 'documentation' });
                
                var $options = $('#layer_selector li');
                $options.click(function(e) {
                  
                  var $li = $(e.target);
                  var area = $li.attr('data');
                  
                  $options.removeClass('selected');
                  $li.addClass('selected');
                  
                  var query = "select * from pruebapuntosalicante";//Esta tabla deberá ser table_swipe4good en todas las select
                  if(area == 'all') {
                    query = "select * from pruebapuntosalicante ";// area > " + area;
                    //layer.setSQL(query);
                    //layer.setCartoCSS("#table_name [swipe=false]{marker-fill: #D6301D;} #table_name [swipe=true]{marker-fill: #229A00;}  ")
                  }
                  else if(area == 'true')
                  {
                        query = "select * from pruebapuntosalicante where swipe=true";// area > " + area;
                        layer.setSQL(query);
                        layer.setCartoCSS("#table_name {marker-fill: #229A00;}")
                  }
                  else{
                        query = "select * from pruebapuntosalicante where swipe=false";// area > " + area;
                        layer.setSQL(query);
                        layer.setCartoCSS("#table_name {marker-fill: #D6301D;}")
                  }

                  // change the query in the layer to update the map
                  //layer.setSQL(query);
                  //layer.setCartoCSS("new CartoCSS styles")
                });
        }
        
        function initCartoDB2(){

           cartodb.createVis('map', 'https://swipe4good.cartodb.com/api/v2/viz/cf5f6fc4-dcc9-11e5-a11c-0e3ff518bd15/viz.json', {
                        shareable: true,
                        title: true,
                        description: true,
                        search: true,
                        tiles_loader: true,
                        //center_lat: 0,
                        //center_lon: 0,
                        mobile_layout: true,
                        zoom: 15
                    })
                    .done(function(vis, layers) {
                        
                        var subLayer = layers[1].getSubLayer(0);
                        createSelector(subLayer);
                    })
                    .error(function(err) {
                        console.log(err);
                    });
        }

        function initCartoDBLeaflet(){

            var map = new L.Map('map', {
            center: [38.350610, -0.486324],
            zoom: 7
          });

            L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
                attribution: 'Stamen'
            }).addTo(map);

          cartodb.createLayer(map, 'https://swipe4good.cartodb.com/api/v2/viz/5c21f48a-dc9e-11e5-befa-0e787de82d45/viz.json')
            .addTo(map)
            .on('done', function(layer) {
              
                // create and add a new sublayer
                  layer.createSubLayer({
                    sql: "SELECT * FROM pruebapuntosalicante where swipe=true",
                    cartocss: '#table_name {marker-fill: #F0F0F0;}'
                  });
                  layer.getSubLayer(0).setSQL("SELECT * FROM table_name limit 10");
            })
            .on('error', function(err) {
              alert("some error occurred: " + err);
            });
        }

        init();
    }]);