import "../modules/testimonials.css";

const testimonials = [
  {
    id: 1,
    author: "Mary Poppins",
    rating: 5,
    text:"TandemTech has transformed our business with their cutting-edge solutions. Highly recommend their dedicated services!"
  },
  {
    id: 2,
    author: "Jonathan Smith",
    rating: 4,
    text: "Great service and impressive technical support. TandemTech is reliable and always there when you need them!"
  },
  {
    id: 3,
    author: "Alice Ludvigsen",
    rating: 5,
    text: "From seamless setup to continuous support, TandemTech has been fantastic. Their team really cares about their customers' needs."
  },
  {
    id: 4,
    author: "Chrissy Teigen",
    rating: 4,
    text: "TandemTech has been a game-changer for our business. Their services have helped us streamline our operations and increase productivity."
  }
];

const Testimonials = () => {
    return (
      <>
        <div className="testimonials-container">
          <h2 className="text-center">Customer Testimonials</h2>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial">
              <div className="stars">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </>
    );
};

export default Testimonials;