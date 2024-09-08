import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCategory } from "./API/zetoServiceApi"

export default function CategoryCoponent(){
    const [categoryName,setCategoryName] = useState('')
    const navigate = useNavigate()

    function onSubmit(values){
        console.log(values)
        const category = {
            categoryName: values.categoryName
        }

        createCategory(category)
        .then( (response)=>
        {   
            navigate('/categories')
        })
        .catch((error)=>console.log(error))
        

    }
    return(
        <div className="container">
            <h1>Enter Category Details</h1>
            <div>
                <Formik initialValues={ { categoryName } }
                    onSubmit = {onSubmit}
                >
                {
                    (props) => (
                        <Form>

                            <fieldset className="form-group">
                                <label>Category Name</label>
                                <Field type="text" className="form-control" name="categoryName" />
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