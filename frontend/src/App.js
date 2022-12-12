import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import ProtectedRoutes from "./components/services/protectedRoutes";
import {
  HomePage,
  AdminPage,
  UserPage,
  SignUpPage,
  LoginPage,
  RegisteredDispatchCenterPage,
  RegisteredAnimalsEditPage,
  RegisteredAnimalsCreatePage,
  AllDriversPage,
  CreateDriverPage,
  EditDriverPage,
  AllRoutesPage,
  CreateRoutePage,
  EditRoutePage
} from "./components/pages/index";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route>
            <Route
              path="/user"
              element={
                <ProtectedRoutes requiredRole={"User"} page={<UserPage />} />
              }
            />
            <Route
              path="/user/dispatchCenters"
              element={
                <ProtectedRoutes
                  requiredRole={"User"}
                  page={<RegisteredDispatchCenterPage />}
                />
              }
            />
            <Route
              path="/user/dispatchCenters/edit"
              element={
                <ProtectedRoutes
                  requiredRole={"User"}
                  page={<RegisteredAnimalsEditPage />}
                />
              }
            />
            <Route
              path="/user/dispatchCenters/create"
              element={
                <ProtectedRoutes
                  requiredRole={"User"}
                  page={<RegisteredAnimalsCreatePage />}
                />
              }
            />
          </Route>
          <Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoutes requiredRole={"Admin"} page={<AdminPage />} />
              }
            />
             <Route
              path="/admin/drivers"
              element={
                <ProtectedRoutes
                  requiredRole={"Admin"}
                  page={<AllDriversPage />}
                />
              }
            />
             <Route
              path="/admin/drivers/create"
              element={
                <ProtectedRoutes
                  requiredRole={"Admin"}
                  page={<CreateDriverPage />}
                />
              }
            />
            <Route
              path="/admin/drivers/edit"
              element={
                <ProtectedRoutes
                  requiredRole={"Admin"}
                  page={<EditDriverPage />}
                />
              }
            />
            <Route
              path="/admin/routes"
              element={
                <ProtectedRoutes
                  requiredRole={"Admin"}
                  page={<AllRoutesPage/>}
                />
              }
            />
            <Route
              path="/admin/routes/create"
              element={
                <ProtectedRoutes
                  requiredRole={"Admin"}
                  page={<CreateRoutePage/>}
                />
              }
            />
            <Route
              path="/admin/routes/edit"
              element={
                <ProtectedRoutes
                  requiredRole={"Admin"}
                  page={<EditRoutePage/>}
                />
              }
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
