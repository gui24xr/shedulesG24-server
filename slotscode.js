const newSlot = { startDateTime: '2021-04-10T19:59:00.000Z', endDateTime: '2022-03-10T15:29:00.000Z'}
const slot1 =   { startDateTime: '2022-03-10T11:29:00.000Z', endDateTime: '2022-03-10T15:44:00.000Z'}
const slot2 =   { startDateTime: '2021-04-10T19:59:00.000Z', endDateTime: '2022-03-10T15:29:00.000Z'}
const slot3 =   { startDateTime: '2021-03-10T19:59:00.000Z', endDateTime: '2022-06-10T15:29:00.000Z'}
const slot4 =   { startDateTime: '2021-05-10T19:59:00.000Z', endDateTime: '2022-02-10T15:29:00.000Z'}
const slot5 =   { startDateTime: '2021-03-10T19:59:00.000Z', endDateTime: '2022-09-10T15:29:00.000Z'}
const slot6 =   { startDateTime: '2021-03-10T19:59:00.000Z', endDateTime: '2022-05-10T15:29:00.000Z'}

 
const slotXIsAllIncludedInSlotY = (slotX,slotY) => (new Date(slotX.startDateTime) >= new Date(slotY.startDateTime)) && new Date(slotX.endDateTime) <= new Date(slotY.endDateTime)
const slotXExceedsSLotYOnBothEnds = (slotX,slotY) => (new Date(slotX.startDateTime) < new Date(slotY.startDateTime)) && new Date(slotX.endDateTime) > new Date(slotY.endDateTime)
const slotXisPartialOfSlotY = (slotX,slotY) => ((new Date(slotX.startDateTime) < new Date(slotY.startDateTime)) && (new Date(slotX.endDateTime) > new Date(slotY.startDateTime)) ) 
                                                 || (new Date(slotX.startDateTime) < new Date(slotY.endDateTime) && (new Date(slotX.endDateTime) > new Date(slotY.endDateTime)))

console.log(slotXIsAllIncludedInSlotY(newSlot,newSlot))
console.log(slotXIsAllIncludedInSlotY(newSlot,slot1))
console.log(slotXisPartialOfSlotY(newSlot,slot1))
console.log(slotXIsAllIncludedInSlotY(newSlot,slot5))
console.log(slotXIsAllIncludedInSlotY(newSlot,slot4))
console.log(slotXExceedsSLotYOnBothEnds(newSlot,slot6))
console.log(slotXExceedsSLotYOnBothEnds(newSlot,slot4))
console.log(slotXisPartialOfSlotY(newSlot,slot3))
console.log(slotXisPartialOfSlotY(newSlot,slot3))
console.log(slotXExceedsSLotYOnBothEnds(newSlot,slot3))