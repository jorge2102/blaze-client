
class OrderCalculation {

  static calculateTotals(order) {
    let subtotal = 0;

    order?.orderProducts?.forEach((product) => {
      subtotal += product.product.price * product.quantity;
    });

    let total = this.#calculateTaxes(subtotal);

    //Order update with totals
    order.taxes = parseFloat(total.subtotal);
    order.totalTaxes = parseFloat(total.totalTaxes);
    order.totalAmount = parseFloat(total.total);

    return total;
  }

  static #calculateTaxes(subtotal) {
    const numDecimals = 2;
    let totalCityTax = 0;
    let totalCountryTax = 0;
    let totalStateTax = 0;
    let totalFederalTax = 0;
    let totalTaxes = 0;
    let total = 0;

    totalCityTax = subtotal * 0.1;
    totalCountryTax = (subtotal + totalCityTax) * 0.05;
    totalStateTax = (subtotal + totalCityTax + totalCountryTax) * 0.08;
    totalFederalTax = (subtotal + totalCityTax + totalCountryTax + totalFederalTax) * 0.02;
    totalTaxes = (totalCityTax + totalCountryTax + totalFederalTax + totalFederalTax);
    total = subtotal + totalTaxes;

    return {
      subtotal: subtotal.toFixed(numDecimals),
      totalCityTax: totalCityTax.toFixed(numDecimals),
      totalCountryTax: totalCountryTax.toFixed(numDecimals),
      totalStateTax: totalStateTax.toFixed(numDecimals),
      totalFederalTax: totalFederalTax.toFixed(numDecimals),
      totalTaxes: totalTaxes.toFixed(numDecimals),
      total: total.toFixed(numDecimals)
    };
  }

  static getTableItems(orderProducts) {
    let dataTable = [];

    orderProducts?.forEach(product => {
      let cost = product.quantity * product.product.price;

      let item = {
        id: product.product.id,
        name: product.product.name,
        quantity: product.quantity,
        unitPrice: product.product.price,
        cost
      };

      dataTable = [...dataTable, item];
    });

    return dataTable;
  }

  static getTableProducts(products, orderProducts) {
    let dataTable = [];

    products?.forEach(product => {
      let quantity = 0;

      orderProducts !== undefined && orderProducts?.forEach(oProduct => {
        if (oProduct.product.id == product.id) {
          quantity = oProduct.quantity;
        }
      });

      let item = {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        active: product.active,
        quantity
      };

      dataTable = [...dataTable, item];
    });

    return dataTable;
  }

  static getOrderProducts(tableItems) {
    let orderProducts = [];

    tableItems.forEach(item => {
      if (item.quantity != 0 && item.quantity != '') {

        let product = {
          product: {
            id: item.id,
            active: item.active,
            category: item.category,
            name: item.name,
            price: item.price
          },
          quantity: item.quantity
        };

        orderProducts = [...orderProducts, product];
      }
    });

    return orderProducts;
  }
}

export default OrderCalculation;

/*
{
    id: "0",
    customer: "",
    date: DateTime.changeFormatDate(new Date()),
    orderProducts: [
      {
        product: {
          id: "string",
          active: true,
          category: "Cookies",
          name: "string",
          price: 0
        },
        quantity: 0
      }
    ],
    status: "Pending",
    taxes: 0,
    totalAmount: 0,
    totalTaxes: 0
  }

*/