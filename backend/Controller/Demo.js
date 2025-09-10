const Connect_Select_Model = require("../Model/Demo");
// const Connect_Data_Model = new Connect_Select_Model();


class User_Controler {
    Select = async (req, res, next) => {
        res.send('Yes');
    }

}

module.exports = User_Controler