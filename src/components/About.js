const About = () => {
  return (
    <>
      <div className="about-banner w-100 d-flex justify-content-center">
        <img
          src="./img/About-banner.jpg"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "200px",
            objectPosition: "bottom",
            bottom: 0,
          }}
          alt="AboutBanner"
        />
      </div>
      <main className="p-3 d-block mx-auto text-center">
        <h1
          style={{
            color: "var(--color-design1)",
            fontWeight: "600",
            fontSize: "32px",
          }}
        >
          About Us
        </h1>
        <p style={{ fontWeight: "500" }}>
          We sell varieties of cake and breads considering our clients'
          preferences.
        </p>
        <img
          src="./img/logo_noree.jpg"
          style={{ borderRadius: "50%", width: "90%", maxWidth: "120px" }}
          alt=""
        />
      </main>
    </>
  );
};

export default About;
