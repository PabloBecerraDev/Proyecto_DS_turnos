import CreateUserForm from "@/pages/CreateUserForm";
import HomePage from "@/pages/HomePage";
import LoginForm from "@/pages/LoginForm";
import Turns from "@/pages/TurnsView";
import PersonalData from "@/pages/PersonalData";

import { BrowserRouter, Routes, Route } from "react-router-dom";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<HomePage/>}></Route>
                <Route path="/login" element= {<LoginForm/>}></Route>
                <Route path="/register" element= {<CreateUserForm/>}></Route>
                <Route path="/turns" element= {<Turns/>}></Route>
                <Route path="/profile" element= {<PersonalData/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes;