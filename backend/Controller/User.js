const Connect_Select_Model = require("../Model/User");
const Connect_Data_Model = new Connect_Select_Model();    
const encryptionPaswoord = require ('../Middleware/Password');
const connectEncryptionPaswoord  = new encryptionPaswoord ();
const connectChekSize = require ('../Middleware/image');
const connectToken = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Chữ ký


class User_Controler {
    Select = async (req , res , next) => {
        Connect_Data_Model.Select_M ((error , result) => {
            if (error) return next (error);
            return res.status(200).json ({message : 'Lấy dữ liệu thành công' , Data : result.length === 0 ? [] : result});
        });
    }

    Login = async (req , res , next) => {
        const bcrypt = require('bcrypt');
        const {SDT , Password} = req.body;

        Connect_Data_Model.Login__M (SDT , async (error , result) => {
            if (error) return next (error);
            if (!result) return res.status (500).json ({message : 'Đăng nhập thất bại'});
            const isMatch = await bcrypt.compare(Password, result.Password);
            if (!isMatch) return res.status (500).json ({message : 'Đăng nhập thất bại'});
            const dataToken = { _id : result._id }
            const token = connectToken.sign(dataToken, secretKey, { expiresIn: "1h" });
            res.status (201).json ({message : 'Login thành công' , token});
        });
    }

    Search  = async (req , res , next) => {
        const SDT = req.query.SDT || null;
        if (!SDT) return res.status (201).json ({message : 'Tài khoản không tồn tại' , data : []});
        Connect_Data_Model.Search__M (SDT , (error , result) => {
            if (error) return next (error);
            if (result.length === 0 && !result) return res.status (201) ({message : 'Tài khoản không tồn tại' , data : []});
            return res.status (201).json ({message : 'YES' , data : result});
        });
    }




    Add = async (req , res , next) => {
        const getImg = req.file ? req.file.filename : 'Err-image.png';
        const checkSizeImg = await connectChekSize.chekSize (req.file);
        if (!checkSizeImg) return res.status (500).json ({message : 'Kích thước hình ảnh quá 5 mb'});
        const getPassword = req.body.Password || null;
        if (!getPassword) return res.status (500).json ({message : 'Thêm mới tài khoản thành công'});
        const passwordEncryption = await connectEncryptionPaswoord.hashPassword (getPassword);
        const dataAdd = {
            Name : req.body.Name,
            Password : passwordEncryption,
            SDT : req.body.SDT,
            Avatar : getImg,
            CoverPhoto : '404.jpg',
            Status : true
        }

        Connect_Data_Model.Add__M (dataAdd , (error , result) => {
            if (error) return next (error);
            if (!result) return res.status (500).json ({message : 'Thêm mới tài khoản thành công'});
            return res.status (201).json ({message : 'Thêm mới tài khoản thành công'});
        });
    }


    Delete = async (req , res , next) => {
        const id = req.params.ID;
        if (!id) return res.status (500).json ({message : 'Xóa tài khoản thất bại'});
        Connect_Data_Model.Delete__M (id , (error , result) => {
            if (error) return next (error);
            if (!result) return res.status (500).json ({message : 'Xóa tài khoản thất bại'});
            return res.status (201).json ({message : 'Xóa tài khoản thành công'});
        });
    }

    
    Disable = async (req , res , next) => {
        const id = req.params.ID || null;
        if (!id) return res.status (500).json ({message : 'Vô hiệu hóa tài khoản thất bại'});
        Connect_Data_Model.Disable__M (id , (error , result) => {
            if (error) return next (error);
            if (!result) return res.status (500).json ({message : 'Vô hiệu hóa tài khoản thất bại '});
            return res.status (201).json ({message : 'Vô hiệu hóa tài khoản thành công'});
        });
    }





    
 
}

module.exports = User_Controler