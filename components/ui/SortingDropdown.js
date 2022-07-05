import styles from "./SortingDropdown.module.css";
import { useState, useEffect } from "react";
import SortingItem from "./SortingItem";

const SortingDropdown = ({onSortHandler}) => {
  const [selectedSort, setSelectedSort] = useState(0);

  useEffect(() => {
    onSortHandler(selectedSort);
  }
  , [selectedSort]);

  return (
    <div className={`${styles.dropdown} inline-block relative`}>
      <button className="bg-white text-gray-700 font-semi-bold py-2 px-4 rounded inline-flex items-center">
        <span className="mr-2">Sort by</span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
      <ul
        className={`${styles["dropdown-menu"]} absolute hidden text-gray-700 pt-1`}
      >
        <SortingItem
          label="Name A-Z"
          isSelected={selectedSort === 0}
          onClickHandler={() => setSelectedSort(0)}
        />
        <SortingItem
          label="Name Z-A"
          isSelected={selectedSort === 1}
          onClickHandler={() => setSelectedSort(1)}
        />
        <SortingItem
          label="Price Low to High"
          isSelected={selectedSort === 2}
          onClickHandler={() => setSelectedSort(2)}
        />
        <SortingItem
          label="Price High to Low"
          isSelected={selectedSort === 3}
          onClickHandler={() => setSelectedSort(3)}
        />
        
      </ul>
    </div>
  );
};

export default SortingDropdown;
