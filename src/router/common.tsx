import SignIn from "../auth/SignIn";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AppsRoutes from './AppsRoutes';
import Register from "../auth/Register";


const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user/*" element={<AppsRoutes />} />
            </Routes>
        </BrowserRouter>

    )
}

export default MainRouter