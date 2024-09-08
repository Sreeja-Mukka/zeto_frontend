import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'

function LoginComponent() {

    const [username,SetUsername]=useState("sreeja")

    const [password,SetPassword]=useState("")

    const [ErrMsg,SetErrMsg]=useState(false)

    const navigate = useNavigate()

    const auth = useAuth()

    function changeUserName(event){
        SetUsername(event.target.value)
    }
    function changePassword(event){
        SetPassword(event.target.value)
    }
    
    function handleRegister(){
        navigate('/create/user')
        console.log("Register called!!")
    }
    function handleSubmit(){
        if(auth.login(username,password)){
            navigate(`/welcome/${username}`)
        }
        else{
            SetErrMsg(true)
        }
    }
    // function ShowSuccessComponent(){
    //     if(SuccMsg){
    //         return <div>Authentication SuccessFull</div>
    //     }
    //     return null
    // }

    // function ShowFailComponent(){
    //     if(ErrMsg){
    //         return <div>Authentication Failed , login Again</div>
    //     }
    //     return null
    // }

    return(
        <div>
            <h1>Login Here!</h1>
            {ErrMsg && <div>Authentication Failed , login Again</div>}
            {/* <ShowFailComponent/>
            <ShowSuccessComponent/> */}
            <div className="LoginForm">
                <div>
                    <label >UserName: </label>
                    <input type="text" name="username" defaultValue={username} onChange={changeUserName}/>
                </div>
                <div>
                    <label >Password: </label>
                    <input type="password" name="password" defaultValue={password} onChange={changePassword}/>
                </div>
                <button name="login" onClick={handleSubmit}>Login</button>
            </div>
            <br></br>
            <p><b>New User? Register Below!</b></p>
            <button name="register" onClick={handleRegister}>Register</button>
        </div>
    )
}

export default LoginComponent