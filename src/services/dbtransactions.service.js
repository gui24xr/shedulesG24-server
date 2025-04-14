import mongoose from 'mongoose';

const  DbTransactionsService = {
    startSession: () => mongoose.startSession(),
    startTransaction: (sesion) => sesion.startTransaction(),
    commitTransaction: (sesion) => sesion.commitTransaction(),
    abortTransaction: (sesion) => sesion.abortTransaction(),
    endSession: (sesion) => sesion.endSession(),
}
  
export default DbTransactionsService;
