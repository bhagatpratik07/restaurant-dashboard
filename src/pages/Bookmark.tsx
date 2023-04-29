import { useContext } from "react";
import { MapContext } from "../context/MapContext";
import "../styles/Home.css";

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
            <iframe
              key={mapUrl}
              width="250"
              height="250"
              src={mapUrl}
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
          {/* 
          <object data={mapUrl} type=""></object> */}
          {/* 
          <embed src={mapUrl} width="450" height="250" /> */}
          <button
            onClick={() => handleRemoveClick(mapUrl)}
            className="removebtn"
          >
            remove
          </button>
        </>
      ))}
    </div>
  );
};

export default Bookmark;
