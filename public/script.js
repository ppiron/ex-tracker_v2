const form = document.getElementById("add-exercise");
const button = document.querySelectorAll('.button')[1];
const inputs = document.querySelectorAll(".required");
const dateInput = document.querySelectorAll(".date")[0];
const error = document.querySelectorAll(".errorMessage")[1]
const dateError = document.querySelectorAll(".errorMessage")[0]
let invalidCount = 0
// inputs.forEach(input => console.log(input))

button.addEventListener('click', function(event) {
  inputs.forEach(function(input) {
    if (input.value === '') {
      input.classList.add('invalid')
      invalidCount += 1
    }
  })
  if (!/\d\d\d\d-\d\d-\d\d/.match(dateInput.value)) {
    dateInput.classList.add('invalid')
    error.classList.remove('hidden')
    invalidCount += 1
  }
  invalidCount === 0 ? form.submit() : error.classList.remove('hidden')
})

inputs.forEach(function(input) {
  
  input.addEventListener('input', function(event) {
    if (input.classList.contains('invalid')) {
      input.classList.remove('invalid')
      invalidCount -= 1
      if (invalidCount === 0) {
        error.classList.add('hidden')
      }
    }
  })
})
