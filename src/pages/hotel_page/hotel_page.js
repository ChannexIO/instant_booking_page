import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Header from 'components/header';
import PhotoSlider from 'components/photo_slider';
import SearchSection from 'components/search_section';
import HotelInfoSection from 'components/hotel_info_section';
import HotelFacilitiesSection from 'components/hotel_facilities_section';
import HotelRatesSection from 'components/hotel_rates_section';
import ContactsSection from 'components/contacts_section';
import Footer from 'components/footer';
import SectionWrapper from 'components/section_wrapper';

import { DEFAULT_CURRENCY } from 'constants/defaults';

import initSearchParamsFromUrl from './init_search_params_from_url';

import styles from './hotel_page.module.css';

const DEFAULT_SEARCH_PARAMS = {
  startDate: null,
  endDate: null,
  currency: DEFAULT_CURRENCY,
};

const propertyRatesStub = [
  {
    'type': 'room_with_rates',
    'id': 'room_id',
    'title': 'Room Title',
    'description': '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."    ',
    'availability': 3,
    'bedOptions': [
      {
        'title': 'Olympic Queen',
        'count': 2,
        'size': '90x200 CM'
      },
      {
        'title': 'Smol bed',
        'count': 1,
        'size': '90x100 CM'
      }
    ],
    'facilities': ['facility 1', 'facility 2', 'facility 3', 'facility 4', 'facility 5', 'facility 6'],
    'photos': [
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
    'ratePlans': [
      {
        'id': 'RATE_PLAN_ID',
        'title': 'Title',
        'occupancy': {
          'adults': 1,
          'children': 1,
          'infants': 0
        },
        'cancellationPolicy': 'Cancellation policy',
        'price': '100.50',
        taxFreePrice: '90',
        lengthOfStay: '4',
        mealPolicy: {
          type: 'american',
          included: false,
          price: 10,
        },
        'taxes': [
          {
            'title': 'Tax Title',
            'amount': '10.00',
            'inclusive': false,
            'rate': '10.00',
            'mode': 'percent'
          },
          {
            'title': 'Vat',
            'amount': '15.00',
            'inclusive': true,
            'rate': '15.00',
            'mode': 'percent'
          }
        ]
      },
      {
        'id': 'RATE_PLAN_ID_2',
        'title': 'Title rate s2',
        taxFreePrice: '90',
        lengthOfStay: '4',
        'occupancy': {
          'adults': 3,
          'children': 2,
          'infants': 0
        },
        'cancellationPolicy': 'Cancellation policy extended',
        'price': '300.00',
        mealPolicy: {
          type: 'american',
          included: true,
          price: null,
        },
        'taxes': [
          {
            'title': 'Tax Title',
            'amount': '10.00',
            'inclusive': false,
            'rate': '10.00',
            'mode': 'percent'
          }
        ]
      },
      {
        'id': 'RATE_PLAN_ID_3',
        'title': 'Title rate 3',
        'occupancy': {
          'adults': 2,
          'children': 0,
          'infants': 0
        },
        'cancellationPolicy': 'Cancellation policy extended',
        'price': '350.00',
        taxFreePrice: '90',
        lengthOfStay: '4',
        mealPolicy: {
          type: 'american',
          included: false,
          price: 10,
        },
        'taxes': [
          {
            'title': 'Tax Title',
            'amount': '10.00',
            'inclusive': false,
            'rate': '10.00',
            'mode': 'percent'
          }
        ]
      }
    ]
  },
  {
    'type': 'room_with_rates_2',
    'id': 'room_id_2',
    'title': 'Another Room Title',
    'description': 'Description',
    'availability': 1,
    'bedOptions': [
      {
        'title': 'Olympic Queen',
        'count': 2,
        'size': '90x200 CM'
      },
      {
        'title': 'Smol bed',
        'count': 1,
        'size': '90x100 CM'
      }
    ],
    'facilities': ['facility 1', 'facility 2'],
    'photos': [
      {
        'url': 'PHOTO_URL',
        'title': 'title',
        'author': 'author'
      }
    ],
    'ratePlans': [
      {
        'id': 'RATE_PLAN_ID',
        'title': 'Title',
        'occupancy': {
          'adults': 1,
          'children': 0,
          'infants': 0
        },
        'cancellationPolicy': 'Cancellation policy',
        'price': '100.00',
        mealPolicy: {
          type: 'american',
          included: false,
          price: 10,
        },
        'taxes': [
          {
            'title': 'Tax Title',
            'amount': '10.00',
            'inclusive': false,
            'rate': '10.00',
            'mode': 'percent'
          }
        ]
      }
    ]
  }
];

export default function HotelPage({ property }) {
  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);
  const [propertyRooms, setPropertyRooms] = useState(propertyRatesStub);
  const [loading, setLoading] = useState(false);

  useEffect(() => initSearchParamsFromUrl(setSearchParams), []);
  
  return (
    <div>
      <div className={styles.firstScreen}>
        <Container>
          <Header property={property}  searchParams={searchParams} handleSearchChange={setSearchParams} />
        </Container>
        <PhotoSlider photos={property.photos} />
        <Container>
          <SearchSection property={property} searchParams={searchParams} handleSearchChange={setSearchParams} />
        </Container>
      </div>
      <SectionWrapper theme="light">
        <HotelInfoSection property={property} />
      </SectionWrapper>
      <SectionWrapper theme="dark">
        <HotelRatesSection property={property} propertyRooms={propertyRooms} searchParams={searchParams} loading={loading} />
      </SectionWrapper>
      <SectionWrapper theme="light">
        <HotelFacilitiesSection property={property} />
      </SectionWrapper>
      <ContactsSection property={property} />
      <Footer />
    </div>
  );
}