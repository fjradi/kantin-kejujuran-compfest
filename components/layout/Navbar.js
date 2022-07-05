import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex sticky top-0 z-99 items-center justify-between flex-wrap bg-blue-500 p-6">
      <Link href="/">
        <a>
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Image
              className="fill-current h-8 w-8 mr-2"
              src="/logo.svg"
              height="54"
              width="54"
            />
            <span className="font-semibold text-xl tracking-tight">
              Kantin Kejujuran
            </span>
          </div>
        </a>
      </Link>
      <div className="w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto">
        <Link href="/manage">
          <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
            Manage Canteen
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
