const fetchCakes = async () => {
  const res = await fetch(
    "https://api.jsonbin.io/v3/b/6201c5ec69b72261be542a7a",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key":
          "$2b$10$3UaB99VS1SOgUt.AEkuDdOewkf6QIpWd1O8YM4BB9wgHlDX9Fvhg.",
      },
    }
  );
  const data = await res.json(res);
  return data.record;
};

export default fetchCakes;
