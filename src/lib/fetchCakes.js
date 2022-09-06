const fetchCakes = async () => {
  console.log();
  const res = await fetch(process.env.REACT_APP_NOT_SECRET_CODE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json(res);
  return data;
};

export default fetchCakes;
