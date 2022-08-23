const EditfetchCakes = async (AdminCakes, setAdminCCResponse) => {
  var ClonedCAC = JSON.parse(JSON.stringify(AdminCakes));
  // eslint-disable-next-line
  ClonedCAC.map((CAC, i) => {
    CAC.id = i;
  });
  fetch(process.env.REACT_APP_NOT_SECRET_CODE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 2: ClonedCAC }),
  })
    .then((response) => {
      setAdminCCResponse(["block", "Cakes Updating...", "block"]);
      return response;
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
