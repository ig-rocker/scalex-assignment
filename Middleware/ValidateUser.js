import jwt from "jsonwebtoken";


const validateUser = async (req, res, next) => {
  const token = req.headers["auth-token"];
  try {
    if (!token) {
      return res.status(401).send("Access denied");
    }
    const data = jwt.verify(token, 'your_secret_key');
    if(data.role==='admin'){
      req.body={role:'admin'}
    }
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

export default validateUser;