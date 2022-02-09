const TagsCakeInsBtn = ({ CakeTags, ACakeTags, setACakeTags }) => {
  return (
    <>
      {
        // eslint-disable-next-line
        JSON.parse(JSON.stringify(CakeTags))
          .slice(0, 10)
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
          .map((CTs) => (
            <button
              key={"btn" + CTs}
              onClick={() => {
                if (!ACakeTags.includes(CTs)) {
                  setACakeTags((currentTag) => [...currentTag, CTs]);
                }
              }}
            >
              {CTs}
            </button>
          ))
      }
      <button
        className={`fw-bold d-${CakeTags.length > 10 ? "inherit" : "none"}`}
        data-bs-toggle="modal"
        data-bs-target="#MoreCakeTags"
      >
        Other Tags
      </button>
    </>
  );
};

export default TagsCakeInsBtn;
