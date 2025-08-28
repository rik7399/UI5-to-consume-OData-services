sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"

], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sap.btp.sapui5.controller.View2", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();

            // Attach an event handler to the "patternMatched" event for the "View2" route.
            var sPath = oRouter.getRoute("View2").attachPatternMatched(this._onObjectMatched, this);

        },
        _onObjectMatched: function (oEvent) {
            // Get the parameter passed from the previous view.
            var oArgs = oEvent.getParameter("arguments");

            var sOrderId = window.decodeURIComponent(oArgs.OrderID);
            var oViewModel = new JSONModel({
                OrderNumber: sOrderId
            });
            console.log(oViewModel);
            this.getView().setModel(oViewModel, "viewForView2");

            // Get the main OData model
            var oModel = this.getView().getModel();
            oModel.read("/Order_Details", {
                filters: [
                    new sap.ui.model.Filter("OrderID", sap.ui.model.FilterOperator.EQ, sOrderId)
                ],
                urlParameters: {
                    "$expand": "Order", // Expand the Order navigation property which will be handled as a deep structure in XML
                    "$top": 1 // Get only the top 10 results
                },
                success: function (oData, oResponse) {
                    // Handle the retrieved data

                    // Create new model for the new data returned
                    var aResults = oData.results;
                    var oTable = new JSONModel({
                        Prod: aResults
                    });
                    this.getView().setModel(oTable, "returnedOrder"); //for Order Details                   
                }.bind(this),
                error: function (oError) {
                    // Handle the error
                    console.error("Error reading products:", oError);
                }
            });
        }
    });
});