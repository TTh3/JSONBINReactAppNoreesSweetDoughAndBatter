import Iframe from "react-iframe";
const BakeryGoogleMaps = () => {
  return (
    <div className="BakeryGoogleMaps d-block mx-auto position-relative ">
      <div className="BakeryGoogleMaps_gMapsTitle position-absolute start-50 px-3 py-2 translate-middle btn-color-design1-hover">
        OUR LOCATION
      </div>
      <div className="BakeryGoogleMaps_gMapsLogo position-absolute rounded-circle overflow-hidden top-0 end-0 m-2">
        <img
          src="./img/logo_noree.jpg"
          width="80"
          height="80"
          alt="BakeryGoogleMapsLogo"
        />
      </div>
      <div className="BakeryGoogleMaps_gMaps d-flex justify-content-center align-items-center">
        <p>Google Maps Loading...</p>
        <Iframe src="https://maps.google.com/maps?q=Noree's%20Sweet%20Dough%20&%20Batter&t=k&z=17&ie=UTF8&iwloc=&output=embed" />
      </div>
    </div>
  );
};

export default BakeryGoogleMaps;
