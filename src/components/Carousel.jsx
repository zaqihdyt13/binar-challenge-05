import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlinePlayCircle } from "react-icons/ai";

function CarouselHome() {
  return (
    <Carousel controls={false}>
      <Carousel.Item>
        <div className="hero1">
          <div className="bg-home-filter">
            <div className="hero-content w-50 my-5 px-4 pb-5 d-flex flex-column justify-content-center">
              <h1 className="fs-1 fw-bold text-white mb-0 ">
                Doctor Strange in the Multiverse of Madness
              </h1>
              <p className="text-white fs-6 mt-5 mb-4">
                Journey into the unknown with Doctor Strange, with the help of
                mystical allies both old and new, across the confusing and
                dangerous alternate realities of the Multiverse to confront a
                mysterious new enemy.
              </p>
              <button className="btn-trailer d-flex justify-content-center align-items-center gap-1 border border-0 rounded-5">
                <AiOutlinePlayCircle className="play-icons fs-5 fw-bold" />
                <span className="fw-bold">WATCH TRAILER</span>
              </button>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="hero2">
          <div className="bg-home-filter">
            <div className="hero-content w-50 my-5 px-4 pb-5 d-flex flex-column justify-content-center">
              <h1 className="fs-1 fw-bold text-white mb-0 ">Jurassic World</h1>
              <p className="text-white fs-6 mt-5 mb-4">
                A safari park containing genetically engineered dinosaurs is in
                an uproar when one of the dinosaurs escapes from its cage. An
                animal expert and former military man tries to save everyone.
              </p>
              <button className="btn-trailer d-flex justify-content-center align-items-center gap-1 border border-0 rounded-5">
                <AiOutlinePlayCircle className="play-icons fs-5" />
                <span className="fw-bold">WATCH TRAILER</span>
              </button>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="hero3">
          <div className="bg-home-filter">
            <div className="hero-content w-50 my-5 px-4 pb-5 d-flex flex-column justify-content-center">
              <h1 className="fs-1 fw-bold text-white mb-0 ">
                Spiderman No Way Home
              </h1>
              <p className="text-white fs-6 mt-5 mb-4">
                For the first time in Spider-Mans screen history, the true
                identity of this friendly hero is revealed, making his
                responsibilities as a superpowered person clash with his normal
                life, and putting everyone closest to him in the most threatened
                position.
              </p>
              <button className="btn-trailer d-flex justify-content-center gap-1 align-items-center gap-1 border border-0 rounded-5">
                <AiOutlinePlayCircle className="play-icons fs-5" />
                <span className="fw-bold">WATCH TRAILER</span>
              </button>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;
