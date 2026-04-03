import { useState } from "react";
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
}

export default function SelectComponent({
  isCheckBox = false,
  array,
  placeholder,
  modal,
  onSelect,
}: SelectComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);

  const handleSelect = (item: Option) => {
    if (!isCheckBox) {
      setSelectedItem(item);
      setIsOpen(false);
      if (onSelect) onSelect(item.value);
    }
    // логіка з чекбоксом
  };

  return (
    <div className={modal ? css.modalSelect : css.selectWrapper}>
      <div
        className={modal ? css.modalHeader : css.selectHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={css.placeholder}>
          {selectedItem ? selectedItem.name : placeholder}
        </span>
        <svg className={css.icon}>
          <use
            href={
              isOpen
                ? "/icons.svg#icon-chevron-up"
                : "/icons.svg#icon-chevron-down"
            }
          />
        </svg>
      </div>
      {isOpen && (
        <ul className={css.optionsList}>
          {array.map((item) => (
            <li
              key={item.value}
              className={css.optionItem}
              onClick={() => handleSelect(item)}
            >
              {isCheckBox ? (
                <div className={css.checkboxItem}>
                  <input
                    id={item.value}
                    type="checkbox"
                    className={css.customCheckbox}
                  />
                  <label htmlFor={item.value} className={css.itemName}>
                    {item.name}
                  </label>
                </div>
              ) : (
                <div className={css.singleItem}>
                  <span className={css.itemName}>{item.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
