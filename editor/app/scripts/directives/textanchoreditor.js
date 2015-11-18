'use strict';

/**
 * @ngdoc directive
 * @name cardkitApp.directive:textanchorEditor
 * @description
 * # textanchorEditor
 */
angular.module('cardkitApp')
  .directive('textanchorEditor', function () {
    return {
      template: '<div>' +
            '<label>מיקום המלל</label>' +
            '<select ng-model="element.textAnchor" class="form-control">' +
              '<option value="">-- בחירת מיקום המלל --</option>' +
              '<option value="start">התחלה</option>' +
              '<option value="middle">אמצע</option>' +
              '<option value="end">סוף</option>' +
            '</select>' +
          '</div>',
      restrict: 'E',
      replace: true,
  	  scope: {
  	    element: '='
  	  },
    };
  });
