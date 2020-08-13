import React from 'react';

import Routing from "routing";

function App() {
  
  const propertyDetails = {
    title: "Test Hotel",
    logo: "https://www.w3schools.com/howto/img_snow.jpg",
    link: "https://en.wikipedia.org/wiki/Cross-origin_resource_sharing",
    photos: [
      "https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80",
    ],
    address: "CountryName, City, Street, Building 14/3",
    geolocation: {
      latitude: 41.3850014,
      longitude: 2.14649269999995
    },
    description: "Some generic hotel awaits for some generic travelers to come by and book some rooms",
    facilities: [ "table", "fridge", "chair", "some", "more", "facilities" ],
    defaultCurrency: "USD",
    propertyPolicy: "TBD"//TBD
  }

  return (
    <Routing
      property={propertyDetails}
    />
  );
}

export default App;
