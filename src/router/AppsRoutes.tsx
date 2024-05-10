import { Routes, Route } from "react-router-dom";
import NavBar from "../main/NavBar";
import Dashboard from "../Apps/Dashboard/Dashboard";
import Viewall from "../Apps/Dashboard/ViewAll";
import Viewall2 from "../Apps/Dashboard/ViewAll2";
import DashboardAdmin from "../Apps/Dashboard/DashboardAdmin";

const AppsRoutes = () => {
    return (
        <NavBar>
            <Routes>
                {/* Rutas para Cliente*/}
                <Route path="/cliente/:id" element={<Dashboard />} />
                <Route path="/cliente/:id/:id" element={<Viewall />} />
            </Routes>
            <Routes>
                {/* Rutas para Administrador*/}
                <Route path="/admin/:id" element={<DashboardAdmin />} />
                <Route path="/admin/:id/:id" element={<Viewall2 />} />
            </Routes>
        </NavBar>
    )
}
export default AppsRoutes