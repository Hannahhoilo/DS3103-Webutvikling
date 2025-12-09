import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
// Reactrouter - Outlet 
// https://reactrouter.com/api/components/Outlet
// burde heller bruke children her ? 
const Layout = () => {
	return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 min-h-[700px]">
          {/* i outlet renderer alt som er nestet routes */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );

}

// lex flex-col min-h-screen gjør at layout fyller hele høyden 

// flex-1 på main gjør at den utvider seg og skyver footer ned 

export default Layout;
