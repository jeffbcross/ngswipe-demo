# Angular Reader

[Live Demo](http://jeffbcross.github.io/ngswipe-demo/app/)

[Video Demo of Animation](https://plus.google.com/115279700532270609876/posts/L9q6HFFdrgj)

Angular reader is a simple Atom feed reader app that shows off some new features in [AngularJS](http://www.angularjs.org), and generally shows off the simplicity of building apps with Angular.

The app is a proof-of-concept, and a little rough around the edges. It should work with most Atom feeds, but may break if it has trouble parsing.

## Getting Started
...

## Features

 * Animation (new!)
  * Add Feed
  * Read a full article
  * Swipe to next/prev article
  * Edit feeds
 * Swipe (new!)
  * Swipe to delete
  * Swipe to go to next/prev article
 * Filter
  * Plaintext
  * Truncate
 * Directive
  * Carousel (contributed from [@revolunet](https://github.com/revolunet/angular-carousel))
  * Feed List
  * Add Feed Form (with datalist HTML5 component)
  * Article Preview
 * Service
  * Feed Manager w/localStorage
  * Articles w/Atom parsing
  * Recommended Feeds

## Animation Examples
As of Angular 1.1.4, Angular provides a simple directive to declaratively manage JavaScript and CSS3 animations of other directives 

### Add Feed Form
The left column of the main view of the application provides an area to add a new feed to the reader. In this simple directive, we're using:

 * An HTML5 datalist with an ng-repeat directive to recommend feeds while typing.
 * Animating the "add feed" link and the form itself while showing/hiding, using ng-animate and ng-show.
 * Declarative form validation, using ng-pattern and ng-required.

See the code: [template](https://github.com/jeffbcross/ngswipe-demo/blob/master/app/views/io-add-feed-form.html)


