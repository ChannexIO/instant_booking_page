import React from 'react';

import Routing from 'routing';

function App() {
  const propertyDetails = {
    type: 'property_info',
    id: 'property_id',
    title: 'Spilman Hotel',
    logo: 'https://www.w3schools.com/howto/img_snow.jpg',
    description: 'Studio apartment with a panoramic loggia and fresh renovation, located in a modern new building. There are three elevators, concierge and video surveillance.\n\nThe Sixtytwo Hotel is set in a characteristic 19th-century building. Each elegant room comes with a Nespresso coffee machine and a mini-bar. Some overlook Passeig de Gràcia Boulevard, while others overlook the hotel´s charming Japanese-style garden.',
    address: 'CountryName, City, Street, Building 14/3',
    phone: '9053094534',
    email: 'rthrth@hrth.rth',
    location: {
      lat: 41.3850014,
      lng: 2.14649269999995
    },
    photos: [
      {
        'url': 'https://www.yourtrainingedge.com/wp-content/uploads/2019/05/background-calm-clouds-747964.jpg',
        'description': 'DESC',
        'author': 'Author'
      },
      {
        'url': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80',
        'description': 'DESC1',
        'author': 'Author1'
      }
    ],
    facilities: [
      'facility1', 'facility2', 'facility3', 'facility4', 'facility5', 'facility6', 'facility7', 'facility8', 'facility9', 'facility10'
    ]
  };

  return (
    <Routing
      property={propertyDetails}
    />
  );
}

export default App;
