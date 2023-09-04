import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  _id: { type: String, required: true },
  namespaceId: { type: String, required: true },
  name: { type: String, required: true },
  capacityAvailable: { type: [String], required: true },
  capacity: { type: String, required: true },
  priceRegular: { type: Number, required: true },
  priceDiscount: { type: Number, required: true },
  colorsAvailable: { type: [String], required: true },
  color: { type: String, required: true },
  images: { type: [String], required: true },
  description: [
    {
      title: { type: String, required: true },
      text: { type: [String], required: true },
    },
  ],
  screen: { type: String, required: true },
  resolution: { type: String, required: true },
  processor: { type: String, required: true },
  ram: { type: String, required: true },
  camera: { type: String, required: true },
  zoom: { type: String, required: true },
  cell: { type: [String], required: true },
  category: { type: String, required: true },
  year: { type: Number, required: true },
});

const ProductModel = model('product', productSchema);

export default ProductModel;
