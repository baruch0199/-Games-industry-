import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";
import FooterNav from "./components/footer/footer-nav";
import SignIn from "./components/sign-in/sign-in";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";

import SignUp from "./components/sign-up/sign-up";
import SignOut from "./components/sign-out";
import ResetPassword from "./components/reset-password/reset-password";
import NewPassword from "./components/new-password/new-password";
import Cart from "./components/cart/cart";
import About from "./components/about/about";
import ProtectedRout from "./components/protected-route";
import useBodyGames from "./components/pulling-games-to-main-section/get-games-to-main-section";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { useAllPlatforms } = useBodyGames();
  const { loading } = useAllPlatforms();

  return (
    <>
      {/* {loading ? (
        <>
          <div className="loading">
            <div className="spinner-grow loading-icon" role="status">
              <span className="sr-only"></span>
            </div>
            <div className="loading-text">loading...</div>
          </div>
        </>
      ) : ( */}
      <div className="h-100 w-100">
        <div className="d-flex flex-column vh-100">
          <ToastContainer
            position="bottom-left"
            autoClose={5016}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <header className=" ">
            <Navbar />
            <Hero />
          </header>
          <main className="/main flex-fill ">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/sign-in"
                element={
                  <ProtectedRout>
                    <SignIn />
                  </ProtectedRout>
                }
              />

              <Route
                path="/sign-up"
                element={
                  <ProtectedRout>
                    <SignUp />
                  </ProtectedRout>
                }
              />

              <Route path="/about" element={<About />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/new-password" element={<NewPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/sign-out" element={<SignOut />} />
            </Routes>
          </main>
          <footer>
            <FooterNav />
          </footer>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default App;
