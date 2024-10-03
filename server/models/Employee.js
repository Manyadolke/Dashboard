import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    designation: { type: String },
    department : {type:mongoose.Schema.Types.ObjectId,ref:"Department", required:true},
    salary: { type: Number, required: true }, // Make sure salary is defined if required
    createAlt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Make sure you export the model correctly
export default mongoose.model("Employee", employeeSchema);



// add