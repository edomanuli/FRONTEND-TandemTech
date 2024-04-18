
const Footer = () => {
    const date = new Date();
    return (
      <>
        <div className="footer-container card text-center mt-5 border border-0">
          <div className="card-header fw-semibold fs-3">
            Connect With Us Today
          </div>
          <div className="card-body">
            <div className="contact" id="foot-contact">
              <a href="#" className="btn contact-icon">
                <i className="bi bi-envelope-heart"></i>
              </a>
              <a href="#" className="btn contact-icon" aria-label="X">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="btn contact-icon" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="btn contact-icon" aria-label="Facebook">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
          <div className="card-footer text-body-secondary">
            <h5>&copy; {date.getFullYear()} Tandem Networks</h5>
          </div>
        </div>
      </>
    );
};

export default Footer;