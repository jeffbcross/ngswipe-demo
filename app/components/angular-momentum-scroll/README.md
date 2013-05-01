# angular-momentum-scroll

AngularJS directive that adds momentum scroll via iScroll (http://cubiq.org/iscroll-4).

## Usage

* Include `scrollable.js` or `scrollable.min.js` into your page
* Declare `'angular-momentum-scroll'` as a dependency for your angular app: `angular.module('myApp', ['angular-momentum-scroll']);`
* Add the `scrollable` attribute to a container of your choice:
    * the container MUST have set width and height !!
    * in order to scroll horizontally the .scroller class inside of your container MUST have set width and height !!
* The container takes an additional attribute `parameters` according to iScroll docs. e.g. <div id="my-cont" style="height: 400px; width: 100%;" scrollable parameters="{{ {hScrollbar : true, snap: '.row'} }}">
