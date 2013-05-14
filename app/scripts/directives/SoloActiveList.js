'use strict';

angular.module('ngswipeDemoApp')
    .directive('soloActiveList', function () {
      return {
        restrict: 'A',
        //transclude: true,
        //scope: { },
        controller: function($scope) {
          var listItems = $scope.soloListItems = [];

          this.select = function(listItem) {
            angular.forEach(listItems, function(listItem) {
              listItem.active = false;
            });
            listItem.active = true;
            $scope.soloListActiveItem = listItem;
          };

          this.addItem = function(listItem) {
            listItems.push(listItem);
            this.select(listItem);
          };
        }
      };
    })
    .directive('soloActiveItem', function() {
      return {
        require: '^soloActiveList',
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs, listCtrl) {
          listCtrl.addItem(scope);
          element.bind('click', function() {
            scope.$apply(function() { listCtrl.select(scope); });
          });
          scope.$watch('active', function(value) {
            if (value) element.addClass('selected');
            else element.removeClass('selected');
          });
        }
      }
    });
