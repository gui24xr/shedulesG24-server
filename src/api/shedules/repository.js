import { Shedule } from "../../database/models/models.shedule.js";

export class ShedulesRepository {
  async createEmptyShedule() {
    try {
      const newShedule = new Shedule({
        slots: [],
        overBookSlots: [],
        waitingList: [],
      });
      await newShedule.save();
      return getMapRecord(newShedule);
    } catch (error) {
      throw error;
    }
  }

  async populateShedule(sheduleItem){
    try{
      const populatedShedule = await sheduleItem.populate([
        { path: 'slots.bookings.currentBooking' },
        { path: 'slots.bookings.canceledBookings' },
        { path: 'overBookSlots.bookings.currentBooking' },
        { path: 'overBookSlots.bookings.canceledBookings' },
        { path: 'waitingList.customer' }
      ])
      return populatedShedule
    }catch(error){
      throw error
    }
  }

  async getShedules() {
    try {
      const shedules = await Shedule.find().lean();
      const listOfMapRecords = shedules.map((item) => getMapRecord(item));
      return listOfMapRecords;
    } catch (error) {
      throw error;
    }
  }

  async getSheduleById(id) {
    try {
      const foundShedule = await Shedule.findOne({ _id: id }).lean();
      if (!foundShedule)
        throw new Error(
          "No existe la agenda buscada..."
        );
      return getMapRecord(foundShedule);
    } catch (error) {
      throw error;
    }
  }

  async getSheduleSlots(sheduleId) {
    try {
      const foundShedule = await Shedule.findOne({ _id: sheduleId }).select("slots.startDateTime slots.endDateTime slots.durationInMinutes").lean();
      if (!foundShedule)
        throw new Error(
          "No existe la agenda buscada..."
        );
      return foundShedule.slots;
    } catch (error) {
      throw error;
    }
  }

  async insertSlotsGroupToShedule(sheduleId, arraySlots) {
    try {
      //console.log('SLOTS PARA AGREGAR EN REPO: ', arraySlots, '\n----------------------------------')
      const updatedShedule = await Shedule.findOneAndUpdate(
        { _id: sheduleId }, // Filtro
        {
          $push: {
            slots: {
              $each: arraySlots.map((slot) => ({ ...slot/*, bookings: []*/})), // Agregar cada slot con un array de bookings vacío
            },
          },
        },
        { new: true } // Devuelve el documento actualizado
      );

      if (!updatedShedule)
        throw new Error(
          "No existe la agenda donde se pretende agregar el turno"
        );
      return updatedShedule; // Devuelve el documento actualizado
    } catch (error) {
      throw error; // Relanza el error para manejarlo en el controlador
    }
  }
  
}

function getMapRecord(record) {
  return {
    id: record._id.toString(),
    slots: record.slots.map((item) => ({
      id: item._id.toString(),
      startDateTime: item.startDateTime,
      endDateTime: item.endDateTime,
      durationInMinutes: item.durationInMinutes,
      bookings: {
        currentBooking:item.bookings.currentBooking,
        canceledBookings:item.bookings.canceledBookings.map(canceledBooking => ({
          id: canceledBooking.bookingId,
          customer: canceledBooking.customer.lastName + ' ' + canceledBooking.customer.name,
          canceledAt: canceledBooking.canceledAt
        }))
      }
    })),
    overBookSlots: record.overBookSlots,
    waitingList: record.waitingList,
  };
}
