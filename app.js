const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));

const movies = {
  "1": {
    name: "Avengers: Endgame",
    time: "10:00 AM",
    price: 200
  },
  "2": {
    name: "Inception",
    time: "01:00 PM",
    price: 180
  },
  "3": {
    name: "Interstellar",
    time: "06:00 PM",
    price: 250
  }
};

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Movie Ticket Booking</title>
<style>
body{
    font-family:Arial,sans-serif;
    margin:0;
    padding:30px;
    background:linear-gradient(135deg,#141E30,#243B55);
}
h1{
    text-align:center;
    color:#FFD700;
}
.movies{
    display:flex;
    justify-content:center;
    gap:20px;
    flex-wrap:wrap;
    margin:30px 0;
}
.card{
    width:250px;
    padding:20px;
    border-radius:15px;
    color:white;
    text-align:center;
}
.red{background:#ff4b2b;}
.blue{background:#0093E9;}
.green{background:#00b894;}

form{
    max-width:500px;
    margin:auto;
    background:white;
    padding:25px;
    border-radius:15px;
}

input,select{
    width:100%;
    padding:12px;
    margin:10px 0;
    box-sizing:border-box;
}

button{
    width:100%;
    border:none;
    padding:12px;
    background:#dd2476;
    color:white;
    border-radius:8px;
    cursor:pointer;
}
</style>
</head>
<body>

<h1>🎬 Movie Ticket Booking</h1>

<div class="movies">

<div class="card red">
<h2>Avengers</h2>
<p>⏰ 10:00 AM</p>
<p>₹200</p>
</div>

<div class="card blue">
<h2>Inception</h2>
<p>⏰ 01:00 PM</p>
<p>₹180</p>
</div>

<div class="card green">
<h2>Interstellar</h2>
<p>⏰ 06:00 PM</p>
<p>₹250</p>
</div>

</div>

<form method="POST" action="/book">

<input
type="text"
name="customer_name"
placeholder="Enter Name"
required>

<select name="movie_id">
<option value="1">Avengers: Endgame</option>
<option value="2">Inception</option>
<option value="3">Interstellar</option>
</select>

<input
type="number"
name="seats"
min="1"
placeholder="Number of Seats"
required>

<button type="submit">🎟️ Book Ticket</button>

</form>

</body>
</html>
`);
});

app.post("/book", (req, res) => {

  const customerName = req.body.customer_name;
  const movieId = req.body.movie_id;
  const seats = parseInt(req.body.seats);

  const movie = movies[movieId];

  if (!movie) {
    return res.status(400).send("Invalid movie selected");
  }

  const total = movie.price * seats;

  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Booking Confirmed</title>
<style>
body{
    font-family:Arial,sans-serif;
    background:linear-gradient(135deg,#11998e,#38ef7d);
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    margin:0;
}

.card{
    background:white;
    padding:30px;
    width:400px;
    border-radius:15px;
    text-align:center;
    box-shadow:0 0 15px rgba(0,0,0,0.3);
}

.btn{
    display:inline-block;
    margin-top:20px;
    background:#6c63ff;
    color:white;
    padding:10px 20px;
    text-decoration:none;
    border-radius:6px;
}
</style>
</head>
<body>

<div class="card">
<h1>✅ Booking Confirmed</h1>

<p><b>Name:</b> ${customerName}</p>
<p><b>Movie:</b> ${movie.name}</p>
<p><b>Show Time:</b> ${movie.time}</p>
<p><b>Seats:</b> ${seats}</p>
<p><b>Total Amount:</b> ₹${total}</p>

<a class="btn" href="/">Book Another Ticket</a>
</div>

</body>
</html>
`);
});

app.listen(PORT, "0.0.0.0", function () {
  console.log("Movie Booking App running on port " + PORT);
});
