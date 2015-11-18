'use strict';

/**
 * @ngdoc directive
 * @name cardkitApp.directive:sizeEditor
 * @description
 * # sizeEditor
 */
angular.module('cardkitApp')
  .directive('sizeEditor', function () {
    return {
      template: '<div>' +
            '<label>גודל התמונה</label>' +
            '<input type="range" min="10" max="1000" ng-model="element.width" />' +
          '</div>',
      restrict: 'E',
      replace: true,
  	  scope: {
  	    element: '=',
  	  },
    };
  });
