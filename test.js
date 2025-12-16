/*function isValidDate(value) {
  const date = new Date(value);
  if(!isNaN(date.getTime())){
    console.log("Okay");
  }else{
    console.log("Error");
  }
}
isValidDate("2025-12-16");
isValidDate("16-12-2025");*/


const selectedDate = new Date("16-12-2025");

if (isNaN(selectedDate.getTime())) {
    console.log('Please enter a valid date');
}
if (selectedDate > new Date()) {
    console.log('Date cannot be in the future');
}