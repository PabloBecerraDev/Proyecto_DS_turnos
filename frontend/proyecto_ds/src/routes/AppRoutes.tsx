import CreateUserForm from "@/pages/RegisterActor/CreateUserForm";
import CreateWorkerForm from "@/pages/RegisterWorker/CreateWorkerForm";
import HomePage from "@/pages/GlobalHome/GlobalHome";
import LoginForm from "@/pages/Login/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import PersonalData from "@/pages/PersonalData/PersonalData";
import ProfilePage from "@/pages/HomeUser/HomeUser";
import RequestTicketPage from "@/pages/RequestTicket/RequestTicket";
// import Logout from "@/api/Logout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<HomePage/>}></Route>
                <Route path="/login" element= {<LoginForm/>}></Route>
                <Route path="/personal-data" element= {<PersonalData/>}></Route>
                <Route path="/home-user" element= {<ProfilePage/>}></Route>
                {/* <Route path="/logout" element= {<Logout/>}></Route> */}
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
                <Route
                    path="/solicitar-turno"
                    element={
                        <ProtectedRoute role="worker">
                            <RequestTicketPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes;