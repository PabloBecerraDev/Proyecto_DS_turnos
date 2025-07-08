import CreateUserForm from "@/pages/RegisterActor/CreateUserForm";
import CreateWorkerForm from "@/pages/RegisterWorker/CreateWorkerForm";
import HomePage from "@/pages/GlobalHome/GlobalHome";
import LoginForm from "@/pages/Login/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import PersonalData from "@/pages/PersonalData/PersonalData";
import ProfilePage from "@/pages/HomeUser/HomeUser";
import ProfilePageWorker from "@/pages/HomeWorker/HomeWorker";

// import Logout from "@/api/Logout";




const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<HomePage/>}></Route>
                <Route path="/login" element= {<LoginForm/>}></Route>
                {/* <Route path="/home-user" element= {<ProfilePage/>}></Route> */}

                <Route
                    path="/profile"
                    element={
                    <ProtectedRoute role="worker">
                        <PersonalData/>
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile-actor"
                    element={
                    <ProtectedRoute role="actor">
                        <PersonalData/>
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                    <ProtectedRoute role="worker">
                        <CreateUserForm/>
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/home-worker"
                    element={
                    <ProtectedRoute role="worker">
                        <ProfilePageWorker/>
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/home-user"
                    element={
                    <ProtectedRoute role="actor">
                        <ProfilePage/>
                    </ProtectedRoute>
                    }
                />


                <Route path="/register-worker" element= {<CreateWorkerForm/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes;