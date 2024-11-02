import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import viewStyles from "./Css/ViewProduct.module.css";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/Common/RelatedProducts/RelatedProducts";

const ViewProduct = () => {
  const { productId } = useParams();
  const { allProducts, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    allProducts.map((product) => {
      if (String(product._id) === productId) {
        setProductData(product);
        setImage(product.image[0]);
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [allProducts, productId]);
  if (!productData) return <p>Loading product details...</p>;

  return (
    <div className={viewStyles.product_holder}>
      <div className={viewStyles.product_content}>
        <div className={viewStyles.holder_left}>
          <div className={viewStyles.image_options}>
            {productData.image.map((src, idx) => (
              <img
                src={src}
                onClick={() => setImage(src)}
                key={idx}
                loading="lazy"
              />
            ))}
          </div>
          <div className={viewStyles.image_main}>
            <img src={image} alt="Main Image" loading="lazy"/>
          </div>
        </div>
        <div className={viewStyles.holder_right}>
          <div className={viewStyles.product_info}>
            <h3>{productData.name}</h3>
            <div className={viewStyles.rating_holder}>
              <div className={viewStyles.rating}>
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_dull_icon} alt="" />
              </div>
              <p>{"(122)"}</p>
            </div>
            <div className={viewStyles.price_holder}>
              {productData.offer_price > 0 ? (
                <>
                  <p className={viewStyles.offer_price}>
                    {currency}
                    {productData.price}
                  </p>
                  <p className={viewStyles.price}>
                    {currency}
                    {productData.offer_price}
                  </p>
                </>
              ) : (
                <p className={viewStyles.price}>
                  {currency}
                  {productData.price}
                </p>
              )}
            </div>
            <div className={viewStyles.description_holder}>
              <p>{productData.description}</p>
            </div>
            <div className={viewStyles.size_holder}>
              {productData.sizes.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(item)}
                  className={` ${viewStyles.size} ${
                    item === size ? viewStyles.active : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className={viewStyles.btn}>
              <button onClick={() => addToCart(productData._id, size)}>
                ADD TO CART
              </button>
            </div>
          </div>
          <div className={viewStyles.product_policy}>
            100% original product, Cash on delivery is available on this
            product, Easy return and exchange policy within 7 days.
          </div>
        </div>
      </div>
      <div className={viewStyles.web_description}>
        <div className={viewStyles.options}>
          <div className={viewStyles.option}>Description</div>
          <div className={viewStyles.option}>{"Reviews (122)"}</div>
        </div>
        <div className={viewStyles.description}>
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      <div className={viewStyles.related_Products}>
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default ViewProduct;
