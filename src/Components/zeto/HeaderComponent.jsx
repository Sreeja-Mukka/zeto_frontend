import {Link} from 'react-router-dom'
import {  useAuth } from './security/AuthContext'

function HeaderComponent(){

    const auth = useAuth()
    
    
    function logout() {
        auth.logout()
    }
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="collapse navbar-collapse">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href='/welcome/sreeja'>Zeto</a>
                            <ul className="navbar-nav">
                                
                                <li className="nav-item fs-5">
                                    {auth.isAuthenticated && <Link className="nav-link" to="/welcome/sreeja">Home</Link> }
                                </li>

                                <li className="nav-item fs-5">
                                    {auth.isAuthenticated &&  <Link className="nav-link" to="/products">Products</Link> }
                                </li>

                                <li className="nav-item fs-5">
                                    {auth.isAuthenticated &&  <Link className="nav-link" to="/categories">Categories</Link> }
                                </li>

                            </ul>
                        </div>
                        <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {!auth.isAuthenticated && <Link className="nav-link" to="/">Login</Link> } 
                                </li>
                                <li className="nav-item fs-5">
                                    {auth.isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link> }
                                </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent