import { useContext } from "react";
import Cookies from "js-cookie";
import { MapContext } from "../context/MapContext";
import "../styles/Map.css";

type Props = {
  restaurantName: string;
  id: number;
  deleteRestaurnts: (id: number) => void;
};
const Map = ({ restaurantName, deleteRestaurnts, id }: Props) => {
  const mapUrl = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${restaurantName}"}`;

  const { addMapToBookmarks } = useContext(MapContext);
  const isLoggedIn = Cookies.get("loggedIn") === "true";

  const handleBookmarkClick = () => {
    addMapToBookmarks(mapUrl);
    alert("map added to bookmarks");
    //console.log("added to bookmarks");
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="wrapper">
          <h3>{restaurantName}</h3>
          <div className="map-container">
            <iframe
              className="map"
              src={mapUrl}
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
          <div className="wrapper-btns">
            <button
              className="bk-btn wrapper-btn"
              onClick={handleBookmarkClick}
            >
              Bookmark
            </button>
            <button
              className="rm-btn wrapper-btn"
              onClick={() => deleteRestaurnts(id)}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>Please Log In to view the map</div>
        </>
      )}
    </>
  );
};

export default Map;
