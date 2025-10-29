import React, { useState } from "react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import InputText from "../../../components/atom/input-text";
import debounce from "../../../helpers/utils/debounce";
export default function PhotosSearch() {
  const [inputValue, setInputValue] = useState("");

  const debouncedSetValue = React.useCallback(
    debounce((value: string) => {
      console.log("Debounced search for:", value);
    }, 500),
    []
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
        icon={SearchIcon}
        placeholder="Buscar fotos..."
        className="flex-1"
        onChange={handleInputChange}
        value={inputValue}
      />
    </div>
  );
}
