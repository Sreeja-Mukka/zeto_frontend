import { useEffect, useState } from "react"
import { useParams , useNavigate} from "react-router-dom"
import { createProduct, retriveProductById, updateProductById } from "./API/zetoServiceApi"
import { Formik ,Form, Field, ErrorMessage } from "formik"


export default function UpdateProductComponent(){
    const {id} = useParams()
    
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const [stockAvailable,setStockAvailable] = useState(0)
    const [nameOfProduct,setNameOfProduct] = useState('')

    const navigate = useNavigate()

    useEffect(
        ()=>{
            ProductUpdateById();
        },[id]
    )

    function ProductUpdateById(){

        retriveProductById(id)
            .then( (response)=>
            {   
                setNameOfProduct(response.data.nameOfProduct)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setStockAvailable(response.data.stockAvailable)
            })
            .catch((error)=>console.log(error))
        
    }

    function validate(values) {
        let errors = {
        }

        if(values.description.length<5) {
            errors.description = 'Enter atleast 5 characters'
        }

        if(values.price <= 0 ) {
            errors.price = 'Enter the correct price'
        }

        if(values.stockAvailable <= 0) {
            errors.stockAvailable = 'Enter the correct stock value'
        }

        console.log(values)
        return errors
    }

    function onSubmit(values) {
        console.log(values)
        const product = {
            id: id,
            nameOfProduct: nameOfProduct,
            description: values.description,
            price: values.price,
            stockAvailable: values.stockAvailable
        }
        updateProductById(id,product)
        .then( (response)=>
        {  })
        .catch((error)=>console.log(error))
        navigate('/products')
    }

    return(
        <div className="container">
            <h1>Enter Todo Details </h1>
            <div>
                <Formik initialValues={ { description, price , stockAvailable } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="description"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <ErrorMessage 
                                name="price"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <ErrorMessage 
                                name="stockAvailable"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Price</label>
                                <Field type="number" className="form-control" name="price"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>StockAvaiable</label>
                                <Field type="number" className="form-control" name="stockAvailable"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}