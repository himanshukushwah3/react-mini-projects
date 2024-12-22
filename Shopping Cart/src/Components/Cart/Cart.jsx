import React, { useEffect, useState } from "react";
import { data } from "./data";
import { FaTrash } from "react-icons/fa";
import "./cartStyle.css";

const Cart = () => {
  const [items, setItems] = useState(data);
  const [initlaprize, setInitialPrize] = useState(0);
  const [totalPrize, setTotalPrize] = useState(initlaprize);

  useEffect(() => {
    const price = items.reduce((acc, item) => acc + item.price, 0);
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setInitialPrize(price);
    setTotalPrize(total);
  }, [items]);

  // to increment the quantity
  const handleIncrement = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  };

  // to decrement the quantity
  const handleDecrement = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItems(updatedItems);
  };

  // to remove items
  const handleRemove = (id) => {
    const removeItem = items.filter((item) => item.id !== id);
    setItems(removeItem);
  };
  return (
    <div className="wrapper">
      <div className="left-side">
        <div className="heading-div">
          <h3>Number of items is {items.length}</h3>
        </div>
        <div className="table-div">
          <table>
            <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Prize</th>
              <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </td>
                <td>{item.price}</td>
                <td>
                  <span className="trash-icon"><FaTrash onClick={() => handleRemove(item.id)} /></span>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="totalprice">
          <span>Total Price:</span>
          <span>{totalPrize}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
