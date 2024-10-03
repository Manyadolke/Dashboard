import Department from "../models/Department.js";

const getDepartments =async (req, res)=>{
    try{


        const departments =  await Department.find();
        console.log("Fetched departments:", departments);
        return res.status(200).json({success:true,departments})


    }catch(error){

         return res.status(500).json({sucess: false,error:"get department server error" })

    }
}
    const addDepartment =async  (req,res) =>{

    try{
        const{dep_name,description}=req.body;
        const newDep= new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success:true, department:newDep })


    }catch(error){
        return res.status(500).json({success: false,error:"add department server error"

        })
    }


}

const getDepartment = async(req,res)=>{

    try{
        const{id} = req.params;
        const department = await Department.findById({_id:id})
        return res.status(200).json({success:true,department})


    }catch(error){

         return res.status(500).json({sucess: false,error:"get department server error" })

    }
    }

    const updateDepartment = async (req,res) => {
        try{
            const {id} = req.params;
            const {dep_name, description} = req.body;
            const updateDep = await Department.findByIdAndUpdate({_id:id},{
                dep_name,
                description
            })
            return res.status(200).json({success:true,updateDep})


        }catch(error){
    
             return res.status(500).json({sucess: false,error:"edit department server error" })
    
        }
        }
    

        const deleteDepartment = async (req, res) => {
            try {
                const { id } = req.params;
                console.log("Attempting to delete department with ID:", id);
        
                const deleteDep = await Department.findByIdAndDelete({ _id: id });
                
                if (!deleteDep) {
                    console.log("Department not found with ID:", id);
                    return res.status(404).json({ success: false, error: "Department not found" });
                }
        
                console.log("Department deleted successfully with ID:", id);
                return res.status(200).json({ success: true, message: "Department deleted successfully" });
            } catch (error) {
                console.error("Error occurred while deleting department:", error);
                return res.status(500).json({ success: false, error: "delete department server error" });
            }
        };
        
        // add



export {getDepartments, getDepartment, updateDepartment , deleteDepartment}
export {addDepartment}