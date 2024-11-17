import Link from "next/link";

function Admin() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold ">This is Admin Dashboard Page</h1>
      <Link href="/admin/add-products">
        <button
          type="button"
          className="px-6 py-2 rounded-full bg-gray-700 hover:bg-gray-800 hover:drop-shadow-xl "
        >
          Add Product
        </button>
      </Link>
    </div>
  );
}

export default Admin;
