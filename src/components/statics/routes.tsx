import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../utils/ProtectedRoute";
import ChatContainer from "../ChatContainer";
import Login from "../Login";

export default function Routesa() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><ChatContainer /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
