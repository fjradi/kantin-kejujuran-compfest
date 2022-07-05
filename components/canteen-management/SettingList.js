import Image from "next/image";
import SettingItem from "./SettingItem";
import { useState, useEffect } from "react";

const SettingList = ({ settingItems, onChangeHandler, refreshBalance }) => {
  const [balance, setBalance] = useState(0);
  const [selectedSetting, setSelectedSetting] = useState(0);

  useEffect(() => {
    fetch("/api/transactions?agg=sum", {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.error);
        }
      })
      .then((data) => {
        setBalance(data.balance);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [refreshBalance]);

  useEffect(() => {
    onChangeHandler(selectedSetting);
  }, [selectedSetting]);

  return (
    <div className="bg-white h-full shadow-lg">
      <div className="bg-blue-500 text-white p-4">
        <p>Balance</p>
        <div className="flex flex-row items-center">
          <Image src="/images/icon-balance.svg" height="36" width="36" />
          <p className="text-lg">{`Rp ${balance}`}</p>
        </div>
      </div>
      <ul>
        {settingItems.map((item, index) => (
          <SettingItem
            key={index}
            title={item.title}
            icon={item.icon}
            onClickHandler={() => setSelectedSetting(index)}
            isSelected={selectedSetting === index}
          />
        ))}
        <a href="/api/logout">
          <SettingItem title="Sign Out" icon="/images/icon-sign-out.png" />
        </a>
      </ul>
    </div>
  );
};

export default SettingList;
