var dateTime = new Date(); // Date Object to read time at start up 
const moment = require('moment');
const prompts = require('prompts'); // Prompt object from module

getTime(); // Get input from user

// Prompts the user, asking them to input a time. Passes response and time at start up to timeLeft
async function getTime() {

  (async () => {
    const response = await prompts({ // Generates a response variable from the prompt specified
      type: 'number', // Type of the response 
      name: 'time', // Title of the response
      message: 'Enter a time (hhmmss)', // Message given to user as a prompt
    });

    let time = response.time; // Accesses response of user and saves to local variable 
    timeLeft(time); // Find time left until specified time
  })(); 
}

// First checks if time entered by user is valid, then calculates difference bettwen time enterend and 
// time at the start of the program
function timeLeft(timeInput, startHours, startMinutes) {
  let cTime = moment().format("h:mm:ss"); 
  let tleft = moment(timeInput, "hh:mm:ss").fromNow(); 

  console.log("Time at Start of Program: " + cTime); // Display time at start up to console
  console.log("Time Until Specified Time: " + tleft); // Display time until input time to console
}


