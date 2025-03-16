import mongoose from 'mongoose'
import { logger } from './logger.config.js'


mongoose.plugin((schema) => {
    logger.info('Aplicando plugin de timestamps...');
    schema.set('timestamps', true);
  });

  mongoose.plugin((schema) => {
    logger.info('Aplicando plugin toJson...');
    schema.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      }
    })
  })
  
    
  
  mongoose.plugin((schema) => {
    logger.info('Aplicando plugin toObject...');
    schema.set("toObject", {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      }
    });
})