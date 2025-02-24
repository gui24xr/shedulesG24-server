import { Shedule } from "../../database/models/models.shedule.js";

export class ShedulesRepository {
  async createEmptyShedule() {
    try {
      const newShedule = new Shedule({
        slots: [],
        additionalSlots: [],
        waitingList: [],
      });
      await newShedule.save();
      return getMapRecord(newShedule);
    } catch (error) {
      throw error;
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
          "No existe la agenda donde se pretende agregar el turno"
        );
      return getMapRecord(foundShedule);
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
              $each: arraySlots.map((slot) => ({ ...slot, bookings: [] })), // Agregar cada slot con un array de bookings vacío
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
      bookings: [],
    })),
    additionalSlots: record.additionalSlots,
    waitingList: record.waitingList,
  };
}
