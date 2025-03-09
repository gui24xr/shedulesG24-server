
/*

import { DateTime } from "luxon";

export class SlotsManager {
  static createSlotItem(startDateTime, durationInMinutes) {
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


  static createSlotsGroupArray({startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity}) {
    const newSlotsArray = []
    let startDateTimeNewSlot = startDateTime  
    for (let i=0;i<slotsQuantity;i++){
        newSlotsArray.push(this.createSlotItem(startDateTimeNewSlot,durationInMinutes))
        startDateTimeNewSlot = this.resultingTime(startDateTimeNewSlot,durationInMinutes + betweenInervalInMinutes)
    }
    return newSlotsArray
  }


 static checkSlotsConflict(slotsArray,newSlot){

    try{
        const sortedSlots = slotsArray.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))

        const filteredSortedSlots = sortedSlots.filter(slot => new Date(slot.endDateTime) > new Date(newSlot.startDateTime))
        
        //console.log('-----SLOTS ORDENADOS-----------------------------------------------')
        sortedSlots.forEach(item => console.log(item.id,' ' ,item.startDateTime,"  ",item.durationInMinutes," ", item.endDateTime))
    
        //console.log('-----SLOTS FILTRADOS-----------------------------------------------')
        filteredSortedSlots.forEach(item => console.log(item.id,' ',item.startDateTime,"  ",item.durationInMinutes," ", item.endDateTime))

        
        filteredSortedSlots.forEach(slot =>{
            SlotsManager.checkSlotsCollision(newSlot,slot)
            //console.log('***** \n Sin Conflicto entre slots: \n', newSlot, '\n', slot)
        })
    }catch(error){
        throw error
    }
  

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

  static sortSlotsGroup(sheduleSlotsArray) {
    return sheduleSlotsArray.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
  }
  
}

*/