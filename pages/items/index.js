import { useRouter } from "next/router";
import { useEffect } from "react";

const ItemList = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return <></>;
};

export default ItemList;
