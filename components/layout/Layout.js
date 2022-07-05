import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className="relative flex-1 flex-col bg-slate-200 px-4">{children}</main>
        </div>
    );
};

export default Layout;