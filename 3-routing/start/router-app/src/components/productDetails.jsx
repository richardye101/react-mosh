import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = ({ history }) => {
  const params = useParams();
  let navigate = useNavigate();

  return (
    <div>
      <h1>Product Details - {params.id} </h1>
      <button onClick={() => navigate("/products", { replace: true })}>
        Save
      </button>
    </div>
  );
};

export default ProductDetails;

// class ProductDetails extends Component {
//   handleSave = () => {
//     // Navigate to /products
//   };
//   componentDidMount() {
//     const id = this.props.match.params.id;
//     this.fetchData(id);
//   }
//   render() {

// }
