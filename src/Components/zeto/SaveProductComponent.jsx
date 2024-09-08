
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { createProduct, retriveAllCategories } from "./API/zetoServiceApi";
import { useNavigate } from "react-router-dom";

export default function SaveProductComponent(){

    const [categories,setCategories] =  useState([])

    const [prodName , setProdName] = useState('')
    const [prodDesc , setProdDesc] = useState('')
    const [prodPrice , setProdPrice] = useState(0)
    const [prodStock , setProdStock] = useState(0)

    const [categoryName,setCategoryName] = useState('')
    const [cid , setCid] = useState(0)

    const navigate = useNavigate()

    useEffect(
        ()=>{
            CategoryList();
        },[]
    )

    function CategoryList(){
        retriveAllCategories()
        .then(
            (response) => {
                setCategories(response.data)
                }
        )
        .catch(error => console.log(error))
    }

    function onSubmit(values){ 
        const catType = {
            categoryId:cid,
            categoryName:categoryName
        }

        console.log(catType)

        const product = {
            nameOfProduct:values.prodName,
            description:values.prodDesc,
            price:values.prodPrice,
            stockAvailable:values.prodStock,
            catType:catType
        }

        createProduct(product)
        .then((respone) => {
            console.log(respone)
        })
        .catch((error) => console.log(error))

        navigate('/products')
    }

    function handleChange(e){
        const selectedCategoryName = e.target.value
        setCategoryName(selectedCategoryName)
        
        const selectedCategory = categories.find(category => category.categoryName === selectedCategoryName)
        setCid(selectedCategory.categoryId)
    }
    
    return (
        <div>
            <div><h2>Save a Product</h2></div>
            <Formik initialValues={ {categoryName ,prodName , prodDesc ,prodPrice , prodStock } }
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
            >
                {
                (props) => (
                <Form>
                    <fieldset className="form-group">
                    <label><b>Name of the Product </b></label>
                    <Field type="text" className="form-control" name="prodName"></Field>
                    </fieldset>

                    <fieldset className="form-group">
                    <label><b>Description</b></label>
                    <Field type="text" className="form-control" name="prodDesc"></Field>
                    </fieldset>

                    <fieldset className="form-group">
                    <label><b>Price</b></label>
                    <Field type="number" className="form-control" name="prodPrice"></Field>
                    </fieldset>

                    <fieldset className="form-group">
                    <label><b>Stock Available</b></label>
                    <Field type="number" className="form-control" name="prodStock"></Field>
                    </fieldset>

                    <fieldset className="form-group">
                    <label><b>Category Name</b></label>
                    <select onChange={handleChange} className="form-control" >
                    <option >Select</option>
                    {
                        categories.map(
                                category => ( 
                                        <option key={category.categoryId} value={category.categoryName}>{category.categoryName}</option>
                                )
                        )
                    }
                    </select>
                    </fieldset>
                    <div>
                    <button className="btn btn-success m-5" type="submit" >Create Product</button>
                    </div>
                    
                </Form>                 
                )
                }
                
            </Formik>
        </div>
    )
}