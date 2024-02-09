import jwt from "jsonwebtoken";

const isAdminUser = async (req, res, next) => {
  const token = req.headers["auth-token"];
  try {
    if (!token) {
      return res.status(401).send("Access denied");
    }
    const data = jwt.verify(token, 'your_secret_key');
    if(data.role==='admin'){
        next();
    }else{
        res.status(403).send("Not Admin User");
    }
    
  } catch (error) {
    res.status(401).send(error);
  }
};

export default isAdminUser;