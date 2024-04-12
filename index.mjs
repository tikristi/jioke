var user = null;

import express from "express";
import path from "path";
import bodyParser from "body-parser";
import fs from "fs";

import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import cors from "cors";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "Jioke restaurant app",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
  return;
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/login.html"));
  return;
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    user = req.user;
    res.sendFile(path.join(__dirname, "/profile.html"));
    return;
  } else {
    res.redirect("/login");
    return;
  }
});

app.get("/dishes", (req, res) => {
  res.sendFile(path.join(__dirname, "/dish.html"));
  return;
});

app.get("/api", (req, res) => {
  if(user) {
    res.send(JSON.stringify(user));
    return;
  } else {
    res.send(null);
    return;
  }
});

app.post("/api", (req, res) => {
  if (user) {
    fs.readFile("users.json", function (err, data) {
      // Display the file content
      var users = JSON.parse(data);

      users[user.email]['orders'].push(req.body.order);
      user['orders'].push(req.body.order);


      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(403);
          return;
        } else {
          res.sendStatus(200);
          return;
        }
      });
      
  })
} else {
  res.sendStatus(403);
}
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    user = null;
    res.redirect('/');
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (fs.existsSync("users.json")) {
    fs.readFile("users.json", function (err, data) {
      // Display the file content
      var users = JSON.parse(data);

      if (email in users) {
        res.redirect("/login");
        return;
      }

      users[email.toLowerCase()] = {
        username: username,
        password: password,
        email: email,
        "orders": [],
      };

      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          console.log(err);
          res.redirect("/login");
          return;
        } else {
          req.login(users[email.toLowerCase()], (err) => {
            console.log(err);
            res.redirect("/profile");
          });
          return;
        }
      });
    });
  } else {
    var temp = {};
    temp[email.toLowerCase()] = {
      username: username,
      password: password,
      email: email,
      "orders": [],
    };

    fs.writeFile("users.json", JSON.stringify(temp), (err) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
        return;
      } else {
        req.login(temp[email.toLowerCase()], (err) => {
          console.log(err);
          res.redirect("/profile");
        });
        return;
      }
    });
  }
});

passport.use(
  new Strategy(function verify(username, password, cb) {
    const email = username.toLowerCase();

    if (fs.existsSync("users.json")) {
      fs.readFile("users.json", function (err, data) {
        // Display the file content
        if (err) {
          return cb(null, false);
        }

        var users = JSON.parse(data);

        if (!(email in users)) {
          return cb(null, false);
        }

        if (users[email]["password"] == password) {
          return cb(null, users[email]);
        } else {
          return cb(null, false);
          return;
        }
      });
    } else {
      return cb(null, false);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// starts a simple http server locally on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
