import { useEffect, useState } from "react";
import axios from "axios";

const Refund = () => {
  const [policy, setPolicy] = useState("");

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/policy/refund`
        );
        setPolicy(res.data.policy);
      } catch (err) {
        console.log(err);
        setPolicy("Unable to load refund policy.");
      }
    };

    fetchPolicy();
  }, []);

  return (
    <div>
      <h1>Return & Refund Policy</h1>
      <p>{policy}</p>
    </div>
  );
};

export default Refund;