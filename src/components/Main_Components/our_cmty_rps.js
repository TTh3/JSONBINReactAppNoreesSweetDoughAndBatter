const our_cmty_rps = () => {
  return (
    <section className="OurCommunityResponse position-relative">
      <div className="norees_main_section__title mb-4 text-center">
        <span>
          OUR COMMUNITY<span>'</span>S <span>RESPONSES</span>
        </span>
      </div>
      <div className="OCR_content row d-flex justify-content-center align-items-center">
        <img
          src="./img/icons/love.png"
          alt="Love PNG"
          className="OCR_absoluteContent__love position-absolute"
        />
        <div className="col-md OCR_content__like">
          <h2>3.3K</h2>
          <p>people liked our services</p>
          <img src="./img/icons/like.png" alt="Like PNG" />
        </div>
        <div className="col-md OCR_content__services">
          <h2>3.4K</h2>
          <p>people follow us</p>
          <img src="./img/icons/followers.png" alt="Followers PNG" />
        </div>
      </div>
    </section>
  );
};

export default our_cmty_rps;
