import { useEffect, useState } from "react"
import {retriveAllProduct , deleteProductById } from "./API/zetoServiceApi"
// import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

function ListProductComponent(){

    const [products ,setProducts] = useState([])

    const [message,setMessage] =  useState(null)
   
    // const AuthContext = useAuth()
    const navigate = useNavigate()
    // const username= AuthContext.username
    
    useEffect(
        ()=>{
            showProducts()
        },[]
    )


    function showProducts(){
        retriveAllProduct()
        .then((response)=>
        {   
            //console.log(response)
            setProducts(response.data)
        })
        .catch((error)=>console.log(error))
    }

    function deleteProductId(id){
        deleteProductById(id)
        .then((response)=>
        {   
            setMessage(`Product with Id: ${id} deleted`)
            showProducts()
        })
        .catch((error)=>console.log(error))
    }

    function showProductById(id){
        navigate(`/product/${id}`)
    }

    function updateProductId(id){
        navigate(`/product/update/${id}`)
    }
    function saveNewProduct(){
        navigate('/product/new')
    }


    return (
        <div className='container'>
            <h1>Product List</h1>
            {message && <div>{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Stock Available</th>
                            <th>Price</th>
                            <th>View Product</th>
                            <th>Delete Product</th>
                            <th>Update Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        products.map(
                                prod => (
                                    <tr key={prod.id}>
                                        <td>{prod.nameOfProduct}</td>
                                        <td>{prod.description}</td>
                                        <td>{prod.stockAvailable}</td>
                                        <td>{prod.price}</td>
                                        <td><button onClick={ ()=> showProductById(prod.id) } >View</button></td>
                                        <td><button onClick={() => deleteProductId(prod.id)}>Delete</button></td>
                                        <td><button onClick={() => updateProductId(prod.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <button onClick={() => saveNewProduct()}>New Product</button>
            </div>            
        </div>
    )
}

export default ListProductComponent