import dateFormatter from "utils/date_formatter";

const formatCardInfo = (cardInfo) => {
  const { expirationMonth, expirationYear, serviceCode, ...rest } = cardInfo;
  const expirationDate = `${expirationMonth}/${expirationYear}`;

  return { ...rest, expirationDate, cvv: serviceCode };
};

const getGuestPool = (ratesOccupancyPerRoom, adults, children) => {
  const totalSelectedRateAmount = Object.values(ratesOccupancyPerRoom).reduce(
    (total, selectedRates) => {
      const subtotal = Object.values(selectedRates).reduce(
        (totalPerRoom, selected) => totalPerRoom + selected,
        0,
      );

      return subtotal + total;
    },
    0,
  );

  const baseAdultsPool = adults < totalSelectedRateAmount ? adults : totalSelectedRateAmount;

  const additionlAdultsPool =
    adults > totalSelectedRateAmount ? adults - totalSelectedRateAmount : 0;

  const childrenPool = children;

  return {
    baseAdultsPool,
    additionlAdultsPool,
    childrenPool,
  };
};

const getRateOccupancy = (occupancy, guestPool) => {
  let { baseAdultsPool, additionlAdultsPool, childrenPool } = guestPool;

  let adultsOccupancy = 0;
  let childrenOccupancy = 0;

  if (baseAdultsPool > 0) {
    adultsOccupancy += 1;
    baseAdultsPool -= 1;
  }

  if (additionlAdultsPool > 0) {
    const adultSpacesToFill = occupancy.adults - adultsOccupancy;

    const adultsToSpread =
      additionlAdultsPool > adultSpacesToFill ? adultSpacesToFill : additionlAdultsPool;

    adultsOccupancy += adultsToSpread;
    additionlAdultsPool -= adultsToSpread;
  }

  if (childrenPool > 0) {
    const childrenSpacesToFill =
      childrenPool > occupancy.children ? occupancy.children : childrenPool;

    childrenOccupancy += childrenSpacesToFill;
    childrenPool -= childrenSpacesToFill;
  }

  const updatedGuestPool = { baseAdultsPool, additionlAdultsPool, childrenPool };
  const rateOccupancy = {
    adults: adultsOccupancy,
    children: childrenOccupancy,
    infants: 0,
  };

  return {
    updatedGuestPool,
    rateOccupancy,
  };
};

const buildBooking = (property, rooms, params, cardInfo, formData) => {
  const { billingAddress, customer, guest } = formData;
  const { additionalAddress, address, ...restAddress } = billingAddress;
  const { specialRequest, ...restCustomer } = customer;
  const { currency } = property;
  const { ratesOccupancyPerRoom, checkinDate, checkoutDate, adults, children } = params;
  const arrivalDate = dateFormatter.toApi(checkinDate);
  const departureDate = dateFormatter.toApi(checkoutDate);
  const guarantee = formatCardInfo(cardInfo);
  const fullAddress = [address, additionalAddress].filter(Boolean).join(", ");

  let guestPool = getGuestPool(ratesOccupancyPerRoom, adults, children);

  const bookedRooms = Object.keys(ratesOccupancyPerRoom).reduce((roomsList, roomTypeCode) => {
    const selectedRates = ratesOccupancyPerRoom[roomTypeCode];
    const roomProps = rooms.find((room) => roomTypeCode === room.id);

    const bookedPerRoomId = Object.keys(selectedRates).reduce((acc, ratePlanCode) => {
      const rateSelectedAmount = selectedRates[ratePlanCode];
      const { occupancy } = roomProps.ratePlans.find((rate) => ratePlanCode === rate.id);

      const bookedRoomsPerRate = new Array(rateSelectedAmount).fill(null).map(() => {
        const { rateOccupancy, updatedGuestPool } = getRateOccupancy(occupancy, guestPool);
        guestPool = updatedGuestPool;

        return {
          roomTypeCode,
          ratePlanCode,
          occupancy: rateOccupancy,
        };
      });

      return [...acc, ...bookedRoomsPerRate];
    }, []);

    return [...roomsList, ...bookedPerRoomId];
  }, []);

  bookedRooms[0].guests = guest.list;

  const booking = {
    status: "new",
    currency,
    arrivalDate,
    departureDate,
    customer: {
      address: fullAddress,
      ...restAddress,
      ...restCustomer,
    },
    notes: specialRequest,
    guarantee,
    rooms: bookedRooms,
  };

  return booking;
};

export default buildBooking;
