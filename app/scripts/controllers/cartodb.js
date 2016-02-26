'use strict';

/**
 * @ngdoc function
 * @name swipe4goodApp.controller:CartodbCtrl
 * @description
 * # CartodbCtrl
 * Controller of the swipe4goodApp
 */
angular.module('swipe4goodApp')
    .controller('CartodbCtrl', ['$scope', 'leafletData', function($scope, leafletData) {

        function init() {
            //angular-leaflet helloworld: https://github.com/tombatossals/angular-leaflet-directive
            angular.extend($scope, {
                center: {
                    lat: 51.505,
                    lng: -0.09,
                    zoom: 8
                },
                layers: {
                    baselayers: {
                        mapbox_light: {
                            name: 'Mapbox Light',
                            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                            type: 'xyz',
                            layerOptions: {
                                apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                                mapid: 'bufanuvols.lia22g09'
                            }
                        },
                        osm: {
                            name: 'OpenStreetMap',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            type: 'xyz'
                        }
                    }
                }
            });

            //initCartoDB();
        }

        function initCartoDB() {
            //from: http://cartodb.github.io/cartodb.js/examples/leaflet.html
            //cartodb.createLayer(map, 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json').addTo(map)
            leafletData.getMap().then(function(map) {
                cartodb.createLayer(map, 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json').addTo(map)
            });
            //http://tombatossals.github.io/angular-leaflet-directive/examples/0000-viewer.html#/basic/access-leaflet-object-example
        };

        init();
    }]);