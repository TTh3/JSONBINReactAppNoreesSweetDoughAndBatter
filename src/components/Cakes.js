// import { Component } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Img } from "react-image";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import ActiveTagsCakeBtn from "./Small_Components/ActiveTagsCakeBtn";
import TagsCakeInsBtn from "./Small_Components/TagsCakeInsBtn";
import CakeTiles from "./Small_Components/CakeTiles";

// TODO: If Active Cake Tags Button is clicked get rid of it
const Cake = ({
  Cakes,
  BackupCakes,
  setBackupCakes,
  // ActiveCakeTags,
  // setActiveCakeTags,
  AreCakesLoading,
}) => {
  const location = useLocation();
  // const [Cakes, setCakes] = useState([]);
  // const [BackupCakes, setBackupCakes] = useState([]);
  const [CakeTags, setCakeTags] = useState([]);
  const [ActiveCakeTags, setActiveCakeTags] = useStateWithCallbackLazy([]);
  const [SearchCakes, setSearchCakes] = useState("");
  // const [ObjectCakesValues, setObjectCakesValues] = useState([]);
  // const [AreCakesLoading, setAreCakesLoading] = useState("Loading Cakes...");
  const [SeeMoreCakesModal, setSeeMoreCakesModal] = useState({
    Name: "Cake Loading...",
    "Image Link": "",
    Description: "Description Loading...",
    Price: "Price Loading...",
    Tags: "Tags Loading...",
  });
  const filterCakesTags = async () => {
    if (!ActiveCakeTags.length) {
      setBackupCakes(Cakes);
      return;
    }
    let StoreActiveCakeTags = [];
    setBackupCakes([]);
    for (const ACTs of ActiveCakeTags)
      StoreActiveCakeTags.push(
        ...(await Cakes.filter(
          (cake) =>
            cake.Tags.toLowerCase().includes(ACTs.toLowerCase()) ||
            cake.Name.toLowerCase().includes(ACTs.toLowerCase()) ||
            cake.Description.toLowerCase().includes(ACTs.toLowerCase())
        ))
      );
    setBackupCakes(StoreActiveCakeTags);
  };
  const FuncCakeTags = async (GroupCakes) => {
    GroupCakes.map((cake) =>
      // cake.Tags.split(",").map((Caketag, i) => Caketag),
      cake.Tags.split(",").map(
        (Caketag) =>
          !CakeTags.includes(Caketag) && setCakeTags([...CakeTags, Caketag])
      )
    );
  };
  const HandleACTsInURL = async () => {
    if (location.search !== "") {
      if (location.search.includes("+")) {
        location.search.split("+").map((CSearcher) => {
          // const cakeSearcher = CSearcher;
          CSearcher.includes("?") && (CSearcher = CSearcher.substring(1));
          CSearcher.includes("%20") && (CSearcher = decodeURI(CSearcher));
          return (
            CSearcher !== "" &&
            !ActiveCakeTags.includes(CSearcher) &&
            setActiveCakeTags((currentTag) => [...currentTag, CSearcher])
          );
        });
      } else {
        let slicedSearchLocation = location.search.slice(1);
        slicedSearchLocation.includes("?") &&
          (slicedSearchLocation = slicedSearchLocation.substring(1));
        slicedSearchLocation.includes("%20") &&
          (slicedSearchLocation = decodeURI(slicedSearchLocation));
        !ActiveCakeTags.includes(slicedSearchLocation) &&
          setActiveCakeTags((currentTag) => [
            ...currentTag,
            slicedSearchLocation,
          ]);
      }
    }
  };
  useEffect(() => {
    HandleACTsInURL();
    // eslint-disable-next-line
  }, [Cakes]);

  useEffect(() => {
    filterCakesTags();
    // eslint-disable-next-line
  }, [ActiveCakeTags]);
  const ModalSeeMoreCake = async (MCakeInfo) => {
    setSeeMoreCakesModal(MCakeInfo);
  };
  const ToggleShowAllCakes = async (Cakes) => {
    setActiveCakeTags(() => {
      setBackupCakes(Cakes);
      return [];
    });
  };
  const SearchCake = async () => {
    if (SearchCakes === "" || SearchCakes.toLocaleLowerCase() === "all") {
      ToggleShowAllCakes(() => {
        setSearchCakes("");
        return Cakes;
      });
    } else if (!ActiveCakeTags.includes(SearchCakes)) {
      setActiveCakeTags((currentTag) => {
        setSearchCakes("");
        return [...currentTag, SearchCakes];
      });
    }
  };
  FuncCakeTags(Cakes);
  return (
    <>
      <div
        className="modal fade"
        id="MoreCakeTags"
        tabIndex="-1"
        aria-labelledby="MoreCakeTagsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="MoreCakeTagsLabel">
                Other Cake Tags
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              {CakeTags.length > 10 &&
                JSON.parse(JSON.stringify(CakeTags))
                  .slice(10, CakeTags.length)
                  .sort((a, b) =>
                    a.toLowerCase().localeCompare(b.toLowerCase())
                  )
                  .map((OCTs) => (
                    <button
                      key={"MODAL_btn" + OCTs}
                      className="btn btn-color-design1 m-1 opac"
                      onClick={() => {
                        console.log(CakeTags.length);
                        if (!ActiveCakeTags.includes(OCTs)) {
                          setActiveCakeTags((currentTag) => [
                            ...currentTag,
                            OCTs,
                          ]);
                        }
                      }}
                    >
                      {OCTs}
                    </button>
                  ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="NoreesCakeSeeMoreModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{SeeMoreCakesModal["Name"]}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="NoreesCakeSeeMoreModal_MB container-fluid p-3 d-block">
              <Img
                className="w-100 text-center rounded"
                src={SeeMoreCakesModal["Image Link"]}
                unloader={
                  <img
                    src="./img/Background_SpecialCakes.png"
                    className="w-100 text-center rounded"
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
                alt={SeeMoreCakesModal["Name"]}
              />
              <p>
                <span>Description: </span>
                {SeeMoreCakesModal["Description"]}
              </p>
              <p>
                <span>Price: </span>
                {SeeMoreCakesModal["Price"]}
              </p>
              <p>
                <span>Tags: </span>
                {SeeMoreCakesModal["Tags"]
                  .split(",")
                  .sort()
                  .map((tag) => (
                    <button
                      className="btn btn-sm btn-color-design1 opac"
                      key={"SMCM" + tag}
                    >
                      {tag}
                    </button>
                  ))}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="cake_wrapper row w-100 mx-0">
        <div className="col-lg-3 text-center px-0 py-3">
          <div
            className="cake_wrapper_tags_container"
            style={{
              justifyContent: CakeTags.length > 4 ? "center" : "space-between",
              flexDirection: CakeTags.length > 4 ? "column" : "row",
            }}
          >
            <p className="border-bottom pb-3">Tags</p>
            <div className="cake_tags px-2">
              <button
                onClick={() => {
                  ToggleShowAllCakes(Cakes);
                }}
              >
                All
              </button>
              <TagsCakeInsBtn
                setACakeTags={setActiveCakeTags}
                ACakeTags={ActiveCakeTags}
                CakeTags={CakeTags}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-9 border-start p-0">
          <div className="cake_nav row m-0 align-items-center ">
            <div className="col-lg search_cake_nav d-flex">
              <button
                className={
                  SearchCakes === ""
                    ? "btn btn-color-design1 opac me-1"
                    : "btn btn-color-design1-hover opac me-1"
                }
                onClick={() => {
                  SearchCake();
                }}
              >
                Search
              </button>
              <input
                type="text"
                className="form-control w-50"
                placeholder="Search Cake"
                value={SearchCakes}
                onKeyUp={(e) => e.keyCode === 13 && SearchCake()}
                onChange={(e) => setSearchCakes(e.target.value)}
              />
            </div>
            <div
              className="col-lg tags_cake_nav_wrapper d-flex align-items-center"
              style={{
                flexDirection: ActiveCakeTags.length > 3 ? "column" : "row",
              }}
            >
              <div className="tags_cake_nav_title">
                Active Tags: (<b>{ActiveCakeTags.length}</b>)
              </div>
              <div className="tags_cake_nav ">
                <ActiveTagsCakeBtn
                  setBackupCakes={setBackupCakes}
                  BackupCakes={BackupCakes}
                  Tags={ActiveCakeTags}
                  filterCakesTags={filterCakesTags}
                  setActiveCakeTags={setActiveCakeTags}
                />
              </div>
            </div>
          </div>
          <div
            className="cake_content_wrapper position-relative p-4 mt-4"
            style={{ display: BackupCakes.length === 0 ? "block" : "grid" }}
          >
            {BackupCakes.length ? (
              <div className="cakes_num position-absolute">
                <span>{BackupCakes.length}</span> Cakes are shown
              </div>
            ) : null}
            <h2
              style={{
                display: BackupCakes.length === 0 ? "flex" : "none",
                justifyContent: "center",
                textAlign: "center",
                color: "var(--color-main-hover)",
              }}
            >
              {AreCakesLoading}{" "}
              {AreCakesLoading === "No Cakes to Display..." && (
                <button
                  onClick={() => ToggleShowAllCakes(Cakes)}
                  style={{
                    fontSize: "16px",
                    color: "var(--color-design2)",
                    fontWeight: "600",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  (show all)
                </button>
              )}
            </h2>
            <CakeTiles
              ModalSeeMoreCake={ModalSeeMoreCake}
              Cakes={BackupCakes}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cake;
