import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://ecom-backend-3h0k.onrender.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <img src={product.image} alt={product.name} width="300" />
      <h2>{product.name}</h2>
      <p>₹{product.price}</p>
    </div>
  );
}

export default Product;
