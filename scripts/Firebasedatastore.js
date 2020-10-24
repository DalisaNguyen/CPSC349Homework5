(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

class FireDataStore {
        constructor() {
            this.database = firebase.firestore();
            // this.get('me@bignerdranch.com')
            //     .then(
            //         function(data){
            //             for (let i in data){
            //                 console.log("Key:", i, "Values:", data[i]);
            //             }
            //         }
            //         // data => console.log(`data from get: ${data}`)
            //     ); 
        }

        async add(key, val) {
            // return this.database.collection('coffeeorders').add(val);
            let check = await this.get(key);
            console.log("check", check);
            if (Object.keys(check).length === 0){
                console.log("It's empty");
                return this.database.collection('coffeeorders').add(val);
            }
            else{
                console.log("It's not empty");
                this.remove(key);
                return this.database.collection('coffeeorders').add(val);
            }            
        }

        async get(key, cb)  {
            
            let orders_array = await this.database.collection('coffeeorders').where("emailAddress", "==", key)
            .get()
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
            let orders_dictionary = {};
            orders_array.forEach(function(doc){
                orders_dictionary[doc.id] = doc.data();
                // console.log(doc.id, " => ", doc.data());

            });
            return orders_dictionary;
        }

        async getAll(cb)    { 
            return this.database.collection('coffeeorders').get();
        }

        async remove(key)   { 
            let doc = await this.get(key);
            doc = Object.keys(doc).toString();
            console.log("DocID", doc);
            this.database.collection('coffeeorders').doc(doc).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
    
        }

 }

    App.FireDataStore = FireDataStore;
    window.App = App;

})(window);
