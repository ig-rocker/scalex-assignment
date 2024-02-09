import jwt from "jsonwebtoken";

const User=[{
    "username":"satyam@gmail.com",
    'password':"Test@123",
    'role':'admin'
},{
    "username":"test@gmail.com",
    'password':"Test@123",
    'role':'user'
}]

const loginUser=function(req,res){
    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({ message: "Please fill all fields!" });
        }
        const user=User.find(user => user.username === username &&  user.password === password);
        if(user){
            const token = jwt.sign(user, 'your_secret_key', { expiresIn: '1h' });
            res.status(200).json({message:"User Login Succesffuly!",'token':token})
        }else{
            res.status(400).json({ message: "Username or password mismatched!" });
        }    
    }catch(error){
        res.status(500).json({ message: "Server error "+error });
    }
}

export default loginUser;
