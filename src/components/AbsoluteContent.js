import { Link } from "react-router-dom";
const AbsoluteContent = () => {
  return (
    <>
      <div
        className="modal fade"
        id="NoreesWebNav"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body d-flex">
              <p className="m-0 fw-bold">Menu</p>
              <div className="text-center px-3">
                <Link className="btn btn-color-design1 hover my-1" to="/Cakes">
                  Cakes
                </Link>
                <Link
                  className="btn btn-color-design1 hover my-1 mx-1 "
                  to="/About"
                >
                  About
                </Link>
                <Link
                  className="btn btn-color-design1 hover my-1"
                  to="/Contact"
                >
                  Contact
                </Link>
              </div>
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AbsoluteContent;
