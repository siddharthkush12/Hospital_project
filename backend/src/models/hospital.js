import { Schema, model } from "mongoose";

const hospitalSchema = new Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    imageUrl: { type: String },
    specialities: { type: [String], default: [] },
    rating: { type: Number, min: 0, max: 5 },
    description: { type: String },
    images: { type: [String], default: [] },
    numberOfDoctors: { type: Number, default: 0 },
    numberOfDepartments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Hospital = model("Hospital", hospitalSchema);

export default Hospital;
