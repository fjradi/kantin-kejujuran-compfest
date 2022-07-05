import Image from "next/image";

const SettingItem = ({ title, icon, onClickHandler, isSelected }) => {
  return (
    <li
      className={`${
        isSelected ? "bg-slate-300" : "bg-white"
      } hover:bg-slate-300 items-center px-4 py-2 first:pt-4 last:pb-4`}
    >
      <button className="flex flex-row" onClick={onClickHandler}>
        <Image src={icon} width={24} height={24} />
        <p className="ml-2">{title}</p>
      </button>
    </li>
  );
};

export default SettingItem;
