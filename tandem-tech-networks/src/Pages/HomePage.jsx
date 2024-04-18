import Header from "./Header";
import Footer from "./Footer";
import "../modules/HomePage.css";
import carousel1 from "../assets/carousel1.png";
import carousel2 from "../assets/carousel2.png";
import carousel3 from "../assets/carousel3.png";

function Home() {
  return (
    <>
      <Header />
      <div>
        <h1 className="mx-5 pb-3 d-flex justify-content-center">
          Welcome to TandemTech Networks
        </h1>

        <div
          id="carouselExampleSlidesOnly"
          className="container carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="1500">
              <img
                src={carousel1}
                className="d-block w-100"
                alt="tandem-customers"
              ></img>
            </div>
            <div className="carousel-item" data-bs-interval="2500">
              <img
                src={carousel2}
                className="d-block w-100"
                alt="tandem-customers"
              ></img>
            </div>
            <div className="carousel-item" data-bs-interval="3500">
              <img
                src={carousel3}
                className="d-block w-100"
                alt="tandem-customers"
              ></img>
            </div>
          </div>
        </div>

        <div className="container card mt-5">
          <div className="card-header d-flex justify-content-center">
            <strong>We are here for you!</strong>
          </div>
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-center">
              Our Mission
            </h5>
            <p className="card-text d-flex justify-content-center">
              Welcome to Tandem-Tech Networks! We are your gateway to seamless
              connectivity and innovative communication solutions. Join us as we
              redefine connectivity for individuals, businesses, and
              communities.
            </p>
            <a
              href="#"
              className="btn btn-primary d-flex justify-content-center"
            >
              GET STARTED
            </a>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;
