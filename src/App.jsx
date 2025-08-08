import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import About from "./Pages/About";
import TradingCourseModules from "./Pages/TradingCourseModules";
import TradingRegistrationForm from "./Pages/WorkShopRegistrationForm";
import ScrollToTop from "./Pages/ScrollToTop";
import AdminDashboard from "./Pages/AdminDashboard";
import ClientPage from "./Pages/ClientPage";
import PlLinkShowcase from "./Pages/PlLinkShowCase";
import Footer from "./Pages/Footer";
import AnimatedBackground from "./Pages/AnimatedGridBackground";
import Payment from "./Pages/Payment";
import CopyTradingForm from "./Pages/CopyTradingForm";

function Layout({ children }) {
  const location = useLocation();
  
  // Hide navbar/footer only on registration page
   const hideNavFooter = location.pathname.startsWith('/register') || location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main className={!hideNavFooter ? 'pt-20' : ''}>
        {children}
      </main>
      {!hideNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <AnimatedBackground>
        <Layout>
          <Routes>
            <Route path="/" element={<ClientPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/course" element={<TradingCourseModules />} />
            <Route path="/p&lrecords" element={<PlLinkShowcase />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/register" element={<TradingRegistrationForm />} />
            <Route path="/copy&trading" element={<CopyTradingForm/>} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </AnimatedBackground>
    </>
  );
}

export default App;