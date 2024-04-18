
const Footer = () => {
    const date = new Date();
    return (
      <>
        <footer className="container text-center">
          <p>&copy; {date.getFullYear()} Tandem Networks</p>
        </footer>
      </>
    );
};

export default Footer;