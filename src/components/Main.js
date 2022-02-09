import OurCommunityResponse from "./Main_Components/our_cmty_rps";
import SpecialCakes from "./Main_Components/special_cakes";

const Main = ({ Cakes }) => {
  return (
    <main className="px-4 d-block mx-auto mb-5">
      <OurCommunityResponse />
      <SpecialCakes Cakes={Cakes} />
    </main>
  );
};

export default Main;
