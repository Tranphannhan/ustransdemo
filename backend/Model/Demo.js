const connectDB = require("./Db");
const connectSchema = require("../Schema/User"); 

class Database_Acount {
    Select_M = async (Callback) => {
        try {
            await connectDB();
            const result = await connectSchema.find ({});
            Callback (null , result);
        } catch (error){
            Callback(error);
        }
    };

    Add__M  = async (dataAddNew , Callback) => {
        try {
            const addNew = new connectSchema (dataAddNew);
            const result = await addNew.save ();
            Callback (null , true);
        }catch (error){
            console.log(error);
        }
    }

    Login__M = async (SDT  , Callback) => {
        try {
            await connectDB();
            const result = await connectSchema.findOne ({SDT })
            .select ('Password');
                Callback (null , result);
        }  catch (error){
            console.log(error);
        } 
    }

    Search__M  = async (SDT  , Callback) => {
        try {
            await connectDB();
               const result =  await connectSchema
                .find ({ SDT : String (SDT)})
                .select ('Name , Avatar');
                    Callback (null , result);
        }  catch (error){
            console.log(error);
        } 
    }


    Delete__M  = async (id , Callback) => {
        try {
            await connectDB();
            const result = await connectSchema.findByIdAndDelete (id);
            Callback (null , true);
        }catch (error){
            console.log(error);
        }
    }

    Disable__M = async (id , Callback) => {
           try {
            await connectDB();
            const result = await connectSchema.findByIdAndUpdate (id , {Status : false});
            Callback (null , true);
        }catch (error){
            console.log(error);
        }
    }



}

module.exports = Database_Acount;
