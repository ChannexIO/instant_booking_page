import React from 'react';
import { Container } from "react-bootstrap";

import Header from "components/header";
import Routing from "routing";

function App() {
  
  const propertyDetails = {
    title: "Test Hotel",
    logo: "https://www.w3schools.com/howto/img_snow.jpg",
    link: "https://en.wikipedia.org/wiki/Cross-origin_resource_sharing",
    photos: [
      "https://c8.alamy.com/comp/PAX4AP/two-brown-doors-with-room-numbers-on-them-on-the-light-wall-background-in-the-hotel-closeup-horizontal-photo-PAX4AP.jpg",
      "https://editorial01.shutterstock.com/wm-preview-1500/2312484a/82de944a/various-views-of-moscow-in-russia-the-moscow-moskva-hotel-moscow-is-the-capital-city-and-the-most-populous-federal-subject-of-russia-the-city-is-a-major-political-economic-cultural-and-scientific-center-in-russia-and-in-europe-according-to-forbes-2-shutterstock-editorial-2312484a.jpg",
    ],
    address: "CountryName, City, Street, Building 14/3",
    geolocation: {
      latitude: 41.3850014,
      longitude: 2.14649269999995
    },
    description: "Some generic hotel awaits for some generic travelers to come by and book some rooms",
    facilities: { //TBD
      kitchen: {
        list: [ "table", "fridge", "chair" ],
      }
    },
    defaultCurrency: "USD",
    propertyPolicy: "TBD"//TBD
  }

  return (
    <Container>
      <Header
        property={propertyDetails}
      />
      <Routing
        property={propertyDetails}
      />
    </Container>
  );
}

export default App;
