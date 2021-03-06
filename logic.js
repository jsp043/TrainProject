// Initialize Firebase

var config = {
    apiKey: "AIzaSyCP1ehnmjX84XfJSQ_HZxbJNEHhW-KqXgc",
    authDomain: "train-time-30b33.firebaseapp.com",
    databaseURL: "https://train-time-30b33.firebaseio.com",
    storageBucket: "train-time-30b33.appspot.com",
    messagingSenderId: "830225520752"
  };
  firebase.initializeApp(config);



// VARIABLES
var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;


// FUNCTIONS + EVENTS
$("#addTrain").on("click", function() {

  trainName = $('#nameInput').val().trim();
  destination = $('#destinationInput').val().trim();
  firstTrainTime = $('#firstTrainInput').val().trim();
  frequency = $('#frequencyInput').val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

    return false;
});


// MAIN PROCESS + INITIAL CODE
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  // update the variable with data from the database
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  
  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment(); 

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");


  // add table
  var tr = $('<tr>');
  var a = $('<td>');
  var b = $('<td>');
  var c = $('<td>');
  var d = $('<td>');
  var e = $('<td>');
  a.append(trainName);
  b.append(destination);
  c.append(frequency);
  d.append(formatNextArrival);
  e.append(minutesAway);
  tr.append(a).append(b).append(c).append(d).append(e);
  $('#newTrains').append(tr);


  }, function (errorObject) {

  // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);

});
