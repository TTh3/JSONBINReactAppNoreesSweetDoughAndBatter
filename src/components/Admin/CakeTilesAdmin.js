import { useRef, useEffect, useState } from "react";
import { Img } from "react-image";
// import useContainerDimensions from "../Small_Components/WidthNHeightofCurrentComponent";

const CakeTilesAdmin = ({
  adminHandleTimeOuts,
  Cakes,
  AdminCakes,
  setAdminCakes,
  setRCakes,
  setAdminCCResponse,
  encodeImageFileAsURL_CakeTilesAdmin,
}) => {
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;
    setWidth(elementRef.current.getBoundingClientRect().width);
  }, [Cakes]); //empty dependency array so it only runs once at render

  return Cakes.map((cake, CakesIndex) => (
    <div
      ref={elementRef}
      className="cake_content shadow-sm"
      key={cake.Name + CakesIndex}
    >
      <div className="cake_content_img">
        <Img
          src={cake["Image Link"]}
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
          unloader={
            <img src="./img/Background_SpecialCakes.png" alt="NoImage"></img>
          }
          alt={cake.Name}
        />
      </div>
      <div className="cake_content_text">
        {Object.keys(cake).map(
          (key, i) =>
            i !== 0 && (
              <p key={cake.Name + CakesIndex + key}>
                {key}:{" "}
                <button
                  className={`btn btn-sm btn-primary overflow-hidden `}
                  onClick={(e) =>
                    e.target.innerHTML === "Toggle Text"
                      ? (e.target.innerHTML = "Text: " + cake[key])
                      : (e.target.innerHTML = "Toggle Text")
                  }
                  style={{ width: width - 30 }}
                >
                  Toggle Text
                </button>
                {key === "Image Link" ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      //  value={cake.ImageLink}
                      className="form-control"
                      onChange={(e) => {
                        e.target.files &&
                          encodeImageFileAsURL_CakeTilesAdmin(
                            e,
                            cake,
                            CakesIndex,
                            key
                          );
                      }}
                    />
                    <input
                      type="text"
                      //  value={cake.ImageLink}
                      className="form-control"
                      placeholder={cake[key]}
                      onChange={(e) => {
                        let ClonedCakes = JSON.parse(
                          JSON.stringify(AdminCakes)
                        );

                        ClonedCakes[CakesIndex][key] =
                          e.target.value === cake[key]
                            ? cake[key]
                            : e.target.value;

                        
                        setAdminCakes(() => {
                          return ClonedCakes;
                        });
                      }}
                    />
                  </>
                ) : (
                  <input
                    type="text"
                    //  value={cake.ImageLink}
                    className="form-control"
                    placeholder={cake[key]}
                    onChange={(e) => {
                      let ClonedCakes = JSON.parse(JSON.stringify(AdminCakes));

                      ClonedCakes[CakesIndex][key] =
                        e.target.value === "" ? cake[key] : e.target.value;

                      
                
                      setAdminCakes(() => ClonedCakes);
                    }}
                  />
                )}
              </p>
            )
        )}
      </div>
      <div className="cake_content_admin_btn d-flex">
        <button
          className="btn btn-light-success opac me-1"
          onClick={() =>
            setRCakes(() => {
              return AdminCakes.filter((AC) => AC.id < Cakes.length);
            })
          }
        >
          Preview
        </button>
        <button
          className="btn btn-color-design1 opac"
          onClick={() => {
            
            setAdminCakes(() => {
              return AdminCakes.filter((AC) => AC.id !== cake.id);
            });
            setRCakes(() => {
              return Cakes.filter((AC) => AC.id !== cake.id);
            });
          }}
        >
          Delete '{cake.Name}'{" "}
          <span style={{ color: "var(--bs-red)", marginLeft: "5px" }}>
            &#215;
          </span>
        </button>
      </div>
    </div>
  ));
};

export default CakeTilesAdmin;
