import {useParams, Link} from 'react-router-dom'

function WelcomeComponent(){
    const {uname} = useParams()

    return (
        <div>
            <h1>Welcome {uname}!!</h1>
                Check the products list - <Link to="/products">Products</Link> 
        </div>
    )
}

export default WelcomeComponent