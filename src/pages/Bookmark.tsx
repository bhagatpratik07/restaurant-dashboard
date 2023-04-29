import { useContext } from "react";
import { MapContext } from "../context/MapContext";
import "../styles/Home.css";
import "../styles/bookmark.css";

const Bookmark = () => {
  const { bookmarkedMaps, removeMapFromBookmarks } = useContext(MapContext);

  const handleRemoveClick = (mapUrl: string) => {
    removeMapFromBookmarks(mapUrl);
  };

  return (
    <div>
      <h1 className="heading">Bookmarks</h1>
      {bookmarkedMaps.map((mapUrl) => (
        <>
          <div className="wrapper">
            {/* <h1>{restaurant.name}</h1> */}
            <iframe
              className="map"
              key={mapUrl}
              width="250"
              height="250"
              src={mapUrl}
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
            <button
              onClick={() => handleRemoveClick(mapUrl)}
              className="removebtn"
            >
              remove
            </button>
          </div>
        </>
      ))}
    </div>
  );
};

export default Bookmark;
