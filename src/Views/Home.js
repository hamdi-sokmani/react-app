import React from "react";
import HelloWorld  from '../Components/HelloWorld';
import axios from "axios";
import Loader from "../Components/Loader";
import ProductCard from "../Components/ProductCard";

function Home() {
    const url = "https://6499ff6c79fbe9bcf8403960.mockapi.io/products?page=1&limit=3";
    const [products, setProducts] = React.useState({
        loading: false,
        data: null,
        error: false,
    });
    let content = null;

    React.useEffect(() => {
        setProducts({
            loading: true,
            data: null,
            error: false
        });
        axios.get(url).then(response => {
            console.log(response.data);
            setProducts({
                loading: false,
                data: response.data,
                error: false
            })
        }).catch(() => {
            setProducts({
                loading: false,
                data: null,
                error: true
            })
        });
    }, [url]);

    if (products.error) {
        content = <p>
            An error occurred, please refresh or try again later.
        </p>
    }

    if (products.loading) {
        content = <Loader />;
    }

    if (products.data) {
        content =
        products.data.map((product) => 
            <div key={product.id}>
                <ProductCard 
                    product={product}
                />
            </div>
        )
    }

    return (
        <div> 
            <h1 className='font-bold text-2xl mb-3'>
                Best of the Best
            </h1>
            {content}
        </div>
    );
}

export default Home;