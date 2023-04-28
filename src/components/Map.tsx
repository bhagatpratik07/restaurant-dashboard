import { useContext } from "react";
import Cookies from "js-cookie";
import { MapContext } from "../context/MapContext";

type Props = {
  restaurantName: string;
};
const Map = ({ restaurantName }: Props) => {
  const mapUrl = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${restaurantName}"}`;

  const { addMapToBookmarks } = useContext(MapContext);
  const isLoggedIn = Cookies.get("loggedIn") === "true";

  const handleBookmarkClick = () => {
    addMapToBookmarks(mapUrl);
    //console.log("added to bookmarks");
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <h3>{restaurantName}</h3>
          <iframe
            width="250"
            height="250"
            src={mapUrl}
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
          <button onClick={handleBookmarkClick}>Bookmark</button>
        </>
      ) : (
        <>
          <div>Please Log In to view the map</div>
        </>
      )}
    </>
  );
};

export default Map;
