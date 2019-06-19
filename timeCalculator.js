const moment = require('moment'); // Moment object 
const prompts = require('prompts'); // Prompt object

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
function timeLeft(timeInput) {
  let currentTime = moment().format("h:mm:ss"); // Current time
  let timeLeft = moment(timeInput, "hh:mm:ss").fromNow(); // Time until input time

  console.log("Time at Start of Program: " + currentTime); // Display time at start up to console
  console.log("Specified time " + timeLeft); // Display time until input time to console
  

}