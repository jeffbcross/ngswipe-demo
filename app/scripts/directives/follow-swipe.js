'use strict';

angular.module('ngswipeDemoApp')
  .directive('followSwipe', ['$swipe', '$document', function ($swipe, $document) {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var swipeEvent, snapThreshold = Math.round($document[0].width * 0.40), sliderX = 0, startPos = 0;
        console.log('snapThreshold', snapThreshold);
        function maybeFlipPage () {
          console.log('maybe flip page');
        }

        function onDoneSwiping(coords) {
          var x = coords && coords.x || swipeEvent.pointX;
          var dist = Math.abs(x - swipeEvent.startX);

          if (!swipeEvent.moved) {
            return;
          }

          if (dist < snapThreshold) {
            element.css('-webkit-transition-duration', Math.floor(300 * dist / snapThreshold) + 'ms');
            moveSlider(startPos);
          } else {
            maybeFlipPage();
          }
        }

        function moveSlider(x) {
          sliderX = x;
          element.css('-webkit-transform', 'translate(' + x + 'px, 0)');
        }

        $swipe.bind(element, {
          "start": function(coords) {
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
