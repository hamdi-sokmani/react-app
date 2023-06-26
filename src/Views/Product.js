import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";

function Product() {
    const { id } = useParams();
    const url = "https://6499ff6c79fbe9bcf8403960.mockapi.io/products/" + id + "";
    const placeholder = "https://via.placeholder.com/150"
    const [product, setProduct] = React.useState({
        loading: false,
        data: null,
        error: false,
    });
    let content = null;

    React.useEffect(() => {
        setProduct({
            loading: true,
            data: null,
            error: false
        });
        axios.get(url).then(response => {
            console.log(response.data);
            setProduct({
                loading: false,
                data: response.data,
                error: false
            })
        }).catch(() => {
            setProduct({
                loading: false,
                data: null,
                error: true
            })
        });
    }, [url]);

    if (product.error) {
        content = <p>
            An error occurred, please refresh or try again later.
        </p>
    }

    if (product.loading) {
        content = <Loader />;
    }
    
    if (product.data) {
        content =
        <div>
            <h1 className="text-2xl font-bold mb-3">
                {product.data ? product.data.name : "Loading..."}
            </h1>
            <div>
                <img 
                    src={product.data ? product.data.image : placeholder}
                    alt={product.data ? product.data.name : "Loading..."}
                />
            </div>
            <div className="font-bold text-xl mb-3">
                $ {product.data ? product.data.price : "Loading..."}
            </div>
            <div>
                {product.data ? product.data.description : "Loading..."}
            </div>
        </div>
    }

    return (content);
}

export default Product;