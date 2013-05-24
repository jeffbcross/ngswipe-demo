'use strict';

angular.module('ngswipeDemoApp')
  .filter('preview', ['$filter', function ( $filter) {
    return function (input) {
      var output, splitOutput, pMatch, match, brSplit, charTest,
        striptags = $filter('striptags');

      if (input.indexOf('<p') > -1) {
        //Grab the first paragraph of text. Presumes this comes early in the document.
        pMatch = /<p\b[^>]*>(.*?)<\/p>/;
        match = pMatch.exec(input);
        
        if (match && match.length > 1) {
          output = match[1];
        }
        else {
          return;
        }
        

        //Limit it to 200 words
        splitOutput = output.split(' ');
        if (splitOutput.length > 200) {
          output = splitOutput.splice(0, 199).join(' ');
          output += '...';
        }
      }
      else if (input.search(/<br[ \/]*>/) > -1) {
        charTest = /[A-Za-z0-9]/;
        //At least we have some line breaks to look for blocks of text.
        //Let's break up the article by <br> until we find content that begins with text
        brSplit = input.split(/<br[ \/]*>/);
        
        for (var i = 0; i < brSplit.length; i++) {
          if(brSplit[i] && charTest.test(brSplit[i][0])) {
            //The first character is Legit
            output = brSplit[i];
            
            break;
          }
        }
      }
      
      if (output) {
        output = striptags(output);
      }

      return output;
    };
  }]);
