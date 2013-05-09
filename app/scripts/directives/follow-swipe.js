'use strict';

angular.module('ngswipeDemoApp')
  .directive('followSwipe', ['$swipe', '$document', '$location', 'Articles', function ($swipe, $document, $location, Articles) {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var swipeEvent, snapThreshold = Math.round($document[0].width * 0.15), sliderX = 0, startPos = 0;
        
        function flipPage () {
          $location.path('/articles/' + Articles.getSelected());
        }

        function onDoneSwiping(coords) {
          var x = coords && coords.x || swipeEvent.pointX;
          var dist = Math.abs(x - swipeEvent.startX);
          console.log('dist, snapThreshold, startPos', dist, snapThreshold, startPos);

          if (!swipeEvent.moved) {
            return;
          }

          if (dist < snapThreshold) {
            console.log('dist < snapThreshold', dist, snapThreshold, startPos);
            element.css('-webkit-transition-duration', Math.floor(300 * dist / snapThreshold) + 'ms');
            moveSlider(startPos);
          } else {
            flipPage();
          }
        }

        function moveSlider(x) {
          sliderX = x;
          element.css('-webkit-transform', 'translate(' + x + 'px, 0)');
        }

        $swipe.bind(element, {
          "start": function(coords) {
            console.log('start');
            swipeEvent = {
              moved: false,
              thresholdExceeded: false,
              startX: coords.x,
              pointX: coords.x,
              direction: 0
            };
            
            element.css('-webkit-transition-duration', '0s');
            element.css('position', 'relative')
          },

          "move": function(coords) {
            console.log('move');
            var deltaX = coords.x - swipeEvent.pointX;
            var newX = sliderX + deltaX;
            var dist = Math.abs(coords.x - swipeEvent.startX);

            swipeEvent.moved = true;
            swipeEvent.pointX = coords.x;
            swipeEvent.direction = deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0;


            if (!swipeEvent.thresholdExceeded && dist >= snapThreshold) {
              swipeEvent.thresholdExceeded = true;
            } else if(swipeEvent.thresholdExceeded && dist < snapThreshold) {
              swipeEvent.thresholdExceeded = false;
            }

            moveSlider(newX);

          },
          'end': onDoneSwiping,
          'cancel': onDoneSwiping
        });
      }
    };
  }]);
