type Props = {
  restaurantName: string;
};

const Map = ({ restaurantName }: Props) => {
  const mapUrl = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${restaurantName}"}`;

  return (
    <>
      <h1>Map</h1>
      <iframe
        width="250"
        height="250"
        src={mapUrl}
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    </>
  );
};

export default Map;
