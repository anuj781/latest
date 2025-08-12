import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: String,
  mobile: String,
  purpose: String,
  services: [String],
});

const enquiry = mongoose.model('enquiry', enquirySchema);
export default enquiry
