import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import CheckEmail from "../pages/CheckEmail";
import CheckPassword from "../pages/CheckPassword";
import Home from "../pages/Home";
import Message from "../components/Message";
import App from "../App";
import AuthLayout from "../layout";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "register",
                element: <AuthLayout><Register/></AuthLayout>
            },
            {
                path: "email",
                element: <AuthLayout><CheckEmail/></AuthLayout>
            },
            {
                path: "password",
                element: <AuthLayout><CheckPassword/></AuthLayout>
            },
            {
                path: "forgot-password",
                element: <AuthLayout><ForgotPassword/></AuthLayout>
            },
            {
                path: "",
                element: <Home/>,
                children: [
                    {
                        path: ':userId',
                        element: <Message/>
                    }
                ]
            } 
        ]
    }
])

export default router