var dateTime = new Date(); // Date Object to read time at start up 

const startHour = dateTime.getHours(); // Get start up hours from objet
const startMinute = dateTime.getMinutes(); // Get start up minutes from object
const startSecond = dateTime.getSeconds(); // Get start up seconds from object 

getTime(startHour, startMinute, startSecond); // Get input from user

// Prompts the user, asking them to input a time. Passes response and time at start up to timeLeft
async function getTime(ch, cm, cs) {
  
  const prompts = require('prompts'); // Prompt object from module

  (async () => {
    const response = await prompts({ // Generates a response variable from the prompt specified
      type: 'number', // Type of the response 
      name: 'time', // Title of the response
      message: 'Enter a time (hhmmss)', // Message given to user as a prompt
    });

    let time = response.time; // Accesses response of user and saves to local variable 
    timeLeft(time, ch, cm, cs); // Find time left until specified time
  })(); 
}

// First checks if time entered by user is valid, then calculates difference bettwen time enterend and 
// time at the start of the program
function timeLeft(timeInput, startHours, startMinutes, startSeconds) {
  let hoursLeft = 0, minutesLeft = 0, secondsLeft = 0; // initialize hours, minutes, and seconds variables for time left
  let seconds,minutes,hours; // initialize variables to extract seconds, minutes, and hours from user input
  
  hours = Math.floor(timeInput / 10000); // Gets hours (top one or two digits) from the input
  timeInput %= 10000 // Removes hours from user input (top one or two digits)
  minutes = Math.floor(timeInput/100); // Gets minutes from remaining input
  timeInput %= 100 // Removes top two digits to leave seconds 
  seconds = timeInput; // Sets seconds equal to remaining input

  var flag = 0; // Flag to go back to user prompt if something is incorrectly input

  if (hours == 0) // Will only occur if the user has not entered a number with enough digits to constitue a
              // a time (mustt have 5 or 6 digits)
  {
    console.log("Plesae Enter Hours Minutes and Seconds"); // Output error message to console
    flag = 1; // Flag set high
  }
  if (hours > 24) { // Will occur if the user has input a number that is too high for hours
    console.log("Hours must be between 1 and 24"); // Output error message to console
    flag = 1; // Flag set high
  }
  if (minutes > 60) // Will occur if the user has input a number that is too high for minutes
  {
    console.log("Minutes must be between 0 and 60"); // Output error message to console
    flag = 1; // Flag set high
  }
  if (seconds > 60) // Will occur if the user has input a number that is too high for seconds
  {
    console.log("Seconds must be between 0 and 60"); // Output error message to console
    flag = 1; // Flag set high
  }

  if(flag) // Checks if flag is high (i.e. any of the error cases were triggered)
  {
    flag = 0; // Flag set low
    getTime(startHours,startMinutes,startSeconds); // Prompt user again, passing as paramaters time at start up
    return; // Exits the function to make sure the time left is only calculated once. 
  }
  
  if (startSeconds > seconds) // If the seconds of time input is lower than seconds of time at start up
  {
    minutes --; // subtracts one from minutes to correct calculation
    secondsLeft = (60+seconds) - startSeconds; // calculate seconds left with corrected seconds
  }
  else{ secondsLeft = seconds - startSeconds; } // General case calculation for seconds left

  if (startMinutes > minutes) // If the minutes of time input is lower than minutes of time at start up
  {
    hours --; // subtracts one from hours to correct calculation
    minutesLeft = (60+minutes) - startMinutes; // calculate seconds left with corrected seconds
  } 
  else { minutesLeft = minutes - startMinutes; } // General case calculation for minutes left

  if(startHours > hours) // If the hours of time input is lower than hours of time at start up
  {
    hoursLeft = (24+hours) - startHours; // calculate seconds left with corrected seconds
  }
  else { hoursLeft = hours - startHours; } // General case calculation for hours left

  var tleft = timeFormat(hoursLeft,minutesLeft,secondsLeft); // Format the time left
  var cTime = timeFormat(startHours,startMinutes,startSeconds); // Format the time at start up 
  console.log("Time at Start of Program: " + cTime); // Display time at start up to console
  console.log("Time Until Specified Time: " + tleft); // Display time until input time to console
}

// Format input hours minutes and seconds with colon between hours and 0 for upper digit when minutes
// and seconds are below 10. Assumes hours minutes and seconds are all correct
function timeFormat(h, m, s) {
  var time; // Local string variable to hold the time
  if (m < 10) { // If minutes is less than 10
    if (s < 10) { time = h + ":0" + m + ":0" + s; } // If seconds is less than 10 insert colons
                                                    // and 0 for both minutes and seconds
    else { time = h + ":0" + m + ":" + s} // Seconds is greater than 10, instert colons and 0 
                                          // for minutes
  }
  else { // Minutes is greater than 10 
    if (s < 10) { time = h + ":" + m + ":0" + s; } // If seconds is less than 10 insert colons 
                                                   // and 0 for minutes
    else { time = h + ":" + m + ":" + s} // If seconds is greater than 10, only inster colons
  }
  return time; // Return formatted time 
}

