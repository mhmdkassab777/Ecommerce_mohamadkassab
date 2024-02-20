import "./Products.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

const Products = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [isEditChecked, setIsEditChecked] = useState(true);
  const [isEditVisible, setIsEditVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalItems = products.length; 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = Array.from({ length: totalItems }, (_, index) => index + 1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7014/api/product/GetAll"
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchProducts();
    setFetchData(false);
  }, [fetchData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setEditImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleEditDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleEditPriceChange = (e) => {
    setEditPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleEditQuantityChange = (e) => {
    setEditQuantity(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleEditCheckboxChange = (event) => {
    setIsEditChecked(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "https://localhost:7014/api/product/add";
    const data = {
      Title: title,
      Description: description,
      Price: price,
      Quantity: quantity,
      ImagePath: image,
      IsActive: isChecked,
    };

    axios
      .post(url, data)
      .then(function (response) {
        setFetchData(true);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setImage(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setIsChecked("");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const url = "https://localhost:7014/api/product/edit";
    const data = {
      Id: editId,
      Title: editTitle,
      Description: editDescription,
      Price: editPrice,
      Quantity: editQuantity,
      ImagePath: editImage,
      IsActive: isEditChecked,
    };

    axios
      .post(url, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setFetchData(true);
    setImage(null);

    setEditTitle("");
    setEditDescription("");
    setEditPrice("");
    setEditQuantity("");
    setEditImage("");
    setIsEditChecked("");
  };

  const handleEditClick = (product) => {
    setEditId(product.id);
    setEditTitle(product.title);
    setEditDescription(product.description);
    setEditPrice(product.price);
    setEditQuantity(product.quantity);
    setEditImage(product.imagePath);
    setIsEditChecked(product.isActive);
    setIsEditVisible(!isEditVisible);
  };

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  const toggleEditForm = () => {
    setIsEditVisible(!isEditVisible);
  };

  return (
    <>
      {isVisible && (
        <div id="product-add-form" className="product-add-form-container">
          <form className="product-add-form " onSubmit={handleSubmit}>
            <div className="inputs-container flex-col-center">
              <div className="product-add-form-input">
                <input
                  className="input"
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>

              <div className="">
                <input
                  className="input"
                  placeholder="Title"
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>

              <div className="">
                <input
                  className="input"
                  placeholder="Description"
                  type="text"
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>

              <div className="">
                <input
                  className="input"
                  placeholder="Price"
                  type="number"
                  id="description"
                  value={price}
                  onChange={handlePriceChange}
                  required
                />
              </div>

              <div className="">
                <input
                  className="input"
                  placeholder="Quantity"
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                />
              </div>

              <div className="flex-row-center">
                <input
                  className="input"
                  placeholder="IsActive"
                  type="checkbox"
                  id="isactive"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  required
                />
                <label for="isactive">is Active ? </label>
              </div>
            </div>

            <div className="product-add-form__image-container">
              {image && (
                <img className="product-image" src={image} alt="Selected" />
              )}
            </div>

            <div className="flex-row-center">
              <button className="primary-button" type="submit">
                Add
              </button>
              <button className="secondary-button" onClick={toggleForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isEditVisible && (
        <div id="product-add-form" className="product-add-form-container">
          <form className="product-add-form " onSubmit={handleEdit}>
            <div className="inputs-container flex-col-center">
              <div className="">
                <input
                  className="input"
                  placeholder="Title"
                  type="text"
                  id="title"
                  value={editTitle}
                  onChange={handleEditTitleChange}
                  required
                />
              </div>

              <div className="">
                <input
                  className="input"
                  placeholder="Description"
                  type="text"
                  id="description"
                  value={editDescription}
                  onChange={handleEditDescriptionChange}
                  required
                />
              </div>

              <div className="">
                <input
                  className="input"
                  placeholder="Price"
                  type="number"
                  id="price"
                  value={editPrice}
                  onChange={handleEditPriceChange}
                  required
                />
              </div>

              <div className="">
                <input
                  className="input"
                  placeholder="Quantity"
                  type="number"
                  id="quantity"
                  value={editQuantity}
                  onChange={handleEditQuantityChange}
                  required
                />
              </div>

              <div className="flex-row-center">
                <input
                  className="input"
                  placeholder="IsActive"
                  type="checkbox"
                  id="isactive"
                  checked={isEditChecked}
                  onChange={handleEditCheckboxChange}
                  required
                />
                <label for="isactive">is Active ? </label>
              </div>
            </div>

            <div className="product-add-form__image-container">
              {editImage && (
                <img className="product-image" src={editImage} alt="Selected" />
              )}
            </div>

            <div className="flex-row-center">
              <button className="primary-button" type="submit">
                Edit
              </button>
              <button className="secondary-button" onClick={toggleEditForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-main-container">
        <div className="product-container product-add">
          <div onClick={toggleForm} className="product-image">
            <img src={require("../assets/images/add.png")}></img>
          </div>
          <div className="product-details">
            <div>Title</div>
            <div>Description</div>
            <div>Price</div>
            <div>pcs</div>
          </div>
          <div className="product-button">
            <button className="primary-button">Edit</button>
          </div>
        </div>

        {products.slice(startIndex, endIndex).map((item, index) => (
          <Product
            key={index}
            props={item}
            onClick={() => handleEditClick(item)}
          />
        ))}
      </div>
  <div class="pagination">
  {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, index) => index + 1).map((page) => (
          <a
            key={page}
            href="#"
            className={currentPage === page ? 'active' : ''}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        ))}
</div>
    </>
  );
};

export default Products;
