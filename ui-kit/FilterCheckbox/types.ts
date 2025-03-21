type FilterOption = {
  id: string;
  name: string;
  url: string;
  checked?: boolean;
  color?: string;
  ImageUrl?: string;
};

enum FilterCheckboxSize {
  Small,
  Big,
}

export { FilterCheckboxSize };
export type { FilterOption };
