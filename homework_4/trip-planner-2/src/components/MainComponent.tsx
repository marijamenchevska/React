import SearchPage from "./SearchPage";
import PopularCountries from "./PopularCountries";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function MainComponent() {
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="py-5">
      <div className="space-x-2 text-center text-slate-50">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="align-middle" />
        <input
          type="text"
          placeholder="Search country"
          className="focus:outline-none bg-transparent placeholder:text-slate-300 text-sm px-2 py-1.5 border-b"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>

      {searchWord ? (
        <SearchPage searchWord={searchWord} />
      ) : (
        <PopularCountries />
      )}
    </div>
  );
}
