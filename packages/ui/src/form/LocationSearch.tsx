import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { FormInput } from "./FormInput";
import { useState, useEffect } from "react";
import FormError from "./FormError";

interface LocationSearchProps {
  onLocationSelect?: (location: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  initialValue = "",
  placeholder = "Enter Event location",
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue: initialValue,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Set initial value if provided
  useEffect(() => {
    if (initialValue && !value) {
      setValue(initialValue, false);
    }
  }, [initialValue, setValue, value]);

  const handleSelect = (description: string) => () => {
    setValue(description, false);
    clearSuggestions();

    // Notify parent component of the selection
    if (onLocationSelect) {
      onLocationSelect(description);
    }

    // Get coordinates for the selected location
    getGeocode({ address: description })
      .then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("Coordinates: ", { lat, lng });

        // You could also pass coordinates to parent if needed
        // onLocationSelect?.(description, { lat, lng });
      })
      .catch((error) => {
        console.error("Error getting coordinates:", error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Notify parent component of the change
    if (onLocationSelect) {
      onLocationSelect(inputValue);
    }

    // Validate input
    if (inputValue.trim() === "") {
      setErrorMessage("Location cannot be empty");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="relative">
      <FormInput
        value={value}
        onChange={handleInputChange}
        // disabled={!ready}
        placeholder={placeholder}
      />

      {status === "OK" && (
        <ul className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={handleSelect(description)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
            >
              <p className="font-semibold text-lg text-gray-900">
                {description.split(",")[0]}
              </p>
              <p className="text-gray-500 text-sm">
                {description.replace(description.split(",")[0] + ", ", "")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
