import React, { useState, useContext } from "react";
import addStyles from "./Css/Add.module.css";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../Context/AdminContext";

const Add = () => {
  const { token, backendURL } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([""]);
  const [featured, setFeatured] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Login To Make Changes");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("offer_price", offerPrice);
      formData.append("category", category);
      formData.append("subcategory", subCategory);
      formData.append("featured_product", featured);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendURL + "/api/product/add",
        formData
      );
      setLoading(false);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setOfferPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setSizes([""]);
        setFeatured(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className={addStyles.add}>
      {loading && (
        <div className={addStyles.spinner_wrapper}>
          <div className={addStyles.spinner}>
            <div></div>
          </div>
        </div>
      )}
      <form className={addStyles.content_holder} onSubmit={submitHandler}>
        <div className={addStyles.img_input_container}>
          <label>Upload Image</label>
          <div className={addStyles.img_input_holder}>
            <label htmlFor="image1">
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                loading="lazy"
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                loading="lazy"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                loading="lazy"
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                loading="lazy"
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>
        <div className={addStyles.name_container}>
          <label>Product Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Type here.."
            required
          />
        </div>
        <div className={addStyles.desc_container}>
          <label>Product Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Write content here.."
            required
          ></textarea>
        </div>
        <div className={addStyles.holder}>
          <div className={addStyles.category_container}>
            <label>Product Category</label>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className={addStyles.subcategory_container}>
            <label>Product Subcategory</label>
            <select onChange={(e) => setSubCategory(e.target.value)}>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>
        <div className={addStyles.price_holder}>
          <div className={addStyles.price}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              placeholder="0"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={addStyles.offer_price}>
            <label htmlFor="offer_price">Offer Price</label>
            <input
              value={offerPrice}
              type="number"
              id="price"
              placeholder="0"
              onChange={(e) => setOfferPrice(e.target.value)}
            />
          </div>
        </div>
        <div className={addStyles.product_sizes_holder}>
          <div
            className={`${addStyles.sizes}
               ${sizes.includes("S") ? addStyles.active : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p>S</p>
          </div>
          <div
            className={`${addStyles.sizes}
               ${sizes.includes("M") ? addStyles.active : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p>M</p>
          </div>
          <div
            className={`${addStyles.sizes} 
              ${sizes.includes("L") ? addStyles.active : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p>L</p>
          </div>
          <div
            className={`${addStyles.sizes}
               ${sizes.includes("XL") ? addStyles.active : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p>XL</p>
          </div>
          <div
            className={`${addStyles.sizes} 
              ${sizes.includes("XXL") ? addStyles.active : ""}`}
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p>XXL</p>
          </div>
        </div>
        <div className={addStyles.checkbox_holder}>
          <input
            type="checkbox"
            onChange={() => setFeatured(!featured)}
            checked={featured}
            id="featured"
          />
          <label htmlFor="featured">Add to featured products.</label>
        </div>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default Add;
