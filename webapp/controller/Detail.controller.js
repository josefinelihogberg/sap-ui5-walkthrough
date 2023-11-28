sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/ui/model/json/JSONModel"],
  function (Controller, History, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
      onInit: function () {
        const oViewModel = new JSONModel({
          currency: "EUR",
        });
        this.getView().setModel(oViewModel, "view");

        var oRouter = this.getOwnerComponent().getRouter();
        // 这行代码是注册回调函数，当detail的router命中后（不管是通过URL还是，点击一栏的明细行），调用回调函数onObjectMatched
        oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
      },

      // 当回调函数onObjectMatched 被触发后，可以通过oEvent得到传递过来的参数的值，此调用的返回值是一个object：{invoicePath: 'Invoices%2F4'}
      onObjectMatched: function (oEvent) {
        //bindElement函数，创建binding context
        this.getView().bindElement({
          // 把'Invoices%252F4'变成'Invoices/4'
          path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
          model: "invoice", // 给model起个名字，在view里可以用，以取得参数里的值
        });
      },
      onNavBack: function () {
        // 得到浏览历史对象
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          // 第二个参数：因为router overview没有参数，所以这里是空{}
          // 第三个参数ture：用当前的状态替换原来的。
          oRouter.navTo("overview", {}, true);
        }
      },
    });
  }
);
