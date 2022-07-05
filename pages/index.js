import SortingDropdown from "../components/ui/SortingDropdown";
import ItemList from "../components/item/ItemList";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Home = ({ items }) => {
  const [data, setData] = useState(items);
  const [selectedSort, setSelectedSort] = useState(0);

  const router = useRouter();
  const showToastOnItemBought = router.query.showToastOnItemBought;

  useEffect(() => {
    if (selectedSort === 0) {
      setData([...items.sort((a, b) => a.name.localeCompare(b.name))]);
    } else if (selectedSort === 1) {
      setData([...items.sort((a, b) => b.name.localeCompare(a.name))]);
    } else if (selectedSort === 2) {
      setData([...items.sort((a, b) => a.price - b.price)]);
    } else if (selectedSort === 3) {
      setData([...items.sort((a, b) => b.price - a.price)]);
    }
  }, [selectedSort]);

  useEffect(() => {
    if (showToastOnItemBought) {
      toast.success("Item bought", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  , [showToastOnItemBought]);

  return (
    <>
      <div className="flex flex-row justify-between py-2">
        <h1 className="text-3xl font-bold">Items on sale!</h1>
        <SortingDropdown onSortHandler={setSelectedSort} />
      </div>
      <ItemList items={data} />
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
    </>
  );
};

const getServerSideProps = async ({query}) => {
  let {sort_by: sortBy, order} = query;
  if (!sortBy) {
    sortBy = "name";
  }
  if (!order) {
    order = "asc";
  }

  const domain = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : process.env.HOST_ADDRESS;
  const res = await fetch(
    `${domain}/api/items?sort_by=${sortBy}&order=${order}`
  );
  const items = (await res.json()).map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    imageUrl: item.imageUrl,
  }));

  return {
    props: { items },
  };
};

export { getServerSideProps };

export default Home;
