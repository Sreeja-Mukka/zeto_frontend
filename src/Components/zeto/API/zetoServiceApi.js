import axios from "axios";

const apiClient = axios.create({
    baseURL:'http://localhost:8081'
})

export function retriveAllProduct(){
    return apiClient.get("/products")
}

export function retriveProductById(id){
    return apiClient.get(`/products/${id}`)
}

export function deleteProductById(id){
    return apiClient.delete(`/products/${id}`)
}

export function updateProductById(id,product){
    return apiClient.put(`/products/${id}`,product)
}

export function createProduct(product){
    return apiClient.post('/products',product)
}
export function retriveAllCategories(){
    return apiClient.get('/categories')
}

export function retriveProductsOfCategoryById(id){
    return apiClient.get(`/categories/${id}/products`)
}

export function createCategory(category){
    return apiClient.post('/categories',category)
}

export function createUser(user){
    return apiClient.post('/users',user)
}