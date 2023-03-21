import { useState } from "react";
import { TProductFull } from "../types/TProductFull";

export default function OneProduct(props: {
    handleDeleteProduct: (productId: number) => void,
    product: TProductFull,
    update: (data: TProductFull) => void

}) {

    const [isEditing, setIsEditing] = useState(false)
    const [newProductName, setNewProductName] = useState<string>("");
    const [newProductPrice, setNewProductPrice] = useState<string>("");
    const [newProductQuantity, setNewProductQuantity] = useState<string>("");
    const [editingProductId, setEditingProductId] = useState<number>(0);
    const [hide, setHide] = useState(true)




    const handleUpdateProduct = (productId: number, name: string, price: string, quantity: string) => {

        const body = JSON.stringify({
            name: name,
            price: parseInt(price),
            quantity: parseInt(quantity),
        });

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        };

        fetch(`http://localhost:8000/api/products/${productId}`, options)
            .then(response => response.json())
            .then(response => {

                props.update(response.data)
                setNewProductName("");
                setNewProductPrice("");
                setNewProductQuantity("");
                setIsEditing(false)



            })
            .catch(err => console.error(err));
    };



    /**
   * suppression d'un product par son ID
   */
    const handleDelete = (productsId: number) => {
        console.log(productsId);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`http://localhost:8000/api/products/${productsId}`, options)
            .then(response => response.json())
            .then(response => {

                props.handleDeleteProduct(productsId)
            })
    };

    return (
        <tr>

            <td>{props.product.id}</td>

            {isEditing === false ? <td>{props.product.name}</td> : <td> <input type="name"
                className="form-control"
                id="nameControl"
                onChange={(e) => setNewProductName(e.target.value)}
                required></input></td>}
            {isEditing === false ? <td>{props.product.price}</td> : <td><input type="price"
                className="form-control"
                id="priceControl"
                onChange={(e) => setNewProductPrice(e.target.value)}
                required></input></td>}
            {isEditing === false ? <td>{props.product.quantity}</td> : <td> <input type="quantity"
                className="form-control"
                id="quantityControl"
                onChange={(e) => setNewProductQuantity(e.target.value)}
                required></input></td>}
            <td>


                {hide ?
                    <button type="button" className="btn btn-primary mx-2" onClick={() => {

                        setIsEditing(true);
                        setEditingProductId(props.product.id);
                        setNewProductName(props.product!.name);
                        setNewProductPrice(props.product!.price.toString());
                        setNewProductQuantity(props.product!.quantity.toString());
                        setHide(false)
                    }}
                        id="update">
                        modifier
                    </button>

                    : <button type="button" className="btn btn-success mx-2" onClick={() => {
                        handleUpdateProduct(editingProductId, newProductName, newProductPrice, newProductQuantity); setHide(true)
                    }}
                        id="validate">
                        valider
                    </button>
                }

                <button type="button" className="btn btn-danger" onClick={() => { handleDelete(props.product.id) }} id="delete">
                    supprimer
                </button>
            </td>
        </tr >
    )



}


