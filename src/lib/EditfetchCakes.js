const EditfetchCakes = async (AdminCakes, setAdminCCResponse) => {
  var ClonedCAC = JSON.parse(JSON.stringify(AdminCakes));
  // eslint-disable-next-line
  ClonedCAC.map((CAC, i) => {
    CAC.id = i;
  }); //61d95f0039a33573b3255962
  fetch(
    "https://api.jsonbin.io/v3/b/6201c5ec69b72261be542a7a/b/6201c5ec69b72261be542a7a",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Bin-Versioning": "false",
        "X-Master-Key": process.env.REACT_APP_JSON_LINK_PUBLIC_KEY,
      },
      body: JSON.stringify(ClonedCAC),
    }
  )
    .then((response) => {
      setAdminCCResponse(["block", "Cakes Updating...", "block"]);
      return response.json();
    })
    .then((data) => {
      if (typeof data === "object") {
        setTimeout(() => {
          setAdminCCResponse(["block", "Success!", "none"]);
          setTimeout(() => {
            setAdminCCResponse(["none", "Success!", "none"]);
            window.location.reload();
          }, 1000);
        }, 1000);
      } else {
        setAdminCCResponse(["block", "Error Updating!", "block"]);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
};

export default EditfetchCakes;
