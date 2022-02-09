import Iframe from "react-iframe";
const Contact = () => {
  return (
    <div className="contact-banner d-block mx-auto shadow mt-5">
      <div className="contact_us_IframeTitle position-absolute start-50 px-3 py-2 translate-middle btn-color-design1-hover">
        Contact Us
      </div>
      <div className="contact_banner_IframeWrapper">
        <h1>Contact Form Loading...</h1>
        <Iframe src="https://form.jotform.com/jaylord.silverio/norees-sweet-dough-and-batter" />
      </div>
    </div>
  );
};

export default Contact;
