const Button = ({ onClickHandler, disabled, children }) => {
  return (
    <button disabled={disabled} type="submit" onClick={onClickHandler} className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none">
      {children}
    </button>
  );
};

export default Button;
