const Connect_Select_Model = require("../Model/Demo");
const Connect_Data_Model = new Connect_Select_Model();


class User_Controler {
    Select = async (req, res, next) => {
        res.send('Yes');
    }


    Add = async (req, res, next) => {
        const data = {
            lat: req.body.lat,
            lng: req.body.lng,
            speed: req.body.speed,
            status: req.body.status,
            updatedAt: req.body.updatedAt
        }

        Connect_Data_Model.Add__M(data, (error, result) => {
            if (error) return next(error);
            res.status(201).json({ message: 'Thêm thành công' });
        });
    }


}

module.exports = User_Controler