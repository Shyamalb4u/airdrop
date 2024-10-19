const express = require("express");
const sql = require("mssql");
const dbconfig = require("../dbconfig");

sql.connect(dbconfig, (err) => {
  if (err) {
    throw err;
  }
});
exports.getall = (req, res, next) => {
  new sql.Request()
    .execute("getAll")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getLeaders = (req, res, next) => {
  new sql.Request()
    .execute("getLeaders")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getUser = (req, res, next) => {
  const uid = req.params.id;
  console.log(uid);
  new sql.Request()
    .input("name", uid)
    .execute("get_user")
    .then((result) => {
      res.status(200).json({ data: result.recordset });
    })
    .catch((err) => {
      throw err;
    });
};
exports.signup = async (req, res, next) => {
  const uid = req.body.uid;
  const fname = req.body.fname;
  const spn = req.body.spn;
  try {
    const result = await new sql.Request()
      .input("name", uid)
      .input("spn", spn)
      .input("fName", fname)
      .execute("join_insert");
    console.log(result.recordset);
    res.status(200).json({ data: result.recordset });
  } catch (err) {
    throw err;
  }
};
exports.handleTouch = async (req, res, next) => {
  const uid = req.params.id;
  try {
    const result = await new sql.Request()
      .input("App", uid)
      .execute("touchHandle");
    console.log(result.recordset);
    res.status(200).json({ data: result.recordset });
  } catch (err) {
    throw err;
  }
};
