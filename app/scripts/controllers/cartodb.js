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
                    layer.setSQL(query);
                    layer.setCartoCSS("#table_name [swipe=false]{marker-fill: #D6301D;} #table_name [swipe=true]{marker-fill: #229A00;}  ")
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
                        //shareable: true,
                        //title: true,
                        //description: true,
                        //search: true,
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

        

        init();
    }]);