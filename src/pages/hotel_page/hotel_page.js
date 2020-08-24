import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import moment from 'moment';

import Header from 'components/header';
import SeparatorLine from 'components/separator_line';
import PhotoSlider from 'components/photo_slider';
import SearchSection from 'components/search_section';
import HotelInfoSection from 'components/hotel_info_section';
import HotelRatesSection from 'components/hotel_rates_section';
import ContactsSection from 'components/contacts_section';
import Footer from 'components/footer';

import getUrlParams from 'utils/get_url_params';

import { DEFAULT_CURRENCY } from 'constants/defaults';
import { DATE_FORMAT } from 'constants/formats';

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
    'description': 'Description',
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
        'id': 'RATE_PLAN_ID_2',
        'title': 'Title rate s2',
        'occupancy': {
          'adults': 3,
          'children': 0,
          'infants': 0
        },
        'cancellationPolicy': 'Cancellation policy extended',
        'price': '300.00',
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

  useEffect(function initSearchParamsFromUrl() {
    const { currency = DEFAULT_CURRENCY, startDate, endDate } = getUrlParams();
    const datesFromUrl = {};

    const parsedStartDate = moment(startDate, DATE_FORMAT);
    const parsedEndDate = moment(endDate, DATE_FORMAT);

    if (startDate && parsedStartDate.isValid()) {
      datesFromUrl.startDate = parsedStartDate;
    }

    if (endDate && parsedEndDate.isValid()) {
      datesFromUrl.endDate = parsedEndDate;
    }

    setSearchParams({ currency, ...datesFromUrl });
  }, []);
  
  return (
    <div>
      <div className={styles.firstScreen}>
        <Container>
          <Header property={property}  searchParams={searchParams} handleSearchChange={setSearchParams} />
        </Container>
        <PhotoSlider property={property} />
        <Container>
          <SearchSection property={property} searchParams={searchParams} handleSearchChange={setSearchParams} />
        </Container>
      </div>
      <Container>
        <SeparatorLine />
        <HotelInfoSection property={property} />
        <SeparatorLine />
        <HotelRatesSection property={property} propertyRooms={propertyRooms} searchParams={searchParams} loading={loading} />
        <SeparatorLine />
      </Container>
      <ContactsSection property={property} />
      <Footer />
    </div>
  );
}