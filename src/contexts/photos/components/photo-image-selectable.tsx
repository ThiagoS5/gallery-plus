import { useId, useState } from "react";
import { tv } from "tailwind-variants";
import ImagePreview from "../../../components/molecules/image-preview";
import InputCheckbox from "../../../components/molecules/input-checkbox";

export const photoImageSelectableVariants = tv({
  base: `rounded-lg relative cursor-pointer `,
  variants: {
    select: {
      true: "outline-2 outline-accent-brand",
    },
  },
});

interface photoImageSelectableProps
  extends React.ComponentProps<typeof ImagePreview> {
  selected?: boolean;
  onSelectImage?: (selected: boolean) => void;
}
export default function photoImageSelectable({
  selected,
  className,
  onSelectImage,
  ...props
}: photoImageSelectableProps) {
  const [isSelected, setIsSelected] = useState(selected);
  const checkboxId = useId();
  function handleSelect() {
    const newValue = !isSelected;
    setIsSelected(newValue);
    onSelectImage?.(newValue);
  }
  return (
    <label
      htmlFor={checkboxId}
      className={photoImageSelectableVariants({
        className,
        select: isSelected,
      })}
    >
      <InputCheckbox
        id={checkboxId}
        size="sm"
        defaultChecked={isSelected}
        onChange={handleSelect}
        className="absolute top-1 left-1"
      />
      <ImagePreview {...props} />
    </label>
  );
}
