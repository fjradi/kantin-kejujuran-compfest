import ItemDetail from "../../components/item/ItemDetail";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Item = () => {
  const router = useRouter();
  const { itemId } = router.query;

  const [item, setItem] = useState({});

  useEffect(() => {
    if (!router.isReady) return;
    fetch(`/api/items/${itemId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [router.isReady]);

  return (
    <div className="flex h-full">
      <div className="m-auto">
        <ItemDetail {...item} />
      </div>
    </div>
  );
};

export default Item;
