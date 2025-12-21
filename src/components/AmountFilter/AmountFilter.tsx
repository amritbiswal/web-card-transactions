import {
  filterContainerStyles,
  filterInputFocusStyles,
  filterInputStyles,
  filterLabelStyles,
  errorMessageStyles,
} from "./AmountFilter.styles";

interface AmountFilterProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const AmountFilter = ({ value, onChange, error }: AmountFilterProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div style={filterContainerStyles}>
      <label htmlFor="amount-filter" style={filterLabelStyles}>
        Amount Filter
      </label>
      <input
        id="amount-filter"
        type="text"
        placeholder="Enter minimum amount"
        value={value}
        onChange={handleInputChange}
        min="0"
        step="0.01"
        aria-label="Filter transactions by minimum amount"
        style={filterInputStyles}
        onFocus={(e) => Object.assign(e.target.style, filterInputFocusStyles)}
        onBlur={(e) => Object.assign(e.target.style, filterInputStyles)}
      />
      {error && (
        <span id="amount-filter-error" role="alert" style={errorMessageStyles}>
          {error}
        </span>
      )}
    </div>
  );
};
