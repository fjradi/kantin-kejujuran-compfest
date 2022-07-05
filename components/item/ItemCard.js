import Link from "next/link";

const Item = ({ id, name, imageUrl, price }) => {
  return (
    <Link href={`/items/${id}`}>
        <a>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={imageUrl} />
            <div className="px-6 py-4 bg-white">
              <div className="font-bold text-xl mb-2">{name}</div>
              <p className="text-gray-700 text-base">{`Rp ${price}`}</p>
            </div>
          </div>
        </a>
    </Link>
  );
};

export default Item;
