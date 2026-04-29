import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  address: {
    type: String,
    default: 'Factory # 3-96, Sy. No. 171/A, Chinnaravirala (V), Hayathnagar (M), Rangareddy, Telangana - 501505'
  },
  email: {
    type: String,
    default: 'vaamantexprint@gmail.com'
  },
  phone: {
    type: String,
    default: ''
  },
  mapUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
