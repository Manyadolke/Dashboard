import mongoose from "mongoose";

const { Schema } = mongoose;

const salarySchema = new Schema({
   
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    basicSalary: { type: Number, required: true }, 
    allowances: { type: Number }, 
    deductions: { type: Number }, 
    netSalary: { type: Number }, 
    payDate: { type: Date, required : true }, 
    createAlt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Make sure you export the model correctly
export default mongoose.model("Salary", salarySchema);



// add