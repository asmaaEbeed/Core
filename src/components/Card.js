import PropTypes from "prop-types";

const Card = (props) => {
  return (
    <>
    <div className="border border-cyan-md-light rounded-lg my-5 md:w-10/12 w-11/12 mx-auto">
      {/* Card title */}
      <div className='bg-cyan-light rounded-tl-lg rounded-tr-lg py-2 px-4 text-cyan-800 border-b border-cyan-md-light font-semibold '>
        {props.title}
      </div>
      {/* Card content */}
      <div className="py-1 px-4">
      {props.children}
      </div>
    </div>
    </>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card
