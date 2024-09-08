import { useNavigate } from "react-router-dom"
import { retriveAllCategories } from "./API/zetoServiceApi"
import { useEffect, useState } from "react"

export default function ListCategoryCoponent(){
    const [categories ,setCategories] = useState([])

    const navigate = useNavigate()

    useEffect(
        ()=> showCategories,[]
    )

    function saveNewCategory(){
        navigate('/category/-1')
    }

    function showCategories(){
        retriveAllCategories()
        .then((respone) => {
            console.log(respone)
            setCategories(respone.data)
        })
        .catch((error) => console.log(error))
    }

    function showListOfProductsOfCategory(id){
        //add view to this 
        //Response.data
        navigate(`/category/${id}/products`)

    }

    return(
        <div className='container'>
            <h1>Category List</h1>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Category Id</th>
                            <th>Category Name</th>
                            <th>Show List Of Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        categories.map(
                                category => (
                                    <tr key={category.categoryId}>
                                    <td>{category.categoryId}</td>
                                    <td>{category.categoryName}</td>
                                    <td><button onClick={() => showListOfProductsOfCategory(+category.categoryId)}>Product-List</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <button onClick={() => saveNewCategory()}>Add category</button>
            </div>            
        </div>
    )
}