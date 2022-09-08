const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const cors = require("cors");

const connection = require("../server/dbConfig");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM contact_crud WHERE id= ?";
  connection.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM contact_crud";
  connection.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  try {
    const { name, email, contact } = req.body;
    console.log(req.body);
    const sqlInsert =
      "INSERT INTO contact_crud(name, email, contact) VALUES (?, ?, ? )";
    connection.query(sqlInsert, [name, email, contact], (error, result) => {
      if (error) {
        //console.log(error);
        res.send(error);
      } else {
        res.send(result);
      }
    });
  } catch (error) {}
});

app.put("/api/put/:id", (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const { id } = req.params;
    console.log(req.body);
    const sqlUpdate = `UPDATE contact_crud SET name='${name}', email='${email}', contact='${contact}' WHERE id=${id}`;
    connection.query(sqlUpdate, (error, result) => {
      if (error) {
        //console.log(error);
        res.send(error);
      } else {
        res.send(result);
      }
    });
  } catch (error) {}
});

app.delete("/api/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const sqlInsert = `DELETE FROM contact_crud WHERE id=${id}`;
    connection.query(sqlInsert, (error, result) => {
      if (error) {
        //console.log(error);
        res.send(error);
      } else {
        res.send(result);
      }
    });
  } catch (error) {}
});

app.get("/", (req, res) => {
  //   const sqlInsert =
  //     "INSERT INTO contact_crud(name, email, contact) VALUES ('john doe', 'johndoe@gmail.com', '123456789' )";
  //   db.query(sqlInsert, (error, result) => {
  //     console.log("error", error);
  //     console.log("result", result);
  //     res.send("Hello Express");
  //   });
});

app.listen(port, () => {
  console.log(`Server is running on the port ${port}.`);
});
