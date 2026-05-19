const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const projectRoutes = require("./routes/projectRoute");
const taskRoutes = require("./routes/taskRoute");
const dashboardRoutes = require("./routes/dashboardRoute");

const app = express();

const PORT =
   process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(
   "/projects",
   projectRoutes
);

app.use(
   "/tasks",
   taskRoutes
);

app.use(
   "/dashboard",
   dashboardRoutes
);

sequelize.sync()
   .then(() => {

      console.log(
         "Database Connected Successfully"
      );

      app.listen(PORT, () => {

         console.log(
            `Server is running on http://localhost:${PORT}`
         );
      });

   })
   .catch((error) => {
      console.log(
         "Database Connection Error",
         error
      );
   });

module.exports = app;