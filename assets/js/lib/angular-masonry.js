/*!
 * angular-masonry <%= pkg.version %>
 * Pascal Hartig, weluse GmbH, http://weluse.de/
 * License: MIT
 */
(function () {
  'use strict';

  angular.module('wu.masonry', [])
    .controller('MasonryCtrl', function controller($scope, $element, $timeout) {
      var bricks = {};
      var schedule = [];
      var destroyed = false;
      var self = this;
      var timeout = null;

      this.preserveOrder = false;

      this.scheduleMasonryOnce = function scheduleMasonryOnce() {
        var args = arguments;
        var found = schedule.filter(function filterFn(item) {
          return item[0] === args[0];
        }).length > 0;

        if (!found) {
          this.scheduleMasonry.apply(null, arguments);
        }
      };

      // Make sure it's only executed once within a reasonable time-frame in
      // case multiple elements are removed or added at once.
      this.scheduleMasonry = function scheduleMasonry() {
        if (timeout) {
          $timeout.cancel(timeout);
        }

        schedule.push([].slice.call(arguments));

        timeout = $timeout(function runMasonry() {
          if (destroyed) {
            return;
          }
          schedule.forEach(function scheduleForEach(args) {
            $element.masonry.apply($element, args);
          });
          schedule = [];
        }, 15); // This was 30
      };

      function defaultLoaded($element) {
        $element.addClass('loaded');
      }

      this.appendBrick = function appendBrick(element, id, prepend) {
        if (destroyed) {
          return;
        }

        function _append() {
          if (Object.keys(bricks).length === 0) {
            $element.masonry('resize');
          }
          if (bricks[id] === undefined) {
            // Keep track of added elements.
            bricks[id] = true;
            defaultLoaded(element);

            if (prepend) {
              $element.masonry('prepended', element);
            } else {
              $element.masonry('appended', element, true);
            }
          }
        }

        function _layout() {
          // I wanted to make this dynamic but ran into huuuge memory leaks
          // that I couldn't fix. If you know how to dynamically add a
          // callback so one could say <masonry loaded="callback($element)">
          // please submit a pull request!
          self.scheduleMasonryOnce('layout');
        }

        if (self.preserveOrder) {
          _append();
          element.imagesLoaded(_layout);
        } else {
          element.imagesLoaded(function imagesLoaded() {
            _append();
            _layout();
          });
        }
      };

      this.removeBrick = function removeBrick(id, element) {
        if (destroyed) {
          return;
        }

        delete bricks[id];
        $element.masonry('remove', element);
        this.scheduleMasonryOnce('layout');
      };

      this.destroy = function destroy() {
        destroyed = true;

        if ($element.data('masonry')) {
          // Gently uninitialize if still present
          $element.masonry('destroy');
        }
        $scope.$emit('masonry.destroyed');

        bricks = [];
      };

      this.reload = function reload() {
        $element.masonry();
        $scope.$emit('masonry.reloaded');
      };


    }).directive('masonry', function masonryDirective() {
      return {
        restrict: 'AE',
        controller: 'MasonryCtrl',
        link: {
          pre: function preLink(scope, element, attrs, ctrl) {
            var attrOptions = scope.$eval(attrs.masonry || attrs.masonryOptions);
            var options = angular.extend({
              itemSelector: attrs.itemSelector || '.masonry-brick',
              columnWidth: parseInt(attrs.columnWidth, 10)
            }, attrOptions || {});
            element.masonry(options);
            var preserveOrder = scope.$eval(attrs.preserveOrder);
            ctrl.preserveOrder = (preserveOrder !== false && attrs.preserveOrder !== undefined);

            scope.$emit('masonry.created', element);
            scope.$on('$destroy', ctrl.destroy);
          }
        }
      };
    }).directive('masonryBrick', function masonryBrickDirective() {
      return {
        restrict: 'AC',
        require: '^masonry',
        scope: true,
        link: {
          pre: function preLink(scope, element, attrs, ctrl) {
            var id = scope.$id, index;

            if (scope.$first) {
              ctrl.appendBrick(element, id, true)
            } else {
              ctrl.appendBrick(element, id, false);
            }

            element.on('$destroy', function () {
              ctrl.removeBrick(id, element);
            });

            scope.$on('masonry.reload', function () {
              ctrl.reload();
            });

            // This should be uncommented if we need to insert elements between other elements
            // scope.$watch('$index', function () {
            //   if (index !== undefined && index !== scope.$index) {
            //     ctrl.scheduleMasonryOnce('reloadItems');
            //     ctrl.scheduleMasonryOnce('layout');
            //   }
            //   index = scope.$index;
            // });
          }
        }
      };
    });
}());