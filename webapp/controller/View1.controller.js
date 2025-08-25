sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/odata/v2/ODataModel"
], function (Controller, ODataModel) {
  "use strict";

  return Controller.extend("sap.btp.sapui5.controller.View1", {
    // onInit: function () {
    //   var oModel = new ODataModel("https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/Northwind/Northwind.svc/Orders?$format=json");
    //   this.getView().setModel(oModel, "odm1");
    // }
    // ,

    onDisplayImage: function () {
      this.getOwnerComponent().getRouter().navTo("ImageDisplay");
    },

    onOrderLink: function (oEvent) {
      var oLink = oEvent.getSource();
      var sLinkText = oLink.getText();
      this.getOwnerComponent().getRouter().navTo("View2",
        {
          OrderID : sLinkText
        }
      );
    }
  }
  );
});
