
const express = require("express");

const app = express();

const bodyParser = require("body-parser");

//Creating the Room 

//middleware

app.use(bodyParser.json());

//Declaring empty variables to store data

const rooms = [];
const customers = [];
const bookings = [];

app.post('/Create', (req, res) => {

    const { roomName, nofSeats, amenities, pphr } = req.body;

    const room = {
        id: rooms.length + 1,
        roomName,
        nofSeats,
        amenities,
        pphr
    }

    rooms.push(room);

    res.json(room)

});

app.get('/viewrooms',(req,res) => {
    res.json(rooms);
});


app.post('/booking',(req,res) => {
    const { customerName,date, startTime, endTime, roomId } = req.body;
    const room = rooms.find(room =>room.id == roomId);
    if(!room) {
        res.status(404).json({error:'Room not Found'});
        return;
    }

    const booking ={
        id: bookings.length+1,
        customerName,
        date,
        startTime,
        endTime,
        roomId,
        roomName:room.roomName,
        bookedStatus:true
    };

    const stime = bookings.find(stime =>stime.startTime == startTime);
    const etime = bookings.find(etime =>etime.endTime == endTime);
    const dat = bookings.find(dat =>dat.date == date);
    const rId = bookings.find(rId =>rId.roomId == roomId);
   


    if((stime) && (etime) && (dat) && (rId))
                
        
    {
        res.status(404).json({error:'Slot Not Available'});
        return;

    }

    else {
    res.json(booking);
    }
    bookings.push(booking);     

 
});

// api endpoint to view all the rooms with the booked data


app.get('/viewbookings',(req,res) => {
    const bookingsroom = bookings.map(booking => {
        const {roomName ,bookedStatus,customerName,date,startTime,endTime} = booking;
        return {roomName, bookedStatus, customerName, date, startTime, endTime} 
    });
    res.json(bookingsroom);
});




// List all customers with booked data

app.get('/viewcustomers',(req,res) => {
    const bookedRooms = bookings.map(booking => {
        const {roomName ,bookedStatus,customerName,date,startTime,endTime} = booking;
        return {customerName, roomName, date,startTime, endTime} 
    });
    res.json(bookedRooms);
});

// List how many times a customer has booked the room with below details

app.get('/bookings/:customerName', (req, res) => {
    const { customerName } = req.params;
  
    // Filter the bookings based on the customer name
    const customerBookings = bookings.filter(
      booking => booking.customerName === customerName
    );
  
    // Get the count of bookings
    const bookingCount = customerBookings.length;
  
    // Send the response
    res.json({ customerBookings, bookingCount });
  });


app.listen(8000, () => {
    console.log("connected successfully")
});