import ItemCard from "./ItemCard";

const ItemList = ({ items }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default ItemList;
