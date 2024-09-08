import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retriveProductById } from "./API/zetoServiceApi"


export default function ProductComponent(){
    const {id} = useParams()
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const [stockAvailable,setStockAvailable] = useState(0)
    const [nameOfProduct,setNameOfProduct] = useState('')

    const navigate = useNavigate()
    useEffect(
        ()=>{
            ProductById();
        },[id]
    )

    function backToProduct(){
        navigate('/products')
    }
    function ProductById(){
        retriveProductById(id)
            .then( (response)=>
            {   
                console.log(response.data)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setStockAvailable(response.data.stockAvailable)
                setNameOfProduct(response.data.nameOfProduct)
            })
            .catch((error)=>console.log(error))
    }

    return(
        <div>
            <div>The Product Details with Id {id}</div>
            <p>Name of the Product : {nameOfProduct} </p> 
            <p>Description of the Product : {description} </p> 
            <p>Price of the Product : {price} </p>  
            <p>Stock of the Product : {stockAvailable} </p> 

            <button onClick={backToProduct}>Back to Product</button>
        </div>
    )
}