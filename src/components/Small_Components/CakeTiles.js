import { Link } from "react-router-dom";
import { Img } from "react-image";
const CakeTiles = ({ ModalSeeMoreCake, Cakes }) => {
  return JSON.parse(JSON.stringify(Cakes))
    .reverse()
    .map((cake) => (
      <div className="cake_content" key={cake.Name}>
        <div className="cake_content_img">
          <Img
            src={cake["Image Link"]}
            unloader={
              <img src="./img/Background_SpecialCakes.png" alt="NoImage"></img>
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
        <div className="cake_content_text">
          <p>
            Title: <span id="cake_content_title_id">{cake.Name}</span>
          </p>
          <p>
            Description:{" "}
            <span id="cake_content_description_id">
              {cake.Description.length > 50
                ? cake.Description.slice(
                    0,
                    Math.round(cake.Description.length * 0.75)
                  ) + "..."
                : cake.Description}
            </span>
          </p>
        </div>
        <div className="cake_content_btn">
          <button
            data-bs-toggle="modal"
            data-bs-target="#NoreesCakeSeeMoreModal"
            onClick={() => {
              ModalSeeMoreCake(JSON.parse(JSON.stringify(cake)));
            }}
          >
            See its Features!
          </button>
          <button>
            <Link to="/Contact">Contact Us!</Link>
          </button>
        </div>
      </div>
    ));
};

export default CakeTiles;
