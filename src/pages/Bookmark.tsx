import { useContext } from "react";
import { MapContext } from "../context/MapContext";

const Bookmark = () => {
  const { bookmarkedMaps, removeMapFromBookmarks } = useContext(MapContext);

  const handleRemoveClick = (mapUrl: string) => {
    removeMapFromBookmarks(mapUrl);
  };

  return (
    <div>
      <h1>Bookmark</h1>
      {bookmarkedMaps.map((mapUrl) => (
        <>
          <iframe
            key={mapUrl}
            width="250"
            height="250"
            src={mapUrl}
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
          <button onClick={() => handleRemoveClick(mapUrl)}>remove</button>
        </>
      ))}
    </div>
  );
};

export default Bookmark;
