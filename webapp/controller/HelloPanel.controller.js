sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/core/Fragment"],
  function (Controller, MessageToast, Fragment) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
      onShowHello: function () {
        // read msg from i18n model
        var oBundle = this.getView().getModel("i18n").getResourceBundle();
        var sRecipient = this.getView().getModel().getProperty("/recipient/name");
        var sMsg = oBundle.getText("helloMsg", [sRecipient]);
        // Show message
        MessageToast.show(sMsg);
      },
      onOpenDialog: function () {
        var oView = this.getView();

        // create dialog lazily
        if (!this.byId("helloDialog")) {
          // load asynchronous XML fragment 异步加载片段，然后作为依赖添加到视图，以共享视图的数据和生命周期
          Fragment.load({
            id: oView.getId(),
            name: "sap.ui.demo.walkthrough.view.HelloDialog",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.open();
          });
        } else {
          this.byId("helloDialog").open();
        }
      },

      onCloseDialog: function () {
        this.byId("helloDialog").close();
      },
    });
  }
);
