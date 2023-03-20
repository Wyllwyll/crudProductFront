import { useEffect, useState } from "react"
import { TProductFull } from "../types/TProductFull";

export default function Dashboard() {
    const [allProducts, setAllProducts] = useState<TProductFull[]>([])


    useEffect(() => {

        fetch('http://localhost:8000/api/products')
            .then((response) =>
                response.json())

            .then((data) => {
                console.log(data);
                setAllProducts(data.data)

            })
    }, []
    )
    const returnProducts = allProducts.map((elm, i) => (
        <tr key={i}>
            <td>{elm.id}</td>
            <td>{elm.name}</td>
            <td>{elm.price}</td>
            <td>{elm.quantity}</td>
        </tr>
    ))



    return (
        <>
            <div className="d-flex flex-wrap bg-primary height height-header fs-3">
                <p>
                    Produits
                </p>
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