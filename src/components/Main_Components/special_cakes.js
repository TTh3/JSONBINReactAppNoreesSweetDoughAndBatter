import { Link } from "react-router-dom";

import { Img } from "react-image";
const special_cakes = ({ Cakes }) => {
  return (
    <section className="SpecialCakes d-block mx-auto w-100">
      <div className="norees_main_section__title mb-4 text-center">
        <p>OUR SPECIAL CAKES</p>
      </div>
      <div className="SC_content container-fluid">
        {
          // eslint-disable-next-line
          Cakes.sort((a, b) => {
            if (a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
            if (a.Name.toLowerCase() === b.Name.toLowerCase()) return 0;
            if (a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
          })
            .filter((cake) => cake.Tags.includes("Popular"))
            .map((cake, i) => (
              <div
                key={`${i + 1}_Special_Cake`}
                className={`${i + 1}_Special_Cake row`}
              >
                <div className="col-sm special_cake_title shadow ">
                  <span>
                    {i + 1}
                    {". " + cake.Name}
                  </span>
                  <p>
                    <span>Description:</span>
                    {" " + cake.Description}
                  </p>
                  <Link
                    to={`/Cakes?${cake.Name}`}
                    className="btn btn-color-design1 opac"
                  >
                    More About this Cake!
                  </Link>
                </div>
                <div className="col-sm special_cake_img">
                  <Img
                    src={cake["Image Link"]}
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
                    alt={cake.Name}
                  />
                </div>
              </div>
            ))
        }
      </div>
    </section>
  );
};

export default special_cakes;
