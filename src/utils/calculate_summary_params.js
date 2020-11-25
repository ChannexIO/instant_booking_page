export default (propertyRooms, ratesOccupancyPerRoom) => {
  if (!propertyRooms || !ratesOccupancyPerRoom) {
    return null;
  }

  let newTotalPrice = 0;
  const newSelectedRatesByRoom = {};

  Object.keys(ratesOccupancyPerRoom).forEach((roomId) => {
    Object.keys(ratesOccupancyPerRoom[roomId]).forEach((rateId) => {
      const amount = Number(ratesOccupancyPerRoom[roomId][rateId]);
      const room = propertyRooms.find((propertyRoom) => propertyRoom.id === roomId);
      const rate = room.ratePlans.find((roomRatePlan) => roomRatePlan.id === rateId);

      const ratePrice = Number(rate?.totalPrice);

      if (amount) {
        const selectedRate = { ...rate, amount };
        const newRoom = { ...room, selectedRates: [], total: 0 };
        const { [room.id]: selectedRoom = newRoom } = newSelectedRatesByRoom;

        selectedRoom.selectedRates.push(selectedRate);
        selectedRoom.total += amount * ratePrice;

        newSelectedRatesByRoom[selectedRoom.id] = selectedRoom;

        newTotalPrice += ratePrice * amount;
      }
    });
  });

  return {
    total: newTotalPrice,
    selectedRatesByRoom: newSelectedRatesByRoom,
  };
};
