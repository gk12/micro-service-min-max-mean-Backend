const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');

const min = async (condition, _id = null) => {
  try {
    let pipeline = [
      {
        $match: condition,
      },
      {
        $group: {
          _id,
          minSalary: { $min: '$salary' },
        },
      },
    ];
    const result = await User.aggregate(pipeline).exec();

    if (result.length > 0) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const max = async (condition, _id = null) => {
  try {
    let pipeline = [
      {
        $match: condition,
      },
      {
        $group: {
          _id,
          maxSalary: { $max: '$salary' },
        },
      },
    ];
    const result = await User.aggregate(pipeline).exec();

    if (result.length > 0) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const mean = async (condition, _id = null) => {
  try {
    let pipeline = [
      {
        $match: condition,
      },
      {
        $group: {
          _id,
          meanSalary: { $avg: '$salary' },
        },
      },
    ];
    const result = await User.aggregate(pipeline).exec();

    if (result.length > 0) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const Findall = async (condition, _id = null) => {
  try {
    let pipeline = [
      {
        $match: condition,
      },
      {
        $group: {
          _id,
          meanSalary: { $avg: '$salary' },
          minSalary: { $min: '$salary' },
          maxSalary: { $max: '$salary' },

        
        },
      },
    ];
    const result = await User.aggregate(pipeline).exec();

    if (result.length > 0) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username === 'test' && password === 'test') {
      const secretKey = process.env.SECRETKEY;
      const token = jwt.sign({ username }, secretKey, { expiresIn: '2h' });

      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: 'something went wrong',
    });
  }
};
const addRecords = async (req, res) => {
  const { name, salary, currency, department, dub_department, on_contact } =
    req.body;
  try {
    const records = await User.create({
      name,
      salary,
      currency,
      department,
      dub_department,
      on_contact,
    });
    res.status(201).json({
      message: 'record created successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
    });
  }
};
const deleteRecords = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await User.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).json({
        message: 'Could not find record',
      });
    }
    res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

const fetchSs = async (req, res) => {
  try {
    const min_val = await min({});
    const max_val = await max({});
    const mean_val = await mean({});
    res.status(200).json({
      min: min_val,
      max: max_val,
      mean: mean_val,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
    });
  }
};
const fetchOnContact = async (req, res) => {
  try {
    const min_val = await min({ on_contract: true });
    const max_val = await max({ on_contract: true });
    const mean_val = await mean({ on_contract: true });
    res.status(200).json({
      min: min_val,
      max: max_val,
      mean: mean_val,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
    });
  }
};
const fetchDept = async (req, res) => {
  try {
    const min_val = await min({}, { department: '$department' });
    const max_val = await max({}, { department: '$department' });
    const mean_val = await mean({}, { department: '$department' });

    res.status(200).json({
      min1: min_val,
      max1: max_val,
      mean1: mean_val,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
    });
  }
};
const fetchDeptAndSubDept = async (req, res) => {
  try {
    // const min_val = await min(
    //   {},
    //   { department: '$department', sub_department: '$sub_department' }
    // );
    // const max_val = await max(
    //   {},
    //   { department: '$department', sub_department: '$sub_department' }
    // );
    // const mean_val = await mean(
    //   {},
    //   { department: '$department', sub_department: '$sub_department' }
    // );
    const all_expressions = await Findall(
      {},
      { department: '$department', sub_department: '$sub_department' }
    );
    
    res.status(200).json({
      // min1: min_val,
      // max1: max_val,
      // mean1: mean_val,
      all_expressions
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
    });
  }
};
module.exports = {
  addRecords,
  deleteRecords,
  login,
  fetchSs,
  fetchOnContact,
  fetchDept,
  fetchDeptAndSubDept,
};
