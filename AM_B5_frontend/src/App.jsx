import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ManageUser from "./pages/ManageUser";
import CreateNewUser from "./pages/CreateNewUser";
import EditUser from "./pages/EditUser";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import ManageAsset from "./pages/ManageAsset";
import CreateNewAsset from "./pages/CreateNewAsset";
import ManageAssignment from "./pages/ManageAssignment";
import CreateNewAssignment from "./pages/CreateNewAssignment";
import EditAsset from "./pages/EditAsset";
import RequestForReturning from "./pages/RequestForReturning";
import EditAssignment from "./pages/EditAssignment";
import ReportPage from "./pages/ReportPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/home' element={
                    <PrivateRoute>
                        <Home/>
                    </PrivateRoute>
                }/>

                <Route path='/manage-user' element={
                    <PrivateRoute>
                        <ManageUser/>
                    </PrivateRoute>
                }/>
                <Route path='/create-new-user' element={
                    <PrivateRoute>
                        <CreateNewUser/>
                    </PrivateRoute>
                }/>
                <Route path='/create-new-asset' element={
                    <PrivateRoute>
                        <CreateNewAsset/>
                    </PrivateRoute>
                }/>
                <Route path='/edit-user' element={
                    <PrivateRoute>
                        <EditUser/>
                    </PrivateRoute>
                }/>

                <Route path='/manage-asset' element={
                    <PrivateRoute>
                        <ManageAsset/>
                    </PrivateRoute>
                }/>
                <Route path='/create-new-asset' element={
                    <PrivateRoute>
                        <CreateNewAsset/>
                    </PrivateRoute>
                }/>

                <Route path='/edit-asset' element={
                    <PrivateRoute>
                        <EditAsset/>
                    </PrivateRoute>
                }/>

                <Route path='/assets/report' element={
                    <PrivateRoute>
                        <ReportPage/>
                    </PrivateRoute>
                }/>

                <Route path='/manage-assignment' element={
                    <PrivateRoute>
                        <ManageAssignment/>
                    </PrivateRoute>
                }/>
                <Route path='/create-new-assignment' element={
                    <PrivateRoute>
                        <CreateNewAssignment/>
                    </PrivateRoute>
                }/>
                <Route path='/edit-assignment' element={
                    <PrivateRoute>
                        <EditAssignment/>
                    </PrivateRoute>
                }/>

                <Route path='/request-for-returning' element={
                    <PrivateRoute>
                        <RequestForReturning/>
                    </PrivateRoute>
                }/>

                <Route path='/login' exact element={
                    <LoginPage/>
                }/>
                <Route path='*' element={
                    <NotFound/>
                }/>
                <Route path='/' element={<Navigate to="/home" replace/>}/>

            </Routes>
        </Router>
    );
};

export default App;