import SettingList from "../components/canteen-management/SettingList";
import SettingContent from "../components/canteen-management/SettingContent";
import AddBalance from "../components/canteen-management/AddBalance";
import WithdrawBalance from "../components/canteen-management/WithdrawBalance";
import AddItem from "../components/canteen-management/AddItem";
import { useState } from "react";
import { useUser } from "../lib/hooks";

const CanteenManagement = () => {
  const [refreshBalance, setRefreshBalance] = useState(true);
  const [selectedSetting, setSelectedSetting] = useState(0);

  const user = useUser({ redirectTo: "/login" });

  return (
    <div className="flex h-full">
      {user && (
        <div className="h-[480px] m-auto rounded flex flex-row">
          <div className="mr-8">
            <SettingList
              onChangeHandler={setSelectedSetting}
              settingItems={[
                {
                  title: "Add Balance",
                  icon: "/images/icon-add-balance.png",
                },
                {
                  title: "Withdraw Balance",
                  icon: "/images/icon-withdraw-balance.png",
                },
                {
                  title: "Add Item",
                  icon: "/images/icon-add-item.svg",
                },
              ]}
              refreshBalance={refreshBalance}
            />
          </div>
          <div className="w-[920px]">
            <SettingContent>
              {selectedSetting === 0 && (
                <AddBalance
                  onAddHandler={() => setRefreshBalance(!refreshBalance)}
                />
              )}
              {selectedSetting === 1 && (
                <WithdrawBalance
                  onAddHandler={() => setRefreshBalance(!refreshBalance)}
                />
              )}
              {selectedSetting === 2 && <AddItem />}
            </SettingContent>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanteenManagement;
