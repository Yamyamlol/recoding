import Header from "../components/Header";
import bgImg from "/bg_img.png";

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {" "}
      <Header />
      <nav className="w-[50%] flex justify-between items-center hover:sca p-4 sm:px-24 absolute top-0">
        <a href="">flashcards</a>
        <a href="">rapidfire</a>
        <a href="">bookmarks</a>
      </nav>
    </div>
  );
};

export default Home;
