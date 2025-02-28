import Header from '../components/Header';
import Welcome from '../components/Welcome';
import bgImg from "/bg_img.png";


const Landing = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <Header />
      <Welcome />
    </div>
  );
}

export default Landing
