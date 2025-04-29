import CreateUserForm from "@/pages/CreateUserForm";
import CreateWorkerForm from "@/pages/CreateWorkerForm";
import HomePage from "@/pages/HomePage";
import LoginForm from "@/pages/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<HomePage/>}></Route>
                <Route path="/login" element= {<LoginForm/>}></Route>
                {/* <Route path="/register" element= {<CreateUserForm/>}></Route> */}
                <Route
                    path="/register"
                    element={
                    <ProtectedRoute role="worker">
                        <CreateUserForm/>
                    </ProtectedRoute>
                    }
                />


                <Route path="/register-worker" element= {<CreateWorkerForm/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes;