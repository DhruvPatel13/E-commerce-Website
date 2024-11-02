import React from "react";
import Hero from "../Components/Home/Hero/Hero";
import LatestCollection from "../Components/Home/LatestCollection/LatestCollection";
import ServiceCards from "../Components/Common/ServiceCards/ServiceCards";
import { assets } from "../assets/assets";
import Subscribe from "../Components/Common/Subscribe/Subscribe";
import FeaturedProducts from "../Components/Home/FeaturedProducts/FeaturedProducts";
import CalloutBanners from "../Components/Home/CalloutBanners/CalloutBanners";


const Home = () => {
  return (
    <div className="home">
      <Hero />
      <FeaturedProducts />
      <CalloutBanners />
      <LatestCollection />
      <ServiceCards contentInfo={assets.homeServiceData} />
      <Subscribe />
    </div>
  );
};

export default Home;
