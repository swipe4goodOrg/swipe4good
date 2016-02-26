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
            initCartoDB();
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

        init();
    }]);