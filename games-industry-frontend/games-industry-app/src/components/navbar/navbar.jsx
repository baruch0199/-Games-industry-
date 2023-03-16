import { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CartContext } from "../contexts/cart-context";
import { useAuth } from "../contexts/auth-context";

const Navbar = () => {
  const [productsNumber, setProductsNumber] = useState([]);
  const { cartProducs, cartIconSize } = useContext(CartContext);

  const { user } = useAuth();
  const userName = user() ? user().name : null;

  const navbarRef = useRef(null);
  useEffect(() => {
    const navbar = navbarRef.current;

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("bg-turquoise", window.scrollY > 1);
      navbar.classList.toggle("py-3", window.scrollY > 1);
    });
  });

  if (!productsNumber) {
    return;
  }

  return (
    <>
      <nav
        className="nav navbar navbar-expand-md navbar-dark px-4 navbar-position transition navbar-color"
        aria-label="Fourth navbar example"
        ref={navbarRef}
      >
        <div className="container-fluid">
          <Link className="navbar-brand d-flex" to="/">
            <div>
              <div className="Controller line-hight ">
                <i className="bi bi-controller "></i>
              </div>
            </div>
            <div className="line-hight align-self-center">
              <div>
                Games <br />
                <div className="mt-3">industry</div>
              </div>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/cart" className="cart-link nav-link">
                  Cart
                  <div className={"products-counter-wrapper " + cartIconSize}>
                    <div className="products-counter">{cartProducs.length}</div>
                  </div>
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-md-0 ">
              <li className="nav-item dropdown ">
                {userName ? (
                  <a
                    className="nav-link dropdown-toggle text-light user-name"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userName}
                  </a>
                ) : (
                  <a
                    className="nav-link dropdown-toggle text-light"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                )}

                <ul
                  style={{ paddingBottom: "15px" }}
                  className="dropdown-menu nav-background-color "
                >
                  {userName ? (
                    <>
                      <li>
                        <Link
                          className="nav-link  text-decoration-none mt-3"
                          to="/sign-out"
                        >
                          Sign-out
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link
                          to="/sign-in"
                          className="nav-link mt-3 "
                          aria-current="page"
                          href="#"
                        >
                          Sign-in
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link " to="/sign-up">
                          Sign-up
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="nav-link  text-decoration-none"
                          to="/sign-out"
                        >
                          Sign-out
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
