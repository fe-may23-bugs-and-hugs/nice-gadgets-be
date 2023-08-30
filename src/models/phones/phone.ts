import { Schema, model } from 'mongoose';

const phoneSchema = new Schema({
  _id: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  phoneId: {
    type: String,
    require: true,
  },
  itemId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  fullPrice: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  screen: {
    type: String,
  },
  capacity: {
    type: String,
  },
  color: {
    type: String,
  },
  ram: {
    type: String,
  },
  year: {
    type: String,
  },
  image: {
    type: String,
    require: true,
  },
});

const Phone = model('phone', phoneSchema);

export default Phone;
