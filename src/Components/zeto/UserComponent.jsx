import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "./API/zetoServiceApi"


export default function UserComponent(){
    const [uname,setUname] = useState('')
    const [email,setUmail] = useState('')
    const [password,setUpassword] = useState('')
    const repass=''

    const navigate = useNavigate()

    function validate(values){
        var regexp = /^[a-zA-Z0-9]+@gmail\.com$/
        let errors = {
        }
        if(values.uname.length === 0 || values.uname === null){
            errors.uname = 'Enter your Name'
        }
        if(values.email === null || !regexp.test(String(values.email).toLowerCase())){
            errors.email = 'Enter a valid email'
        }
        if(values.password.length === 0 || values.password !== values.repass ){
            errors.password = 'The password entered doesnt Match, enter again'
        }
        return errors
    }
    
    function createUserData(values){
        console.log("user creation")

        const user = {
            uname: values.uname,
            email: values.email,
            password: values.password
        }

        createUser(user)
        .then( (response)=>
        {   
            navigate('/')
        })
        .catch((error)=>console.log(error))
    }

    return (
            <div className="container">
                <h3>User Registration Page</h3>
                <Formik initialValues={ { uname,email,password,repass } }
                    onSubmit = {createUserData}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="uname"
                                component="div"
                                className = "alert alert-warning"
                            />
                            
                            <fieldset className="form-group">
                                <label>User Name</label>
                                <Field type="text" className="form-control" name="uname" />
                            </fieldset>

                            <ErrorMessage 
                                name="email"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label>User Email</label>
                                <Field type="email" className="form-control" name="email" />
                            </fieldset>

                            <ErrorMessage 
                                name="password"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label>User Password</label>
                                <Field type="text" className="form-control" name="password" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Re enter the Password</label>
                                <Field type="text" className="form-control" name="repass" />
                            </fieldset>

                            <div>
                                <button className="btn btn-success m-5" type="submit">Save User</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
    )
}