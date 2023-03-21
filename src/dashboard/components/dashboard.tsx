import { useEffect, useRef, useState } from "react"
import { TProductFull } from "../types/TProductFull";
import OneProduct from "./product";

export default function Dashboard() {

    const [allProducts, setAllProducts] = useState<TProductFull[]>([])
    const [addForm, setAddForm] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);



    /**
     * ajout d'un produit
     */
    const handleSubmitAdd = () => {

        if (nameRef.current && priceRef.current && quantityRef.current) {

            const body = JSON.stringify({
                name: nameRef.current.value,
                price: parseInt(priceRef.current.value),
                quantity: parseInt(quantityRef.current.value),
            });

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
            };

            fetch('http://localhost:8000/api/products', options)
                .then(response => response.json())
                .then(response => {

                    if (response.statusCode === 201) {
                        const productsCopy = [...allProducts];
                        productsCopy.push(response.data);
                        setAllProducts(productsCopy);
                        setAddForm(false);
                    }
                    else {
                        console.log(response.error);
                    };
                })
        }
    };


    const handleDeleteProduct = (productId: any) => {

        setAllProducts(allProducts.filter((product: TProductFull) => product.id !== productId));
    }



    const handleUpdate = (data: TProductFull) => {
        const updatedProducts = allProducts.map((product: TProductFull) => {

            if (product.id === data.id) {
                return data;
            };

            return product;
        });
        setAllProducts(updatedProducts)
    }


    /**
     * recupere et affiche toutes les données
     */
    useEffect(() => {
        fetch('http://localhost:8000/api/products')
            .then((response) =>
                response.json())
            .then((data) => {
                // console.log(data);
                setAllProducts(data.data)
            })
    }, []
    )
    const returnProducts = allProducts.map((product, i) =>
        <OneProduct product={product} update={handleUpdate} handleDeleteProduct={handleDeleteProduct} ></OneProduct>
    )

    return (

        <>
            <div className="d-flex flex-wrap bg-primary height height-header fs-3">
                <p>
                    Produits
                </p>
            </div>

            <div className="ms-5 me-5">
                {addForm ?
                    <form className="row g-3 mt-4  mb-4   border" onSubmit={handleSubmitAdd} >

                        <div className="">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Nom</label>
                            <input
                                type="name"
                                className="form-control"
                                id="nameControl"
                                ref={nameRef}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Prix</label>
                            <input
                                type="price"
                                className="form-control"
                                id="priceControl"
                                ref={priceRef}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Quantité</label>
                            <input
                                type="quantity"
                                className="form-control"
                                id="quantityControl"
                                ref={quantityRef}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary mb-3"
                        >
                            Ajouter un produit
                        </button>

                    </form>

                    : <button type="button" className="btn btn-primary mt-4 ms-2 mb-4" onClick={() => setAddForm(true)}>Ajouter un produit</button>

                }

            </div>
            <table className="table">
                <thead>
                    <tr >
                        <th scope="col">#</th>
                        <th scope="col">nom</th>
                        <th scope="col">prix</th>
                        <th scope="col">quantité</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {returnProducts}
                </tbody>
            </table>

        </>

    )
}