sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Controller, JSONModel, formatter, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
      formatter: formatter,
      onInit: function () {
        var oViewModel = new JSONModel({
          currency: "EUR",
        });

        this.getView().setModel(oViewModel, "view");
      },

      onFilterInvoices: function (oEvent) {
        // build filter array
        const aFilter = [];
        const sQuery = oEvent.getParameter("query");
        if (sQuery) {
          aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
        }

        // filter binding
        const oList = this.byId("invoiceList");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
      },

      // Click on a specific list item on the invoice list
      onPress: function (oEvent) {
        // Get clicked item 取得用户点击的控件，这里得到的是ObjectListItem
        const oItem = oEvent.getSource();
        // oItem.getBindingContext("invoice")的返回值是：
        // { oModel: constructor, sPath: '/Invoices/4', bForceRefresh: false, sDeepPath: '' }
        // oItem.getBindingContext("invoice").getPath()的返回值是：'/Invoices/4'
        // oItem.getBindingContext("invoice").getPath().substr(1): 把'/Invoices/4'字符串最前面的"/"去掉
        // 在URL里"/"是非法字符，在这里去掉后，在后面的详细页面，还要手动加上。
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail", {
          //就是把'Invoices/4'里的数字加密，最后返回：'Invoices%252F4'
          invoicePath: window.encodeURIComponent(
            oItem.getBindingContext("invoice").getPath().substr(1) // define "invoice" as model name
          ),
        });
      },
    });
  }
);
