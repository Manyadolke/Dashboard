import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js "
import bcrypt from 'bcrypt'
import path from "path"





// to store image 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "public/uploads")
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+ path.extname(file.originalname))

    }
})

const upload = multer({storage:storage})


const addEmployee = async (req, res) => {
    try {
        console.log("Form Data:", req.body);
        console.log("Uploaded File:", req.file);

        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "user already registered in emp" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "" 
        });

        // Save user
        const savedUser = await newUser.save();

        // Store employee data
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        // Receive new employee
        await newEmployee.save();
        return res.status(200).json({ success: true, message: "employee created" });

    } catch (error) {
        console.error("Error in adding employee:", error); // Log the error
        return res.status(500).json({ success: false, error: "server error in adding employee" });
    }
};

const getEmployees = async (req,res) =>{
    try{


        const employees =  await Employee.find().populate('userId', {password:0}) .populate('department');
        // console.log("Fetched departments:", departments);
        return res.status(200).json({success:true,employees})
    }catch(error){

         return res.status(500).json({sucess: false,error:"get employees server error" })

    }
}

// add
const getEmployee = async (req, res) => {
    const { id } = req.params;
    
    try {
      
       let employee = await Employee.findById(id).populate('userId', { password: 0 })
        .populate('department');
        if(!employee){
            employee =   await Employee.findOne({userId:id}).populate('userId', { password: 0 })
        .populate('department');
        }
        console.log("Fetched Employee:", employee); 
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Error in fetching employee:", error); // Log the error
        return res.status(500).json({ success: false, error: "Server error in fetching employee" });
    }
};

const updateEmployee = async (req,res) =>{

    try{
        const {id} = req.params;
        

        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;


        console.log("Updating Employee ID:", req.params.id);
        console.log("Employee Data:", req.body);

        const employee= await Employee.findById(id);
        if(!employee){
            return res.status(400).json({ success: false, error: "employee not found" });

        }

        const user= await User.findById(employee.userId);

        if(!user){
            return res.status(400).json({ success: false, error: "user not found" });

        }

        const updateUser = await User.findByIdAndUpdate(employee.userId, {name})
        const updateEmployee = await Employee.findByIdAndUpdate(id, {
            maritalStatus,
            designation,
            salary,
            department
        } ,{ new: true });

        if(!updateEmployee || !updateUser){
            return res.status(400).json({ success: false, error: "document not found" });
        }

        return res.status(200).json({success:true,message:"employee updated"})

    }catch(error){
        console.error("Error updating employee:", error);
        return res.status(500).json({ success: false, error: "Update employees server error" });
    }



}

// const fetchEmployeesByDepId = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         const employee = await Employee.find({department: id})
//         return res.status(200).json({ success: true, employees });
//     } catch (error) {
//         console.error("Error in fetching employee:", error); // Log the error
//         return res.status(500).json({ success: false, error: "get employees server error" });
//     }
// }

const fetchEmployeesByDepId = async (req, res) => {
    const { id } = req.params;   
    
    try {
        const employees = await Employee.find({ department: id });
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Error in fetching employees:", error); // Log the error
        return res.status(500).json({ success: false, error: "Get employeebyDepId server error" });
    }
}


export {addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId  }