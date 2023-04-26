import { useState, useEffect } from "react";
import Map from "./Map";

type Restaurant = {
  name: string;
};

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
  const [error, setError] = useState("");

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
        const restaurants: Restaurant[] = data.records.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (record: any) => ({
            id: record.id,
            name: record.fields.Name,
          })
        );
        setSuggestions(restaurants);
      } catch (error) {
        console.error(error);
        setError("Error fetching suggestions");
      }
    };
    fetchRestaurants();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setSearchText(restaurant.name);
  };

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
      {searchText && (
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
      )}

      <button
        onClick={() => {
          setSelectedRestaurant(filteredSuggestions[0]);
        }}
      >
        Add
      </button>

      {selectedRestaurant && <Map restaurantName={selectedRestaurant.name} />}

      {error && <div>{error}</div>}
    </div>
  );
};

export default SearchBar;
