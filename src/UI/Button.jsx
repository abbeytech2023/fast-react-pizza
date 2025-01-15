import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "bg-yellow-500 text-sm disabled:cursor-not-allowed uppercase font-semibold text-stone-800  tracking-wide inline-block rounded-full focus:outline-none focus:ring focus:ring-yellow-300  focus:ring-offset-2 hover:bg-yellow-300 transition-all duration-300 ";

  const styles = {
    primary: base + " px-4 py-3 sm:px-6 md:py-4",

    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-xs",
    secondary:
      "border-2 border-stone-300 text-sm focus:ring-stone-200 px-4  sm:px-6 md:py-3.5 hover:bg-stone-300 hover:text-stone-800 disabled:cursor-not-allowed uppercase font-semibold text-stone-800  tracking-wide inline-block rounded-full focus:outline-none py-2.5 focus:ring focus:ring-yellow-300  focus:ring-offset-2 hover:bg-yellow-300 transition-all duration-300 ",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        type="small"
        onClick={onClick}
        disabled={disabled}
        className={styles[type]}
      >
        {children}
      </button>
    );
  return (
    <button to={to} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
