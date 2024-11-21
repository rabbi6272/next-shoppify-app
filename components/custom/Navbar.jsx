import Link from "next/link";
export function Navbar() {
  return (
    <nav className="flex items-center justify-center gap-8">
      <Link
        className="px-6 py-2 rounded-full hover:bg-grey-800 hover:drop-shadow-xl "
        href="/"
      >
        Home
      </Link>
      <Link
        className="px-6 py-2 rounded-full  hover:bg-grey-800 hover:drop-shadow-xl "
        href="/about"
      >
        About
      </Link>
      <Link
        className="px-6 py-2 rounded-full  hover:bg-grey-800 hover:drop-shadow-xl "
        href="/products"
      >
        Products
      </Link>
      <Link
        className="px-6 py-2 rounded-full  hover:bg-grey-800 hover:drop-shadow-xl "
        href="/admin/admin-login"
      >
        Login
      </Link>
    </nav>
  );
}
