import Button from "../ui/Button";
import Input from "../ui/Input";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawBalance = ({ onAddHandler }) => {
  const balanceToBeWithdrawnRef = useRef();
  const validateBalanceToBeWithdrawn = (value) => value > 0;

  const onSubmit = async () => {
    if (!validateBalanceToBeWithdrawn(balanceToBeWithdrawnRef.current.value))
      return;

    await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: -parseInt(balanceToBeWithdrawnRef.current.value),
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          onAddHandler();
          toast.success("Balance Withdrawn!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          balanceToBeWithdrawnRef.current.value = 0;
        } else {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log("An unexpected error happened occurred:", err.message);
      });
  };

  return (
    <div>
      <Input
        label="Withdraw Balance"
        type="number"
        otherConfig={{ placeholder: "Amount to be withdrawn" }}
        errorMessage="Please enter a valid amount"
        validateValue={validateBalanceToBeWithdrawn}
        externalRef={balanceToBeWithdrawnRef}
      />
      <div className="my-4 flex flex-row justify-end">
        <Button onClickHandler={onSubmit}>Withdraw</Button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default WithdrawBalance;
