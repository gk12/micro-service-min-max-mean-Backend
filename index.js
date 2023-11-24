require('./db/db');
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const {
  addRecords,
  deleteRecords,
  login,
  fetchSs,
  fetchOnContact,
  fetchDept,
  fetchDeptAndSubDept,
} = require('./controller/userController');
const app = express();
app.use(express.json());
const port = process.env.PORT;

function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - Token not provided' });
  }
  const secretKey = process.env.SECRETKEY
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    req.user = decoded; 
    next(); 
  });
}

app.post('/login', login);
app.post('/addrecords', verifyToken, addRecords);
app.delete('/deleterecords/:id',verifyToken, deleteRecords);
app.get('/fetchss',verifyToken, fetchSs);
app.get('/fetchoncontact', verifyToken,fetchOnContact);
app.get('/fetchdepartment',verifyToken, fetchDept);
app.get('/fetchdepartmentandsubdept', verifyToken,fetchDeptAndSubDept);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
