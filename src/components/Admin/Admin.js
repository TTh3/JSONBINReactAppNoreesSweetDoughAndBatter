import { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router";
import { Img } from "react-image";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import axios from "axios";
import CakeTilesAdmin from "./CakeTilesAdmin";
import EditfetchCakes from "../../lib/EditfetchCakes";
import Compress from "compress.js";

const Admin = ({
  Cakes,
  setdisplayNavNFooter,
  AdminCakes,
  setAdminCakes,
  setRCakes,
  FixedCakes,
  setFixedCakes,
  getCakes,
}) => {
  const compress = new Compress();
  // const location = useLocation();
  const [AddedCakeTiles, setAddedCakeTiles] = useStateWithCallbackLazy([]);
  const [BackupEditableAddedCakeTiles, setBackupEditableAddedCakeTiles] =
    useState([]);
  const [EditableAddedCakeTiles, setEditableAddedCakeTiles] =
    useStateWithCallbackLazy([]);
  const [AdminCCResponse, setAdminCCResponse] = useState([
    "none",
    "Cakes Updating...",
    "block",
  ]);

  const [ChangeAdminSearchCTInput, setChangeAdminSearchCTInput] = useState("");
  const [AdminCountResponse, setAdminCountResponse] =
    useState("Loading Cakes...");
  // TODO: Create a yt tutorial for inputing Image Links
  const AdminGuideModalBodyContent = [
    ["Tips", "Use a non-handheld device. (e.g Computer or Laptop)"],
    [
      "Reminder",
      `As soon as you type, the value automatically changes.`,
      `As you can see in each Cake Tile have a second input with a label that says, 'Image Link' and this specific input only accepts image links. There are 2 ways to get this working, first way is to upload the image from your device using the "Choose file" Image uploader. The Second way way is to copy the image's link address which then will be pasted to your desired specific "Image Link" input. `,
      `If you ever need to restart, feel free to click the "Refresh" button located in the first tile.`,
      `At each 'Price' inputs, it is recommended to add "PH Pesos" at the end of the number.`,
      `At each 'Tags' inputs, to add multiple tags, separate each tag with a comma. The 'Carousel' tag displays the cake Image in the Header Image Carousel. The 'Popular' tag displays the cake Image in the "Special Cakes" section.`,
      `Do not forget to click "Save Changes" after you finished.`,
    ],
    [
      "To Edit A Cake",
      "Using the search bar or just scrolling through, find the cake you want to edit.",
      `After you found the cake you want to edit, you should see the current value of each inputs. Click on the input you want to edit and type the value you want it to be.`,
      `After editing, you can then consider clicking the "Preview" button at the tile's bottom section. This will store all the editable inputs' texts only in the frontend state of the tile.`,
    ],
    [
      "To Add A Cake",
      `Looking at the first tile, click on the "Add +" button.`,
      `You'll then see a fresh cake tile with this site's logo and some inputs. This is where the editing process begins.`,
      `Click on the input you'll be editing and as you type, the input's value will automatically be updated.`,
      `After completing last step, you can then consider clicking the "Preview" button at the tile's bottom section. This will store all the editable inputs' texts only in the frontend state of the tile.`,
      `We are finished!`,
    ],
    [
      "To Delete A Cake",
      `Using the search bar or just scrolling through, find the cake you want to delete.`,
      `After you found the cake you want to delete, click the "Delete [Name of the Cake]" button located at the bottom of the cake tile.`,
    ],
  ];
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);
  useEffect(() => {
    console.log("Changed AdminCakes:");
    console.log(AdminCakes);
  }, [AdminCakes]);
  useEffect(() => {
    if (!elementRef.current) return;
    setWidth(elementRef.current.getBoundingClientRect().width);
  }, [AddedCakeTiles]);
  const encodeImageFileAsURL_CakeTilesAdmin = (e, cake, CakesIndex, key) => {
    const files = [...e.target.files];
    compress
      .compress(files, {
        size: 4,
        quality: 0.75,
        maxWidth: 1200,
        maxHeight: 1200,
        resize: true,
      })
      .then((data) => {
        let dataFirst = data[0];
        let DynamicImgBBForm = new FormData();
        DynamicImgBBForm.append("image", dataFirst.data);
        axios
          .post(
            "https://api.imgbb.com/1/upload?expiration=0&key=6e7624c08f85bee160b7f0f367eb925e",
            DynamicImgBBForm
          )
          .then((response) => {
            console.log("Image Post is a success!");
            let ImagePOSTurl = response.data.data.image.url;
            let ClonedCakes = JSON.parse(JSON.stringify(AdminCakes));
            setAdminCakes(() => {
              ClonedCakes[CakesIndex][key] =
                e.target.value === cake[key] ? cake[key] : ImagePOSTurl;
              return ClonedCakes;
            });
          })
          .catch((error) => {
            console.log("error", error);
            alert("Something's wrong");
            window.location.reload();
          });
      });
  };
  const encodeImageFileAsURL_AddedCakeTiles = (e, key, ACKT, i) => {
    const files = [...e.target.files];
    compress
      .compress(files, {
        size: 4,
        quality: 0.75,
        maxWidth: 1200,
        maxHeight: 1200,
        resize: true,
      })
      .then((data) => {
        let dataFirst = data[0];
        let DynamicImgBBForm = new FormData();
        DynamicImgBBForm.append("image", dataFirst.data);
        axios
          .post(
            "https://api.imgbb.com/1/upload?expiration=0&key=6e7624c08f85bee160b7f0f367eb925e",
            DynamicImgBBForm
          )
          .then((response) => {
            console.log("Image Post is a success!");
            let ImagePOSTurl = response.data.data.image.url;
            let ClonedCakes = JSON.parse(JSON.stringify(AdminCakes));

            ClonedCakes[AdminCakes.length - i - 1][key] =
              e.target.value === "" ? ACKT[key] : ImagePOSTurl;

            setAdminCakes(
              () => {
                return ClonedCakes;
              },
              () => {
                setEditableAddedCakeTiles(() => {
                  let ClonedEACT = JSON.parse(
                    JSON.stringify(EditableAddedCakeTiles)
                  );
                  ClonedEACT[i][key] =
                    e.target.value === ""
                      ? ACKT[key]
                      : dataFirst.prefix + dataFirst.data;
                  setBackupEditableAddedCakeTiles(ClonedEACT);
                  return ClonedEACT;
                });
              }
            );
          })
          .catch((error) => {
            console.log("error", error);
            alert("Something's wrong");
            window.location.reload();
          });
      });
  };
  const AdminFilterCakeTiles = async (AdminSearchCTInput) => {
    AdminSearchCTInput === ""
      ? setAddedCakeTiles(EditableAddedCakeTiles)
      : setAddedCakeTiles([]);
    setRCakes(AdminCakes);
    setEditableAddedCakeTiles(BackupEditableAddedCakeTiles);
    // setAddedCakeTiles(BackupEditableAddedCakeTiles);

    setEditableAddedCakeTiles(() =>
      EditableAddedCakeTiles.filter(
        (cake) =>
          cake.Tags.toLowerCase().includes(AdminSearchCTInput.toLowerCase()) ||
          cake.Name.toLowerCase().includes(AdminSearchCTInput.toLowerCase()) ||
          cake.Description.toLowerCase().includes(
            AdminSearchCTInput.toLowerCase()
          )
      )
    );

    // setAddedCakeTiles(() =>
    //   AddedCakeTiles.filter(
    //     (cake) =>
    //       cake.Tags.toLowerCase().includes(AdminSearchCTInput.toLowerCase()) ||
    //       cake.Name.toLowerCase().includes(AdminSearchCTInput.toLowerCase()) ||
    //       cake.Description.toLowerCase().includes(
    //         AdminSearchCTInput.toLowerCase()
    //       )
    //   )
    // );
    setRCakes(() => {
      return AdminCakes.filter(
        (cake) =>
          cake.Tags.toLowerCase().includes(AdminSearchCTInput.toLowerCase()) ||
          cake.Name.toLowerCase().includes(AdminSearchCTInput.toLowerCase()) ||
          cake.Description.toLowerCase().includes(
            AdminSearchCTInput.toLowerCase()
          )
      );
    });
  };

  useEffect(() => {
    setdisplayNavNFooter("none");
  }, [getCakes, setdisplayNavNFooter]);

  useEffect(() => {
    Cakes.length
      ? setAdminCountResponse(
          `Showing ${Cakes.length + AddedCakeTiles.length} Cakes`
        )
      : setAdminCountResponse(`No Cakes Shown.`);
  }, [Cakes, AddedCakeTiles]);

  return (
    <>
      <div
        className="modal fade"
        id="AdminGuideModal"
        tabIndex="-1"
        aria-labelledby="AdminGuideModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header py-2">
              <h4 className="modal-title" id="AdminGuideModal_title">
                <img src="./apple-icon-114x114.png" alt="LogoNoree" />
                Admin Guide
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>Please read through the guide carefully:</h5>
              {AdminGuideModalBodyContent.map((AGMBC) => (
                <li key={`AdminGuideModalBodyContent${AGMBC[0]}`}>
                  <h5>{AGMBC[0]}</h5>
                  <span>
                    {AGMBC.map(
                      (value, i) =>
                        i !== 0 && (
                          <p key={`AdminGuideModalBodyContent${AGMBC[0] + i}`}>
                            {i + ". " + value}
                          </p>
                        )
                    )}
                  </span>
                </li>
              ))}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-light-success opac"
                data-bs-dismiss="modal"
              >
                I understand!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`Admin_Content_Change_Response d-${AdminCCResponse[0]} position-absolute top-50 start-50 translate-middle text-center px-5 py-4 rounded shadow`}
      >
        <img src="./img/logo_noree.jpg" alt="NoreesLogo" />
        <p>
          <span>{AdminCCResponse[1]}</span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className={`bi bi-arrow-clockwise d-${AdminCCResponse[2]} mx-auto`}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </p>
      </div>
      <div className="Admin-nav d-flex p-3 border-bottom">
        <div className="left-admin-nav d-flex align-items-center m-0 p-0">
          <p className="mb-0 d-flex">NSDB Admin</p>
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Search Cakes"
            onKeyUp={(e) =>
              e.keyCode === 13 && AdminFilterCakeTiles(e.target.value)
            }
            onChange={(e) => setChangeAdminSearchCTInput(e.target.value)}
          />
          <button
            className="btn btn-color-design1 opac"
            onClick={() => {
              AdminFilterCakeTiles(ChangeAdminSearchCTInput);
            }}
          >
            Search
          </button>
        </div>
        <div className="right-admin-nav d-flex">
          <a href="." className="btn btn-color-design1 opac">
            Go to Home
          </a>
          <button
            className="btn btn-light-success opac"
            onClick={() => EditfetchCakes(AdminCakes, setAdminCCResponse)}
          >
            Save Changes
          </button>
        </div>
      </div>
      <div className="Admin_cakes_count p-3">{AdminCountResponse}</div>
      <div className="cake_content_wrapper-admin d-grid px-3 pb-3">
        <div className="cake_content CContent_Add d-flex justify-content-center align-items-center">
          <img
            src="./ms-icon-310x310.png"
            className="CContent_Add_Logo"
            alt="NSDB's Logo"
          />
          <button
            className="border-0"
            onClick={() => {
              setTimeout(() => {
                let CakeTileId = AdminCakes.length
                  ? Math.max(...AdminCakes.map((AC) => AC.id)) + 1
                  : 0;
                let CakeTile = {
                  id: CakeTileId,
                  Name: `Name Value ${CakeTileId}`,
                  "Image Link": "https://i.ibb.co/xjNzvx6/logo-noree.jpg",
                  Description: `Description Value ${CakeTileId}`,
                  Price: `N/A`,
                  Tags: `Popular`,
                };
                setAddedCakeTiles([], () =>
                  setAddedCakeTiles([CakeTile, ...EditableAddedCakeTiles], () =>
                    setAddedCakeTiles(
                      JSON.parse(
                        JSON.stringify(EditableAddedCakeTiles)
                      ).reverse()
                    )
                  )
                );
                setEditableAddedCakeTiles([
                  CakeTile,
                  ...EditableAddedCakeTiles,
                ]);
                setFixedCakes([...FixedCakes, CakeTile]);
                setBackupEditableAddedCakeTiles([
                  ...BackupEditableAddedCakeTiles,
                  CakeTile,
                ]);
                setAdminCakes([...AdminCakes, CakeTile]);
              }, 1);
            }}
          >
            Add +
          </button>
          <p
            className={`btn my-2`}
            onClick={() => {
              setRCakes([]);
              setAdminCakes([]);
              setTimeout(() => {
                setRCakes(FixedCakes);
                setAdminCakes(FixedCakes);
              }, 1);
              setAddedCakeTiles([]);
              setEditableAddedCakeTiles([]);
            }}
          >
            <span className="pe-1">Refresh</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise adminCT_Refresh_icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </p>
          <button
            type="button"
            className="btn btn-lg shadow fs-6"
            data-bs-toggle="modal"
            data-bs-target="#AdminGuideModal"
          >
            Need Help?
          </button>
        </div>

        {AddedCakeTiles.length
          ? AddedCakeTiles.map((ACKT, i) => (
              <div
                className="cake_content"
                ref={elementRef}
                key={`ACKT${ACKT + i}`}
              >
                <h2 className="fs-5 btn btn-color-design1 opac">New!</h2>
                <div className="cake_content_img">
                  <Img
                    src={ACKT["Image Link"]}
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
                    crossorigin="anonymous"
                    alt={ACKT.Name}
                  />
                </div>
                <div className="cake_content_text">
                  {Object.keys(ACKT).map(
                    (key, index) =>
                      index !== 0 && (
                        <p key={"cake_content" + key + index}>
                          {key}:{" "}
                          <button
                            className={`btn btn-sm btn-primary overflow-hidden `}
                            onClick={(e) =>
                              e.target.innerHTML === "Toggle Text"
                                ? (e.target.innerHTML = "Text: " + ACKT[key])
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
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => {
                                  e.target.files[0] &&
                                    encodeImageFileAsURL_AddedCakeTiles(
                                      e,
                                      key,
                                      ACKT,
                                      i
                                    );
                                }}
                              />
                              <input
                                type="text"
                                //  value={cake.ImageLink}

                                className="form-control"
                                placeholder={ACKT[key]}
                                onChange={(e) => {
                                  let ClonedCakes = JSON.parse(
                                    JSON.stringify(AdminCakes)
                                  );

                                  ClonedCakes[AdminCakes.length - i - 1][key] =
                                    e.target.value === ""
                                      ? ACKT[key]
                                      : e.target.value;
                                  setAdminCakes(
                                    () => {
                                      return ClonedCakes;
                                    },
                                    () => {
                                      setEditableAddedCakeTiles(() => {
                                        let ClonedEACT = JSON.parse(
                                          JSON.stringify(EditableAddedCakeTiles)
                                        );
                                        ClonedEACT[i][key] =
                                          e.target.value === ""
                                            ? ACKT[key]
                                            : e.target.value;
                                        setBackupEditableAddedCakeTiles(
                                          ClonedEACT
                                        );
                                        return ClonedEACT;
                                      });
                                    }
                                  );
                                }}
                              />
                            </>
                          ) : (
                            <input
                              type="text"
                              //  value={cake.ImageLink}

                              className="form-control"
                              placeholder={ACKT[key]}
                              onChange={(e) => {
                                let ClonedCakes = JSON.parse(
                                  JSON.stringify(AdminCakes)
                                );

                                ClonedCakes[AdminCakes.length - i - 1][key] =
                                  e.target.value === ""
                                    ? ACKT[key]
                                    : e.target.value;
                                setAdminCakes(
                                  () => {
                                    return ClonedCakes;
                                  },
                                  () => {
                                    setEditableAddedCakeTiles(() => {
                                      let ClonedEACT = JSON.parse(
                                        JSON.stringify(EditableAddedCakeTiles)
                                      );
                                      ClonedEACT[i][key] =
                                        e.target.value === ""
                                          ? ACKT[key]
                                          : e.target.value;
                                      setBackupEditableAddedCakeTiles(
                                        ClonedEACT
                                      );
                                      return ClonedEACT;
                                    });
                                  }
                                );
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
                    onClick={() => {
                      setAddedCakeTiles(EditableAddedCakeTiles);
                    }}
                  >
                    Preview
                  </button>
                  <button
                    className="btn btn-color-design1 opac"
                    onClick={() => {
                      setAddedCakeTiles([], () =>
                        setAddedCakeTiles(() => {
                          return AddedCakeTiles.filter(
                            (ADCT) => ADCT.id !== ACKT.id
                          );
                        })
                      );
                      setEditableAddedCakeTiles(
                        EditableAddedCakeTiles.filter(
                          (EADCT) => EADCT.id !== ACKT.id
                        )
                      );
                      setAdminCakes(
                        AdminCakes.filter((AC) => AC.id !== ACKT.id)
                      );
                    }}
                  >
                    Delete '{ACKT.Name}'{" "}
                    <span style={{ color: "var(--bs-red)", marginLeft: "5px" }}>
                      &#215;
                    </span>
                  </button>
                </div>
              </div>
            ))
          : null}
        <CakeTilesAdmin
          Cakes={Cakes}
          setRCakes={setRCakes}
          AdminCakes={AdminCakes}
          setAdminCakes={setAdminCakes}
          encodeImageFileAsURL_CakeTilesAdmin={
            encodeImageFileAsURL_CakeTilesAdmin
          }
        />
      </div>
    </>
  );
};

export default Admin;
