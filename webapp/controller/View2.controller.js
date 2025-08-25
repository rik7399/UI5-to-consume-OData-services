sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"

], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sap.btp.sapui5.controller.View2", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();

            // Attach an event handler to the "patternMatched" event for the "View2" route.
            oRouter.getRoute("View2").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            // Get the parameter passed from the previous view.
            var oArgs = oEvent.getParameter("arguments");
            
            var sOrderId = window.decodeURIComponent(oArgs.OrderID);
            console.log("HELLO1");
             var oViewModel = new JSONModel({
                OrderID: sOrderId
            });
            console.log("HELLO");
            this.getView().setModel(oViewModel, "viewForView2");
            
        }
        //,
        // function() {


        //     var oRouter = this.getOwnerComponent().getRouter();
        //     var oRoute = oRouter.getRoute("View2");

        //     var oViewModel = new JSONModel({
        //         OrderID: sOrderId
        //     });
        //     this.getView().setModel(oViewModel, "viewForView2");
        // }
    });
});