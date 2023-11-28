sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "sap/ui/Device"],
  function (UIComponent, JSONModel, Device) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
      metadata: {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        manifest: "json",
      },
      init: function () {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);
        // set data models
        var oData = {
          recipient: {
            name: "UI5",
          },
        };
        var oModel = new JSONModel(oData);
        this.setModel(oModel);

        // set device model
        const oDeviceModel = new JSONModel(Device);
        // 默认是数据双向绑定，因为是只读模式，所以设置成单向绑定
        oDeviceModel.setDefaultBindingMode("OneWay");
        this.setModel(oDeviceModel, "device");

        // Create the views based on the url/hash
        this.getRouter().initialize();
      },
      // Content Density
      getContentDensityClass: function () {
        return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
      },
    });
  }
);
