const connectDB = require("./Db");
const connectSchema = require("../Schema/Demo");

class Database_Acount {
    Select_M = async (Callback) => {
        try {
            await connectDB();
            const result = await connectSchema.find({});
            Callback(null, result);
        } catch (error) {
            Callback(error);
        }
    };


    Add__M = async (dataAddNew, Callback) => {
        try {
            const addNew = new connectSchema(dataAddNew);
            const result = await addNew.save();
            Callback(null, result);
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = Database_Acount;
