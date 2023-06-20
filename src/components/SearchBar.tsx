import { useState, useEffect } from "react";
import Map from "./Map";
import Cookies from "js-cookie";
import React from "react";
import "../styles/search.css";

type Restaurant = {
  id: number;
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

  //  Fetch restaurant data from Airtable on component mount
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

  // Load selected restaurants and their maps from cookies on component mount

  // eslint-disable-next-line @typescript-eslint/no-empty-function

  useEffect(() => {
    const selectedRestaurantsCookie = Cookies.get("selectedRestaurants");
    if (selectedRestaurantsCookie) {
      const selectedRestaurants = JSON.parse(selectedRestaurantsCookie);
      setSelectedRestaurants(selectedRestaurants);
    }
  }, []);

  // Save selected restaurants and their maps to cookies whenever the selectedRestaurants state changes
  useEffect(() => {
    Cookies.set("selectedRestaurants", JSON.stringify(selectedRestaurants));
  }, [selectedRestaurants]);

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
  // 1 , 2, 3 <-, 4, 5

  const handleDelete = (index: number) => {
    setSelectedRestaurants((prevRestaurants) => {
      const newRestaurants = [...prevRestaurants];
      newRestaurants.splice(index, 1);
      return newRestaurants;
    });
  };

  // Filter the list of restaurant suggestions based on the current input value
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.name.toLowerCase().startsWith(searchText.toLowerCase())
  );

  return (
    <div className="search-container">
      <div className="search-section">
        <input
          placeholder="Search a restaurant"
          type="text"
          id="restaurant-search"
          required={true}
          value={searchText}
          onChange={handleChange}
          list="restaurant-suggestions"
          className="search-input"
        />
        <datalist id="restaurant-suggestions">
          {filteredSuggestions.map((suggestion) => (
            <option
              className="search-box"
              placeholder="Search"
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
            handleAdd({
              name: searchText,
              id: 0,
            });
            setSearchText("");
          }}
          className="search-button"
        >
          Add
        </button>
      </div>
      <div className="search-result">
        {selectedRestaurants.map((restaurant) => (
          <React.Fragment>
            <Map
              key={`map-${restaurant.id}`}
              restaurantName={restaurant.name}
              deleteRestaurnts={() => handleDelete(restaurant.id)}
              id={restaurant.id}
            />
          </React.Fragment>
        ))}

        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default SearchBar;

// ****** INTERVIEW *******

//       <AutoComplete data={functionFetch} decouncing={800} inputText={3}/>
//         const debounce = (func, timeout = 800) => {
//  let timer: Integer;
//   return (...args: any) {
//     clearTimeout(timer);
//      timer = setTimeout(() => {
//      func.apply(this, args);
//    }, timeout);
//   }
// }
// const processChange = debounce(() => handleChange());
// const [stored, setStored] = useState([]);

// useEffect(() => {
//   if(searchText.length > 3){
//     fetchRestaurantsOnCount();
//   }
// }, [searchText], )

//  const fetchRestaurantsOnCount = () => {

// }

// function debounce(func, timeout = 300) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, timeout);
//   };
// }
// function saveInput() {
//   console.log("Saving data");
// }
// const processChange = debounce(() => saveInput());
// const [suggestions, setSuggestions] = useState([]);

//   const storedSuggestions = () => {
//     Cookies.set("storedValue", "McDonalds"); // we will replace mcdonalds to the desired value
//   };

//   useEffect(() => {
//     const retrieveCookies = () => {
//       const storedValue = Cookies.get("storedValue");
//       if (storedValue) {
//         // If the stored value exists, we will set the suggestions state directly
//         setSuggestions([storedValue]); // it will be a list as mentioned in the interview
//       }
//     };

//     retrieveCookies(); // Check if stored suggestions exist

//     if (suggestions.length === 0) {
//       // If stored suggestions are not available, fetch restaurants from Airtable
//       fetchRestaurants();
//     }
//   }, [suggestions.length]);
