import React, { useState } from "react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import InputText from "../../../components/atom/input-text";
import debounce from "../../../helpers/utils/debounce";
import usePhotos from "../hooks/use-photos";
export default function PhotosSearch() {
  const [inputValue, setInputValue] = useState("");
  const { filters } = usePhotos();

  const debouncedSetValue = React.useCallback(
    debounce((value: string) => {
      filters.setQ(value);
    }, 200),
    [filters.setQ]
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    console.log("Searching photos for:", value);
    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <div>
      <InputText
        aria-label="Buscar fotos"
        icon={SearchIcon}
        placeholder="Buscar fotos..."
        className="flex-1"
        onChange={handleInputChange}
        value={inputValue}
      />
    </div>
  );
}
