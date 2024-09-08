import './ZetoApp.css'

import ErrorComponent from './ErrorComponent'
import LogoutComponent from './LogoutComponent'
import FooterComponent from './FooterComponent'
import WelcomeComponent from './WelcomeComponent'
import HeaderComponent from './HeaderComponent'
import LoginComponent from './LoginComponent'
import ListProductComponent from './ListProductComponent'
import ProductComponent from './ProductComponent'
import UpdateProductComponent from './UpdateProductComponent'
import ListOfProductsOfCategoryWithId from './ListCategoryProductComponent'
import { BrowserRouter , Routes , Route, Navigate } from 'react-router-dom'
import AuthProvider, { useAuth } from './security/AuthContext'
import ListCategoryCoponent from './ListCategoryComponent'
import CategoryCoponent from './CategoryComponent'
import UserComponent from './UserComponent'
import SaveProductComponent from './SaveProductComponent'


function AuthenticationProvider({children}){
        const auth=useAuth()
        if(auth.isAuthenticated){
            return children
        }

        return <Navigate to="/" />
}

export default function ZetoApp() {
    
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='' element={<LoginComponent/>}/>

                        <Route path='/welcome/:uname' element={
                            <AuthenticationProvider>
                                <WelcomeComponent/>
                            </AuthenticationProvider>
                        }/>

                        <Route path='/create/user' element={
                                <UserComponent/> 
                            }/>

                        <Route path='/products' element={
                            <AuthenticationProvider>
                                <ListProductComponent/> 
                            </AuthenticationProvider>
                            }/>
                        
                        <Route path='/product/new' element={
                            <AuthenticationProvider>
                                <SaveProductComponent/> 
                            </AuthenticationProvider>
                            }/>

                        <Route path='/categories' element={
                            <AuthenticationProvider>
                                <ListCategoryCoponent/> 
                            </AuthenticationProvider>
                            }/>

                        <Route path='/category/:id' element={
                            <AuthenticationProvider>
                                <CategoryCoponent/> 
                            </AuthenticationProvider>
                            }/>

                        <Route path='/category/:id/products' element={
                            <AuthenticationProvider>
                                <ListOfProductsOfCategoryWithId/> 
                            </AuthenticationProvider>
                        }/>

                        <Route path='/product/:id' element={
                            <AuthenticationProvider>
                                <ProductComponent/> 
                            </AuthenticationProvider>
                            }/>
                        
                        <Route path='/product/update/:id' element={
                            <AuthenticationProvider>
                                <UpdateProductComponent/> 
                            </AuthenticationProvider>
                            }/>

                        <Route path='/logout' element={
                            <AuthenticationProvider>
                                <LogoutComponent/>  
                            </AuthenticationProvider>
                            }/>

                        <Route path='*' element={<ErrorComponent/>}/>
                    </Routes>

                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}










