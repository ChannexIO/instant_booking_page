import dateFormatter from 'utils/date_formatter';

// TODO - probably should be removed after api fix
const DEFAULT_CHECKIN_TIME = '12:00';

const formatCardInfo = (cardInfo) => {
  const { expirationMonth, expirationYear, serviceCode, ...rest } = cardInfo;
  const expirationDate = `${expirationMonth}/${expirationYear}`;

  return { ...rest, expirationDate, cvv: serviceCode };
};

const buildBooking = (property, rooms, params, cardInfo, formData) => {
  const { billingAddress, customer, guest } = formData;
  const { state, additionalAddress, ...restAddress } = billingAddress;
  const { specialRequest, ...restCustomer } = customer;
  const { hotelPolicy = {} } = property;
  const { checkinTime: arrivalHour = DEFAULT_CHECKIN_TIME, currency } = hotelPolicy;
  const {
    ratesOccupancyPerRoom,
    checkinDate,
    checkoutDate,
  } = params;
  const arrivalDate = dateFormatter.toApi(checkinDate);
  const departureDate = dateFormatter.toApi(checkoutDate);
  const guarantee = formatCardInfo(cardInfo);

  const bookedRooms = Object.keys(ratesOccupancyPerRoom).reduce((roomsList, roomTypeCode) => {
    const selectedRates = ratesOccupancyPerRoom[roomTypeCode];
    const roomProps = rooms.find((room) => roomTypeCode === room.id);

    const bookedPerRoomId = Object.keys(selectedRates).reduce((acc, ratePlanCode) => {
      const rateSelectedAmount = selectedRates[ratePlanCode];
      const { occupancy } = roomProps.ratePlans.find((rate) => ratePlanCode === rate.id);

      const bookedRoomsPerRate = new Array(rateSelectedAmount).fill(null)
        .map(() => ({
          roomTypeCode,
          ratePlanCode,
          occupancy,
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
