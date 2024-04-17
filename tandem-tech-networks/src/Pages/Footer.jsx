
const Footer = () => {
    const date = new Date();
    return (
        <footer>
            <p>&copy; {date.getFullYear()} Tandem Networks</p>
        </footer>
    );
};

export default Footer;