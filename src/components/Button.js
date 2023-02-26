import { Link } from "react-router-dom";

export const Button = ({
  title,
  styles,
  type,
  icon,
  btnStyle,
  disabled,
  behavior,
  to,
  action,
  handleClick,
}) => {
  return (
    <>
      {behavior === "link" ? (
        <Link
          type={type}
          style={styles}
          to={to}
          className={`rounded-full  text-md-xs m-2 font-semibold inline-block text-center  ${
            btnStyle === "cyan-outline"
              ? "border-2 py-2 px-4 border-cyan-800 text-cyan-800 bg-white hover:shadow-md hover:shadow-slate-500  w-32"
              : btnStyle === "cyanBg"
              ? "border-2 py-2 px-4 border-cyan-800 text-white bg-cyan-800 hover:shadow-md hover:shadow-slate-500 w-32"
              : btnStyle === "plain-icon"
              ? "hover:shadow-md hover:shadow-slate-500"
              : ""
          } `}
          disabled={disabled}
        >
          {icon}
          {title}
        </Link>
      ) : action === "noClickAction" ? (
        <button
          type={type}
          style={styles}
          className={`rounded-full  text-md-xs text-center m-2 font-semibold  ${
            btnStyle === "cyan-outline"
              ? "border-2 py-2 px-4 border-cyan-800 text-cyan-800 bg-white hover:shadow-md hover:shadow-slate-500  w-32"
              : btnStyle === "cyanBg"
              ? "border-2 py-2 px-4 border-cyan-800 text-white bg-cyan-800 hover:shadow-md hover:shadow-slate-500 w-32"
              : btnStyle === "plain-icon"
              ? "hover:shadow-md hover:shadow-slate-500"
              : ""
          } `}
          disabled={disabled}
        >
          {icon}
          {title}
        </button>
      ) : (
        <button
          type={type}
          style={styles}
          className={`rounded-full text-center  text-md-xs m-2 font-semibold  ${
            btnStyle === "cyan-outline"
              ? "border-2 py-2 px-4 border-cyan-800 text-cyan-800 bg-white hover:shadow-md hover:shadow-slate-500  w-32"
              : btnStyle === "cyanBg"
              ? "border-2 py-2 px-4 border-cyan-800 text-white bg-cyan-800 hover:shadow-md hover:shadow-slate-500 w-32"
              : btnStyle === "plain-icon"
              ? "hover:shadow-md hover:shadow-slate-500"
              : ""
          } `}
          disabled={disabled}
          onClick={handleClick}
        >
          {icon}
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
