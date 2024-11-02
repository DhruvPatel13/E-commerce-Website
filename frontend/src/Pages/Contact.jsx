import React from "react";
import contactStyles from "./Css/Contact.module.css";
import Subscribe from "../Components/Common/Subscribe/Subscribe";
import { assets } from "../assets/assets";
import ServiceCards from "../Components/Common/ServiceCards/ServiceCards";
import Title from "../Components/Common/Title/Title";

const Contact = () => {
  return (
    <div className={contactStyles.contact}>
      <div className={contactStyles.content_holder}>
      <Title text1={"CONTACT"} text2={"US"}/>
        <div className={contactStyles.contact_info}>
          <ServiceCards contentInfo={assets.contactServiceData} />
        </div>
        <div className={contactStyles.form_holder}>
          <div className={contactStyles.form_text}>
            <h4>E-mail us!!</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Silique
              consequatur assumenda excepturi dolorous. Quad solita perspiciatis
              total, labrum a placet dolores necessitates harm site aliquot
              labor.
            </p>
          </div>
          <form className={contactStyles.all_inputs}>
            <input type="text" placeholder="Name" required />
            <input type="text" placeholder="Phone" required />
            <input type="email" placeholder="E-mail" required />
            <textarea
              rows={3}
              cols={30}
              placeholder="Reason..."
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default Contact;
