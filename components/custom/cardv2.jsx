import Image from "next/image";

export default function Cardv2({ product }) {
  return (
    <div className="relative flex flex-col bg-clip-border rounded-md bg-white text-gray-700  w-full max-w-[30rem] h-auto shadow-gray-900/10 hover:shadow-gray-900/20">
      <div className="relative bg-clip-border rounded-t-md overflow-hidden bg-white text-gray-700 h-[250px] md:h-[300px]">
        <Image
          fill
          sizes="100%"
          src={product.image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="block antialiased font-sans text-base leading-relaxed text-blue-gray-900 font-semibold">
            {product.name}
          </p>
          <p className="block antialiased font-sans text-base leading-relaxed text-blue-gray-900">
            {product.price}$
          </p>
        </div>
        <p className="block antialiased font-sans text-sm leading-normal text-gray-700 font-normal opacity-75">
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
        </p>
      </div>
      <div className="p-4 pt-0">
        <button
          className="bg-black text-white align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
