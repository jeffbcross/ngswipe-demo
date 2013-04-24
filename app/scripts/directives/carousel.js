'use strict';

angular.module('ngswipeDemoApp')
  .directive('ngCarousel', ['$swipe', function($swipe) {
    return {
      restrict: 'AC',
      transclude: true,
      template: '<div style="position: relative; overflow: hidden; height: 100%">' +
          '<div style="position: relative; top: 0; height: 100%; width: 100%; -webkit-transition-duration: 0; -webkit-transform: translateZ(0); -webkit-transition-timing-function: ease-out">' +
            '<div style="-webkit-transform: translateZ(0); position: absolute; top: 0; height:100%; width: 100%;" ng-transclude>' +
        '</div></div></div>',
      compile: function(_element, _attr, linker) {
        return function(scope, element, attr) {
          // Parse the values out of the attr value.
          var expression = attr.ngCarousel;
          var match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*$/);
          var valueIdentifier, listIdentifier;

          if (!match) {
            throw new Error('Expected ngCarousel in form of "_item_ in _array_" but got "' +
              expression + '".');
          }

          valueIdentifier = match[1];
          listIdentifier = match[2];

          var wrapper = element.children();
          var slider = wrapper.children();

          // Empty out the slider.
          var templateFrame = slider.children();
          slider.children().remove();
          slider.append('<!-- ngCarousel -->');

          // Holds the three "frames" that are reused.
          var frames = [];
          for(var i = 0; i < 3; i++) {
            var frame = {};
            frame.scope = scope.$new();
            frames.push(frame);

            linker(frame.scope, function(clone) {
              var frameClone = templateFrame.clone();
              frameClone.children().replaceWith(clone);
              slider.append(frameClone);
              frame.element = frameClone;
            });
          }

          // Now the frames are ready. We need to position them and prepare the first few frames.
          // The content loading is handled by Angular, when we change the valueIdentifier value on the scope of a frame.
          var page = 0; // The notional page in the infinite scrolling.
          var pageIndex = 0; // The index of that page in the array.
          var focusedFrame = 1;

          // Makes sure the `left` values of all three frames are set correctly.
          // focusedFrame is in the center, displaying pageIndex.
          function repositionFrames() {
            if (focusedFrame === 0) {
              frames[2].element.css('left', page * 100 - 100 + '%');
              frames[0].element.css('left', page * 100 + '%');
              frames[1].element.css('left', page * 100 + 100 + '%');

              frames[2].pageId = page === 0 ? scope[listIdentifier].length - 1 : page - 1;
              frames[0].pageId = page;
              frames[1].pageId = page === scope[listIdentifier].length - 1 ? 0 : page + 1;
            } else if (focusedFrame === 1) {
              frames[0].element.css('left', page * 100 - 100 + '%');
              frames[1].element.css('left', page * 100 + '%');
              frames[2].element.css('left', page * 100 + 100 + '%');

              frames[0].pageId = page === 0 ? scope[listIdentifier].length - 1 : page - 1;
              frames[1].pageId = page;
              frames[2].pageId = page === scope[listIdentifier].length - 1 ? 0 : page + 1;
            } else {
              frames[1].element.css('left', page * 100 - 100 + '%');
              frames[2].element.css('left', page * 100 + '%');
              frames[0].element.css('left', page * 100 + 100 + '%');

              frames[1].pageId = page === 0 ? scope[listIdentifier].length - 1 : page - 1;
              frames[2].pageId = page;
              frames[0].pageId = page === scope[listIdentifier].length - 1 ? 0 : page + 1;
            }

            for (var i = 0; i < 3; i++) {
              frames[i].scope[valueIdentifier] = scope[listIdentifier][frames[i].pageId];
            }
          }

          repositionFrames();

          var startX, pointX;
          var sliderX = 0;
          var viewportWidth, snapThreshold, thresholdExceeded;

          var moved = false;
          var direction, directionLocked;

          function resize() {
            viewportWidth = wrapper[0].clientWidth;
            snapThreshold = Math.round(viewportWidth * 0.15);
            console.log('resized: ' + viewportWidth + ', ' + snapThreshold);
          }
          resize();

          var resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';
          window.addEventListener(resizeEvent, function() {
            resize();
            slider.css('-webkit-transition-duration', '0s');
            moveSlider(-page * viewportWidth);
          });

          function moveSlider(x) {
            sliderX = x;
            slider.css('-webkit-transform', 'translate(' + x + 'px, 0)');
          }

          function maybeFlipPage() {
            var pageFlip, pageFlipIndex;

            if (direction > 0) {
              page = -Math.ceil(sliderX / viewportWidth);
              focusedFrame = (page + 1) - Math.floor((page + 1) / 3) * 3;
              pageIndex = pageIndex === 0 ? scope[listIdentifier].length - 1 : pageIndex - 1;

              pageFlip = focusedFrame - 1;
              pageFlip = pageFlip < 0 ? 2 : pageFlip;
              frames[pageFlip].element.css('left', page * 100 - 100 + '%');
              pageFlipIndex = page - 1;
            } else {
              page = -Math.floor(sliderX / viewportWidth);
              focusedFrame = (page + 1) - Math.floor((page + 1) / 3) * 3;
              pageIndex = pageIndex === scope[listIdentifier].length - 1 ? 0 : pageIndex + 1;

              pageFlip = focusedFrame + 1;
              pageFlip = pageFlip > 2 ? 0 : pageFlip;
              frames[pageFlip].element.css('left', page * 100 + 100 + '%');

              pageFlipIndex = page + 1;
            }

            pageFlipIndex = pageFlipIndex - Math.floor(pageFlipIndex / scope[listIdentifier].length) * scope[listIdentifier].length;
            frames[pageFlip].pageId = pageFlipIndex;

            var newX = -page * viewportWidth;
            slider.css('-webkit-transition-duration', Math.floor(500 * Math.abs(sliderX - newX) / viewportWidth) + 'ms');

            if (sliderX === newX) {
              flip(); // If we swiped /exactly/ to the next page.
            } else {
              moveSlider(newX);
            }
          }

          function flip() {
            for(var i = 0; i < 3; i++) {
              frames[i].scope[valueIdentifier] = scope[listIdentifier][frames[i].pageId];
            }

            scope.$digest();
          }

          slider.bind('webkitTransitionEnd transitionEnd', function() {
            flip();
          });

          function onDone(coords) {
            var x = coords && coords.x || pointX;
            var dist = Math.abs(x - startX);

            if (!moved) {
              return;
            }

            if (dist < snapThreshold) {
              slider.css('-webkit-transition-duration', Math.floor(300 * dist / snapThreshold) + 'ms');
              moveSlider(-page * viewportWidth);
            } else {
              maybeFlipPage();
            }
          }

          $swipe.bind(slider, {
            'start': function(coords) {
              moved = false;
              thresholdExceeded = false;
              startX = coords.x;
              pointX = coords.x;
              direction = 0;
              directionLocked = false;
              slider.css('-webkit-transition-duration', '0s');
            },

            'move': function(coords) {
              var deltaX = coords.x - pointX;
              var newX = sliderX + deltaX;
              var dist = Math.abs(coords.x - startX);

              moved = true;
              pointX = coords.x;
              direction = deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0;


              if (!this.thresholdExceeded && dist >= snapThreshold) {
                thresholdExceeded = true;
              } else if(thresholdExceeded && dist < snapThreshold) {
                thresholdExceeded = false;
              }

              moveSlider(newX);

            },
            'end': onDone,
            'cancel': onDone
          });

        };
      }
    };
  }]);
