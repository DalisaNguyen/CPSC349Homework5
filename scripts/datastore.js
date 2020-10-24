(function (window) {
    'use strict';

    var App = window.App || {};

    class DataStore {
        constructor() {
            // console.log('running the DataStore function');
            this.data = {};
        }
        async add(key, val) { this.data[key] = val;  return null; }

        async get(key) { return this.data[key];  }
        
        async getAll() { return this.data;  }
        
        async remove(key) { delete this.data[key];  return null; }
    }

    App.DataStore = DataStore;
    window.App = App;
    
})(window);