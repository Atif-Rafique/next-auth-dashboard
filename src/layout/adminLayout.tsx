// import Sidebar from '../components/Sidebar';

const AdminLayout = ({ children }: any) => {
    return (
        <>
            {/* <Sidebar /> */}
            Sidebar
            <div>{children}</div>
        </>
    );
};

export default AdminLayout;