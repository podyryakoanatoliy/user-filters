import { useId, useState } from "react";

import Icon from "@/components/Icon/Icon";

import css from "./SelectComponent.module.css";

interface Option {
  name: string;
  value: string;
}

interface SelectComponentProps {
  isCheckBox?: boolean;
  array: Option[];
  placeholder: string;
  modal?: boolean;
  onSelect?: (value: string) => void;
  value?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export default function SelectComponent({
  isCheckBox = false,
  array,
  placeholder,
  modal,
  onSelect,
  value,
  onChange,
  disabled = false,
}: SelectComponentProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  const href = isOpen
    ? { name: "icon-chevron-up", className: "chevronUp" }
    : { name: "icon-chevron-down", className: "chevronDown" }; // Ромич, лишаю спеціально тут коментар, такі вирази практикуються? Щоб не писати в пропсі саму умову?

  const handleSelect = (item: Option) => {
    if (!isCheckBox) {
      onChange?.(item);
      setIsOpen(false);
      if (onSelect) onSelect(item.value);
    } else {
      const safeValue = Array.isArray(value) ? value : [];
      const isSelected = safeValue.some((i: Option) => i.value === item.value);
      const nextValue = isSelected
        ? safeValue.filter((i: Option) => i.value !== item.value)
        : [...safeValue, item];

      onChange?.(nextValue);
    }
  };

  const renderOptionsCheckboxes = (item: Option) => {
    const isChecked =
      isCheckBox &&
      Array.isArray(value) &&
      value.some((i: Option) => i.value === item.value);
    if (isCheckBox) {
      return (
        <div className={css.checkboxItem}>
          <input
            id={item.value}
            type="checkbox"
            className={css.customCheckbox}
            checked={isChecked}
            readOnly
          />
          <label
            htmlFor={item.value}
            className={css.itemName}
            onClick={(e) => e.preventDefault()}
          >
            {item.name}
          </label>
        </div>
      );
    }
    return (
      <div className={css.singleItem}>
        <span className={css.itemName}>{item.name}</span>
      </div>
    );
  };
  const displayValue = () => {
    if (isCheckBox) {
      return Array.isArray(value) && value.length > 0
        ? `Selected (${value.length})`
        : placeholder;
    }
    if (typeof value === "string") {
      const found = array.find((a) => a.value === value);
      return found ? found.name : placeholder;
    }
    return value?.name ? value.name : placeholder;
  };

  return (
    <div
      className={`${modal ? css.modalSelect : css.selectWrapper} ${disabled ? css.disabled : ""}`}
    >
      <div
        className={modal ? css.modalHeader : css.selectHeader}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={css.placeholder}>{displayValue()}</span>
        <Icon href={href} />
      </div>
      {isOpen && !disabled && (
        <ul className={css.optionsList}>
          {array.map((item) => (
            <li
              key={item.value}
              className={css.optionItem}
              onClick={() => handleSelect(item)}
            >
              {renderOptionsCheckboxes(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
