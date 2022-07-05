import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItem = () => {
  const [disableButton, setDisableButton] = useState(false);
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const validateName = (value) => value !== "";
  const validatePrice = (value) => value > 0;
  const validateImage = (value) => value !== "";
  const validateDescription = (value) => true;

  const onSubmit = async () => {
    if (!validateName(nameRef.current.value)) return;
    if (!validatePrice(priceRef.current.value)) return;
    if (!validateImage(imageRef.current.value)) return;
    if (!validateDescription(descriptionRef.current.value)) return;

    const data = new FormData();
    data.append("name", nameRef.current.value);
    data.append("price", parseInt(priceRef.current.value));
    data.append("image", imageRef.current.files[0]);
    data.append("description", descriptionRef.current.value);

    setDisableButton(true);

    await fetch("/api/items", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          setDisableButton(false);
          toast.success("Item Added!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          nameRef.current.value = "";
          priceRef.current.value = "";
          imageRef.current.value = "";
          descriptionRef.current.value = "";
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
      <div className="mb-4">
        <Input
          label="Name"
          type="text"
          otherConfig={{ placeholder: "Item name" }}
          errorMessage="Please enter a valid name"
          validateValue={validateName}
          externalRef={nameRef}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Price"
          type="number"
          otherConfig={{ placeholder: "Item price" }}
          errorMessage="Please enter a valid price"
          validateValue={validatePrice}
          externalRef={priceRef}
        />
      </div>
      <div className="mb-3">
        <TextArea
          label="Description"
          otherConfig={{ placeholder: "Item description" }}
          errorMessage=""
          validateValue={validateDescription}
          externalRef={descriptionRef}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Image"
          type="file"
          otherConfig={{ placeholder: "Item image" }}
          errorMessage="Please enter a valid image"
          validateValue={validateImage}
          externalRef={imageRef}
        />
      </div>
      <div className="flex flex-row justify-end">
        <Button disabled={disableButton} onClickHandler={onSubmit}>
          {disableButton ? "Adding" : "Add"}
        </Button>
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

export default AddItem;
