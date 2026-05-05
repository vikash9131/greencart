import { useState } from "react";
import axios from "axios";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

const handleTrack = async () => {
  try {
    setError("");
    setOrder(null);

    // ✅ STRICT CLEANING
    let cleanId = orderId.trim();

    // remove label if user pasted it
    if (cleanId.includes(":")) {
      cleanId = cleanId.split(":")[1].trim();
    }

    console.log("Final ID:", cleanId); // 🔍 debug

    // ✅ VALIDATE LENGTH
    if (cleanId.length !== 24) {
      setError("Invalid Order ID");
      return;
    }

    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/order/${cleanId}`
    );

    setOrder(res.data);

  } catch (err) {
    setError("Order not found");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Track Your Order</h1>

      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={handleTrack}>Track</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {order && (
        <div style={{ marginTop: "20px" }}>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ₹{order.amount}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;