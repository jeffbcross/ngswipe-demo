'use strict';

angular.module('ngswipeDemoApp')
  .factory('localData', ['$q', '$window', function ($q, $window) {
    var db;
    // Public API here
    return {
      _openDatabase: function (name, version, description) {
        return $window.openDatabase(name || 'ioAppDb', version || "1.0", description || "Angular app database", 200000);
      },
      getItem: function (key) {
        var deferred = $q.defer();
         
        db = db || this._openDatabase();

        function selector (tx) {
          tx.executeSql('SELECT * FROM TableKeyVal WHERE key = ?', [key], function (tx, results) {
            var resolution = typeof results[0] !== 'undefined' ? results[0].value : '';
            deferred.resolve(resolution);
          });
        }

        db.transaction(selector);

        return deferred.promise;
      },
      setItem: function (key, val) {
        var deferred = $q.defer();

        return deferred.promise;
      }
    };
  }]);