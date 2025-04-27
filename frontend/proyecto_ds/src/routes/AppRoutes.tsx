import CreateUserForm from "@/pages/Register/CreateUserForm";
import HomePage from "@/pages/Home/HomePage";
import LoginForm from "@/pages/Login/LoginForm";
import Turns from "@/pages/CreateTurn/TurnsView";
import PersonalData from "@/pages/MyData/PersonalData";
import House from "@/pages/viewSelf/House"
import History from "@/pages/HistoryTurns/History"
import About from "@/pages/AboutUs/About";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element= {<HomePage/>}></Route>
                    <Route path="/login" element= {<LoginForm/>}></Route>
                    <Route path="/register" element= {<CreateUserForm/>}></Route>
                    <Route path="/turns" element= {<Turns/>}></Route>
                    <Route path="/profile" element= {<PersonalData/>}></Route>
                    <Route path="/self" element={<House/>}></Route>
                    <Route path="/history" element={<History/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}


export default AppRoutes;