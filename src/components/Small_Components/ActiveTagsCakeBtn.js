const TagsCakeBtn = ({ filterCakesTags, Tags, setActiveCakeTags }) => {
  return (
    <>
      {Tags.map((ATC) => (
        <button key={ATC} className="shadow-sm btn-light ">
          {ATC}
          <span
            onClick={() => {
              setActiveCakeTags(Tags.filter((tag) => tag !== ATC));
            }}
          >
            &#215;
          </span>
        </button>
      ))}
    </>
  );
};

export default TagsCakeBtn;
