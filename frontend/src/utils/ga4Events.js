export const buildGa4PurchaseEvent = (order) => {
  return {
    event: "purchase",
    ecommerce: {
      transaction_id: order._id,
      value: order.total,
      currency: "INR",
      items: (order.items || []).map((item) => ({
        item_id: item.productId,
        item_name: item.name,
        price: item.price,
      })),
    },
  };
};
