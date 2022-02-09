import { Link } from "react-router-dom";

const Header = ({ Hdisplay }) => {
  return (
    <>
      <div className={`d-${Hdisplay} vstack`}>
        <div className="social-media-nav container-fluid btn-color-design1 p-2 d-flex justify-content-center text-center">
          <span>
            Welcome To{" "}
            <span>
              <span>N</span>orees' <span>S</span>weet <span>D</span>ough And
              <span>B</span>atter
            </span>{" "}
            Website!
          </span>
        </div>
        <nav className="navbar navbar-light py-3 px-4 mb-2 border-bottom">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand align-items-center d-flex">
              <img
                src="./img/icons/cake-icon.png"
                alt="cake_icon"
                className="align-middle pe-3 header-icon-cupcake"
              />
              <span className="header-title">
                Noree
                <span style={{ color: "var(--color-design1-hover)" }}>'</span>s
                Bakery
              </span>
            </Link>
            <div className="content_nav_noree d-flex">
              <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#NoreesWebNav"
              >
                Menu
                <div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </button>
              <Link className="nav-link" to="/Cakes">
                Cakes
              </Link>
              <Link className="nav-link" to="/About">
                About
              </Link>
              <Link className="nav-link" to="/Contact">
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
