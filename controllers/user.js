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
exports.handleTouchTap = async (req, res, next) => {
  const uid = req.params.id;
  const score = req.params.score;
  try {
    const result = await new sql.Request()
      .input("App", uid)
      .input("score", score)
      .execute("touchHandleTap");
    console.log(result.recordset);
    res.status(200).json({ data: result.recordset });
  } catch (err) {
    throw err;
  }
};
exports.handleSocial = async (req, res, next) => {
  const uid = req.params.id;
  const typ = req.params.typ;
  try {
    const result = await new sql.Request()
      .input("_id", uid)
      .input("media", typ)
      .execute("add_socials");
    console.log(result.recordset);
    res.status(200).json({ data: result.recordset });
  } catch (err) {
    throw err;
  }
};

exports.ibsPrice = async (req, res, next) => {
  try {
    let url =
      "https://api.coingecko.com/api/v3/coins/ibs-2?x_cg_demo_api_key=CG-UgAd45a7HzxK582brYwFS6gN";
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((reData) => {
        res.status(200).json({
          inr: reData.market_data.current_price.inr,
          usd: reData.market_data.current_price.usd,
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } catch (e) {
    throw err;
  }
};
