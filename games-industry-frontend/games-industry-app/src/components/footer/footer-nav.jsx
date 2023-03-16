import { useNavigate, Link } from "react-router-dom";

const FooterNav = () => {
  return (
    <nav className="footer-section">
      <div className="footer-background">
        <ul className="footer-links">
          <li className="nav-item footer-item ">
            <Link className="nav-link " aria-current="page" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item footer-item ">
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </li>
          <li className="nav-item footer-item ">
            <Link className="nav-link " aria-current="page" to="/sign-up">
              Sign-up
            </Link>
          </li>
          <li className="nav-item footer-item ">
            <Link to="/sign-in" className="nav-link">
              Sign-in
            </Link>
          </li>
          <li className="nav-item footer-item ">
            <Link className="nav-link " aria-current="page" to="/sign-out">
              Sign-out
            </Link>
          </li>
        </ul>

        <div className="footer-text">
          <p className="footer-paragraph">
            This site wat built by baruch rozaev.
          </p>
          <p className="footer-paragraph">
            Thanks to Gamerpower about their content -
            https://www.gamerpower.com
          </p>
        </div>
      </div>
    </nav>
  );
};

export default FooterNav;
