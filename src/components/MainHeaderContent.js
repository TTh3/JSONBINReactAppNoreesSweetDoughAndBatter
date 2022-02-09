import { Link } from "react-router-dom";
import { Img } from "react-image";
const MainHeaderContent = ({ Cakes }) => {
  const CarouselCakes = JSON.parse(
    JSON.stringify(Cakes.filter((cake) => cake.Tags.includes("Carousel")))
  );
  return (
    <div className="MainHeaderContent py-4 px-5 container-fluid">
      <div className="row p-3">
        <div className="MainHeaderContentText pt-4  ps-4 col-lg">
          <img src="./img/HCake-design.png" alt="Cake Icons" />
          <h1>
            Noree<span style={{ color: "var(--color-design1-hover)" }}>'</span>s
            <span style={{ color: "var(--color-design1)" }}> Sweet </span>
            <span style={{ color: "var(--color-design1)" }}>Dough </span>
            and
            <span style={{ color: "var(--color-design1)" }}> Batter</span>
          </h1>
          <p>
            We sell varieties of cake and breads considering our clients'
            preferences.
          </p>
          <div className="MHCT_BTNs d-flex justify-content-center">
            <Link
              to="/Cakes"
              className="px-3 shadow btn btn-sm btn-color-design1 opac d-flex align-items-center"
            >
              See Our Cakes!
            </Link>
            <Link
              to="/Contact"
              className="ms-3 p-2  shadow btn btn-sm btn-color-dark opac"
            >
              <img src="./img/icons/about-us.png" alt="Followers Icon" />
            </Link>
          </div>
        </div>
        <div className="MainHeaderContentImg d-flex justify-content-center align-items-center p-4 col-lg">
          <div
            id="carouselMainHeader"
            className="carousel slide shadow"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {/* <div className="carousel-item active">
                  <img src="..." className="d-block w-100" alt="..." /> 
                  <img
                    src="./img/best-header-cake.jpg"
                    className="shadow"
                    id="MainHeaderContentImage"
                    alt="Cake Header"
                  />
                </div> */}
              <div className="carousel-item active ">
                <img src="./img/Background_SpecialCakes.png" alt="CakeHeader" />
              </div>
              {
                // eslint-disable-next-line
                CarouselCakes.sort((a, b) => {
                  if (a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
                  if (a.Name.toLowerCase() === b.Name.toLowerCase()) return 0;
                  if (a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
                }).map((Carouselcake, i) => (
                  <div
                    className="carousel-item"
                    key={"CarouselCake-" + Carouselcake.Name}
                  >
                    <p className="position-absolute">
                      {i + 1 + " of " + CarouselCakes.length}
                    </p>
                    <Img
                      src={Carouselcake["Image Link"]}
                      unloader={
                        <img
                          src="./img/Background_SpecialCakes.png"
                          alt="NoImage"
                        ></img>
                      }
                      loader={
                        <div className="d-flex h-100 justify-content-center align-items-center">
                          <div
                            className="spinner-border text-color-design1-hover"
                            style={{ width: "3rem", height: "3rem" }}
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      }
                      alt={"Carousel" + Carouselcake.Name}
                    />
                    <Link
                      to={`/Cakes?${Carouselcake.Name}`}
                      className="btn btn-color-design1 opac fw-bold"
                    >
                      Visit This Cake!
                    </Link>
                  </div>
                ))
              }
            </div>
            <div
              className={`carousel-controllers d-${
                CarouselCakes.length ? "block" : "none"
              }`}
            >
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselMainHeader"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselMainHeader"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <img
              src="./img/logo_noree.jpg"
              className="logo"
              alt="Logo Noree"
              onClick={() => {
                window.location.assign("");
              }}
            />
          </div>
          <div className="carousel-indicators">
            <button
              type="button"
              className="active d-none"
              data-bs-target="#carouselMainHeader"
              data-bs-slide-to="0"
              aria-label="Slide 1"
            ></button>
            {CarouselCakes.map((Carouselcake, i) => (
              <button
                key={"CI-" + Carouselcake.Name}
                type="button"
                data-bs-target="#carouselMainHeader"
                data-bs-slide-to={i + 1}
                aria-label={`Slide ${i + 2}`}
              >
                <Img
                  src={Carouselcake["Image Link"]}
                  unloader={
                    <img
                      src="./img/Background_SpecialCakes.png"
                      alt="NoImage"
                    ></img>
                  }
                  loader={
                    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                      <div
                        className="spinner-border text-color-design1-hover"
                        style={{ width: "3rem", height: "3rem" }}
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  }
                  alt={"Carousel" + Carouselcake.Name}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeaderContent;
