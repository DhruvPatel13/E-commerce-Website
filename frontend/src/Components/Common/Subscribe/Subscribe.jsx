import React from "react";
import subscribeStyles from "./Subscribe.module.css";
import Title from "../Title/Title";

const Subscribe = () => {
  return (
    <section className={subscribeStyles.subscribe}>
      <div className={subscribeStyles.subscribe_title}>
        <Title text1={"Subscribe now &"} text2={"get 20% off"} line={false} />
        <p>
          Stay updated with the latest news, insights, and exclusive offers
          weekly!
        </p>
      </div>
      <form
        className={subscribeStyles.input_box}
        onSubmit={(e) => e.preventDefault()}
      >
        <input type="email" required placeholder="Enter your e-mail id" />
        <button onClick={(e) => (e.target.previousElementSibling.value = "")}>
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Subscribe;
