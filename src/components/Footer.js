import { Link } from "react-router-dom";
const Footer = ({ Fdisplay }) => {
  return (
    <footer className={`d-${Fdisplay} justify-content-center border-top mt-2`}>
      <div className="footer_content d-flex vstack p-5">
        <div className="FC_top row pb-4">
          <div className="col-md FC_title pb-2">
            <span>N</span>oree<span>'</span>s{" "}
            <span>
              <span>S</span>weet <span>D</span>ough
            </span>{" "}
            and{" "}
            <span>
              <span>B</span>atter
            </span>
          </div>
          <div className="col-md FC_description text-end">
            We sell varieties of cake and breads considering our clients'
            preferences.
          </div>
        </div>
        <div className="FC_middle py-4 row border-top">
          <div className="col-md FC_socials pb-2">
            <a href="https://www.facebook.com/Norees-Sweet-Dough-Batter-393850221432146">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                className="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
          </div>
          <div className="col-md FC_miniMenu d-flex">
            <Link to="/">Home</Link>
            <Link to="/Cakes">Cake</Link>
            <Link to="/About">About</Link>
            <Link to="/Contact">Contact</Link>
          </div>
        </div>
        <div className="FC_bottom text-center">
          © 2021 Noree's Sweet Dough and Batter
        </div>
      </div>
    </footer>
  );
};

export default Footer;
