import { createContext, useState, ReactNode } from "react";

type MapProviderType = {
  children: ReactNode;
};

type MapContextType = {
  bookmarkedMaps: string[];
  addMapToBookmarks: (mapUrl: string) => void;
  removeMapFromBookmarks: (mapUrl: string) => void;
};

export const MapContext = createContext<MapContextType>({
  bookmarkedMaps: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addMapToBookmarks: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeMapFromBookmarks: () => {},
});

export const MapProvider = ({ children }: MapProviderType) => {
  const [bookmarkedMaps, setBookmarkedMaps] = useState<string[]>([]);

  const addMapToBookmarks = (mapUrl: string) => {
    setBookmarkedMaps((prevBookmarkedMaps) => [...prevBookmarkedMaps, mapUrl]);
  };

  const removeMapFromBookmarks = (mapUrl: string) => {
    setBookmarkedMaps((prevBookmarkedMaps) =>
      prevBookmarkedMaps.filter((prevMapUrl) => prevMapUrl !== mapUrl)
    );
  };

  return (
    <MapContext.Provider
      value={{ bookmarkedMaps, addMapToBookmarks, removeMapFromBookmarks }}
    >
      {children}
    </MapContext.Provider>
  );
};
