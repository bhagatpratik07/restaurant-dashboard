import { useState, useEffect } from "react";
import Map from "./Map";

type Restaurant = {
  name: string;
};

const SearchBar = () => {
  // Set up state for the input value and restaurant suggestions
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Restaurant[]>([]);
  // Set up state for the list of selected restaurants and error messages
  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>(
    []
  );
  const [error, setError] = useState("");

  // Fetch restaurant data from Airtable on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?view=Grid%20view",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data.records);

        // Map the response data to the expected format
        const restaurants: Restaurant[] = data.records.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (record: any) => ({
            id: record.id,
            name: record.fields.Name,
          })
        );
        // Set the suggestions state to the list of restaurants fetched from Airtable
        setSuggestions(restaurants);
      } catch (error) {
        console.error(error);
        setError("Error fetching suggestions");
      }
    };
    fetchRestaurants();
  }, []);

  // Handle changes to the input value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Handle selecting a suggestion from the dropdown
  const handleSelect = (restaurant: Restaurant) => {
    setSearchText(restaurant.name);
  };

  // Handle adding a restaurant to the list of selected restaurants
  const handleAdd = (restaurant: Restaurant) => {
    setSelectedRestaurants((prevRestaurants) => [
      ...prevRestaurants,
      restaurant,
    ]);
  };

  // Filter the list of restaurant suggestions based on the current input value
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().startsWith(searchText.toLowerCase())
  );

  return (
    <div>
      <label htmlFor="restaurant-search">Search for a restaurant: </label>
      <input
        type="text"
        id="restaurant-search"
        value={searchText}
        onChange={handleChange}
        list="restaurant-suggestions"
      />
      <datalist id="restaurant-suggestions">
        {filteredSuggestions.map((suggestion) => (
          <option
            key={suggestion.name}
            value={suggestion.name}
            onClick={() => {
              handleSelect(suggestion);
            }}
          />
        ))}
      </datalist>
      <button
        onClick={() => {
          handleAdd({ name: searchText });
          setSearchText("");
        }}
      >
        Add
      </button>

      {selectedRestaurants.map((restaurant, index) => (
        <Map key={index} restaurantName={restaurant.name} />
      ))}

      {error && <div>{error}</div>}
    </div>
  );
};

export default SearchBar;
