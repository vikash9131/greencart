import { useEffect, useState } from "react";
import axios from "axios";

const Delivery = () => {
  const [policy, setPolicy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/policy/delivery`
        );
        setPolicy(res.data.policy);
      } catch (error) {
        console.error(error);
        setPolicy("Unable to load delivery information.");
      } finally {
        setLoading(false);
      }
    };

    fetchDelivery();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Delivery Information</h1>

      {loading ? <p>Loading...</p> : <p>{policy}</p>}
    </div>
  );
};

export default Delivery;