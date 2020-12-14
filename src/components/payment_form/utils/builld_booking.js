import moment from 'moment';

import dateFormatter from 'utils/date_formatter';

// TODO - probably should be removed after api fix
const DEFAULT_CHECKIN_TIME = '12:00';

const getOccupiedDatesList = (checkinDate, checkoutDate) => {
  const isDatesValid = moment(checkinDate).isValid() && moment(checkoutDate).isValid();
  const occupiedDatesList = [];

  if (!isDatesValid) {
    return occupiedDatesList;
  }

  for (
    const currentDate = checkinDate.clone();
    checkoutDate.diff(currentDate, 'days');
    currentDate.add(1, 'days')
  ) {
    occupiedDatesList.push(dateFormatter.toApi(currentDate));
  }

  return occupiedDatesList;
};

const getBookedRoomDays = (dates, price, ratePlanCode) => {
  return dates.map((date) => ({
    date,
    price,
    ratePlanCode,
  }));
};

const formatCardInfo = (cardInfo) => {
  const { expirationMonth, expirationYear, ...rest } = cardInfo;
  const expirationDate = `${expirationMonth}/${expirationYear}`;

  return { ...rest, expirationDate };
};

const buildBooking = (property, rooms, params, cardInfo, formData) => {
  const { billingAddress, customer, guest } = formData;
  const { state, additionalAddress, ...restAddress } = billingAddress;
  const { specialRequest, ...restCustomer } = customer;
  const { hotelPolicy = {} } = property;
  const { checkinTime: arrivalHour = DEFAULT_CHECKIN_TIME } = hotelPolicy;
  const {
    ratesOccupancyPerRoom,
    checkinDate,
    checkoutDate,
    adults,
    children,
    infants = 0, // TODO - remove when(if) added to IBE
    currency,
  } = params;
  const arrivalDate = dateFormatter.toApi(checkinDate);
  const departureDate = dateFormatter.toApi(checkoutDate);
  const bookedDatesList = getOccupiedDatesList(checkinDate, checkoutDate);
  const guarantee = formatCardInfo(cardInfo);

  const bookedRooms = Object.keys(ratesOccupancyPerRoom).reduce((roomsList, roomTypeCode) => {
    const selectedRates = ratesOccupancyPerRoom[roomTypeCode];
    const roomProps = rooms.find((room) => roomTypeCode === room.id);

    const bookedPerRoomId = Object.keys(selectedRates).reduce((acc, rateId) => {
      const rateOccupancy = selectedRates[rateId];
      const ratePlanProps = roomProps.ratePlans.find((rate) => rateId === rate.id);
      const pricePerDate = Number(ratePlanProps.totalPrice) / ratePlanProps.lengthOfStay;

      const bookedRoomsPerRate = new Array(rateOccupancy).fill(null)
        .map(() => ({
          roomTypeCode,
          occupancy: {
            adults,
            children,
            infants,
          },
          days: getBookedRoomDays(bookedDatesList, pricePerDate, rateId),
        }));

      return [...acc, ...bookedRoomsPerRate];
    }, []);

    return [...roomsList, ...bookedPerRoomId];
  }, []);

  const booking = {
    status: 'new',
    currency,
    arrivalDate,
    departureDate,
    arrivalHour,
    customer: {
      ...restAddress,
      ...restCustomer,
      meta: {
        guest,
        state,
        specialRequest,
        additionalAddress,
      },
    },
    guarantee,
    rooms: bookedRooms,
  };

  return booking;
};

export default buildBooking;
