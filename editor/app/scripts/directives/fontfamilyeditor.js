'use strict';

/**
 * @ngdoc directive
 * @name cardkitApp.directive:fontfamilyEditor
 * @description
 * # fontfamilyEditor
 */
angular.module('cardkitApp')
  .directive('fontfamilyEditor', function () {
    return {
      template: '<div>' +
            '<label>עיצוב הפונט</label>' +
            '<select ng-model="element.fontFamily" ng-options="name for (name, value) in field" class="form-control">' +
              '<option value="">-- בחירת עיצוב הפונט --</option>' +
            '</select>' +
          '</div>',
      restrict: 'E',
      replace: true,
  	  scope: {
  	    element: '=',
  	    field: '='
  	  },
    };
  });
