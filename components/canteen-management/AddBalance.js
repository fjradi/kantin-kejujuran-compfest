import Button from "../ui/Button";
import Input from "../ui/Input";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBalance = ({ onAddHandler }) => {
  const balanceToBeAddedRef = useRef();
  const validateBalanceToBeAdded = (value) => value > 0;
  const onSubmit = async () => {
    if (!validateBalanceToBeAdded(balanceToBeAddedRef.current.value)) return;

    await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseInt(balanceToBeAddedRef.current.value),
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          onAddHandler();
          toast.success("Balance Added!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          balanceToBeAddedRef.current.value = 0;
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
        label="Add Balance"
        type="number"
        otherConfig={{ placeholder: "Amount to be added" }}
        errorMessage="Please enter a valid amount"
        validateValue={validateBalanceToBeAdded}
        externalRef={balanceToBeAddedRef}
      />
      <div className="my-4 flex flex-row justify-end">
        <Button onClickHandler={onSubmit}>Add</Button>
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

export default AddBalance;
