import { DateTime } from "luxon";

export class SlotsManager {
  static getSlotItem(startDateTime, durationInMinutes) {
    const startDateTimeISO = DateTime.fromISO(startDateTime, { zone: "UTC" });
    const endDateTime = startDateTimeISO
      .plus({ minutes: durationInMinutes })
      .toISO();
    return {
      startDateTime: startDateTimeISO,
      durationInMinutes: durationInMinutes,
      endDateTime: endDateTime,
    };
  }

  static resultingTime(currentDateTime, transcurredTimeInMinutes) {
    const startDateTimeISO = DateTime.fromISO(currentDateTime, { zone: "UTC" });
    const endDateTime = startDateTimeISO
      .plus({ minutes: transcurredTimeInMinutes })
      .toISO();
    return endDateTime
     
    
  }


  static getSlotItemsArray({startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity}) {
    const newSlotsArray = []
    let startDateTimeNewSlot = startDateTime  
    for (let i=0;i<slotsQuantity;i++){
        newSlotsArray.push(this.getSlotItem(startDateTimeNewSlot,durationInMinutes))
        startDateTimeNewSlot = this.resultingTime(startDateTimeNewSlot,durationInMinutes + betweenInervalInMinutes)
    }
    return newSlotsArray
  }



  static checkSlotsCollision(slotX, slotY) {
    try {
      const slotXIsAllIncludedInSlotY = (slotX, slotY) =>
        new Date(slotX.startDateTime) >= new Date(slotY.startDateTime) &&
        new Date(slotX.endDateTime) <= new Date(slotY.endDateTime);
      const slotXExceedsSLotYOnBothEnds = (slotX, slotY) =>
        new Date(slotX.startDateTime) < new Date(slotY.startDateTime) &&
        new Date(slotX.endDateTime) > new Date(slotY.endDateTime);
      const slotXisPartialOfSlotY = (slotX, slotY) =>
        (new Date(slotX.startDateTime) < new Date(slotY.startDateTime) &&
          new Date(slotX.endDateTime) > new Date(slotY.startDateTime)) ||
        (new Date(slotX.startDateTime) < new Date(slotY.endDateTime) &&
          new Date(slotX.endDateTime) > new Date(slotY.endDateTime));

      if (slotXIsAllIncludedInSlotY(slotX, slotY)) throw new Error(`Superposicion de turnos incluidos/iguales...\n`);
      if (slotXExceedsSLotYOnBothEnds(slotX, slotY)) throw new Error(`Superposicion de turnos. Exceso a ambos lados... \n`);
      if (slotXisPartialOfSlotY(slotX, slotY)) throw new Error(`Superposicion de turnos. inclusion parcial...\n `);
    } catch (error) {
      throw error;
    }
  }

  static sortShedulesSlotsArray(sheduleSlotsArray) {
    return sheduleSlotsArray.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
  }
  
}
