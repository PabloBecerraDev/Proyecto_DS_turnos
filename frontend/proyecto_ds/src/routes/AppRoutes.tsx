import CreateUserForm from "@/pages/CreateUserForm";
import HomePage from "@/pages/HomePage";
import LoginForm from "@/pages/LoginForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<HomePage/>}></Route>
                <Route path="/login" element= {<LoginForm/>}></Route>
                <Route path="/register" element= {<CreateUserForm/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes;