(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';     // CHOOSE ONLY ONE...
    var SERVER_URL = 'https://co.audstanley.com/coffeeorders';    // if running on the shared server
    // var SERVER_URL = 'http://localhost:3000/coffeeorders';          // if running locally

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FireDataStore = App.FireDataStore;
    var firestore = new FireDataStore();
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    // var truck = new Truck('ncc-1701', new DataStore());
    var truck = new Truck('ncc-1701', firestore);

    window.truck = truck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function(data) {
        return truck.createOrder.call(truck, data)
            .then(() => {
                checkList.addRow.call(checkList, data);
            }); 
    });
    console.log(formHandler);

    formHandler.addInputHandler(Validation.isCompanyEmail);
    truck.printOrders(checkList.addRow.bind(checkList));

})(window);