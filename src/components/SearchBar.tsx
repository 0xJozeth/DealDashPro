import Image from "next/image";

function SearchBar() {
  return (
    <form
      id="searchBar"
      className="neutral-500 mb-4 flex w-[450px] items-center justify-between gap-x-2 rounded-full border bg-white p-2 pl-4 "
    >
      <input
        type="text"
        placeholder="Search by City or State"
        className="text-base-font-normal  w-1/2 border-r border-neutral-200 leading-normal text-neutral-500 focus:outline-none"
      />
      <input
        type="number"
        placeholder="Price"
        className="text-base-font-normal leading-normal focus:outline-none"
      />
      <button type="submit" title="Search">
        <Image
          src="/search1.svg"
          width={32}
          height={32}
          alt="search"
          className="flex items-center justify-center"
        />
      </button>
    </form>
  );
}

export default SearchBar;
