
const Product = ({props, onClick}) => {
    const { creationDate, description, id, imagePath, isActive, price, quantity, title } = props;
    return(
        <>
          <div className="product-container">
          <div className="product-image">
            <img src={imagePath}></img>
          </div>
          <div className="product-details">
            <div >{title}</div>
            <div >{description}</div>
            <div >{price} $</div>
            <div>{quantity} pcs</div>
          </div>
          <div className="product-button">
            <button onClick={onClick} className="primary-button">Edit</button>
          </div>
        </div>
        </>
    )
}

export default Product;