// pages/dashboard/index.js

import AdminLayout from "@/layout/adminLayout";
import authenticate from "../../../middleware/authMiddleware";
import authorize from "../../../middleware/authMiddleware";

const Dashboard = ({ user }: any) => {
    return (
        <div>
            <h1>Welcome to the Dashboard, {user.name}!</h1>
            {user.role === 'admin' && <p>You have admin privileges.</p>}
            {user.role === 'user' && <p>You have user privileges.</p>}
        </div>
    );
};

// Dashboard.layout = AdminLayout; // Use AdminLayout for this page

Dashboard.layout = AdminLayout;
// Dashboard.authenticate = authenticate(['admin']); // Require 'admin' role to access
Dashboard.authenticate = authorize('read'); // Require 'read' permission to access

export default Dashboard;
