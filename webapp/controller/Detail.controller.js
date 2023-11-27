sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  function (Controller, History) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
      onInit: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
      },
      onObjectMatched: function (oEvent) {
        this.getView().bindElement({
          path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
          model: "invoice",
        });
      },
      onNavBack: function () {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("overview", {}, true);
        }
      },
    });
  }
);
