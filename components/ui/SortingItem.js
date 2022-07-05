const SortingItem = ({ label, isSelected, onClickHandler }) => {
  return (
    <li>
      <a
        className={`${
          isSelected ? "bg-gray-200" : "bg-white"
        }  hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
        href="#"
        onClick={onClickHandler}
      >
        {label}
      </a>
    </li>
  );
};

export default SortingItem;
