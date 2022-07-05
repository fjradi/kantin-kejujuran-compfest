import Button from "../ui/Button";
import { useRouter } from "next/router";

const ItemDetail = ({ id, name, price, imageUrl, description }) => {
  const router = useRouter();

  const onBuyHandler = () => {
    fetch(`/api/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          router.push({
            pathname: "/",
            query: { showToastOnItemBought: true },
          });
        } else {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log("An unexpected error happened occurred:", err.message);
      });
  };

  return (
    <div className="h-96 rounded overflow-hidden shadow-lg flex flex-row">
      <img className="max-w-lg object-cover" src={imageUrl} />
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p>{description}</p>
        <p className="text-gray-700 text-base">{price}</p>
        <Button onClickHandler={onBuyHandler}>Buy</Button>
      </div>
    </div>
  );
};

export default ItemDetail;
