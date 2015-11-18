'use strict';

/**
 * @ngdoc directive
 * @name cardkitApp.directive:filterEditor
 * @description
 * # filterEditor
 */
angular.module('cardkitApp')
  .directive('filterEditor', function () {
    return {
      template: '<div>' + 
            '<label>מסנני צבע</label>' + 
            '<select ng-model="element.defaultFilter" ng-options="filter for filter in filters" class="form-control">' + 
              '<option value="">ללא סינון</option>' + 
            '</select>' + 
          '</div>',
      replace: true,
      restrict: 'E',
  	  scope: {
  	    element: '=',
  	    filters: '='
  	  },
    };
  });
