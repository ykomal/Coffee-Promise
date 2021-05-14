function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

let isStopped = false;
const number = randomNumber(1,1000);
window.alert("Random number generated : " + number);

let promise = new Promise((resolve, reject) => {
    setTimeout( function() {
      if(number%3 === 0 || isStopped){
          isStopped = false;
          reject("Failed!"); // Failing every 1/3 scenarios
      }
      resolve("Success!")  // Yay! Everything went well!
    }, 3000);
});

let pourMilkPromise = new Promise((resolve, reject) => {
    setTimeout( function() {
      if(number%7 === 0){
          reject("Pour milk Failed!"); // Failing every 1/3 scenarios
      }
      resolve("Pour milk was Success!")  // Yay! Everything went well!
    }, 250);
});

let pourMilkFailedPromise = new Promise((resolve, reject) => {
    setTimeout( function() {
        reject("Pour milk Failed!"); 
    }, 250);
});

let pourCoffeeFailedPromise = new Promise((resolve, reject) => {
    setTimeout( function() {
        reject("Pour coffee Failed!"); 
    }, 5000);
});

let pourCoffeePromise = new Promise((resolve, reject) => {
    setTimeout( function() {
      if(number%5 === 0){
          reject("Pour coffee Failed!"); // Failing every 1/3 scenarios
      }
      resolve("Pour coffee was Success!")  // Yay! Everything went well!
    }, 250);
});

function pourCoffee() {
    promise.then((successMessage) =>{
        window.alert("Pouring coffee was " + successMessage);
        return promise;
    }).then((successMessage) => {
        window.alert("Pouring milk was " + successMessage);
    }).catch((errorMessage) => {
        window.alert("One of the steps "+ errorMessage);
    }).finally(() => {
        window.alert("Finished pouring coffee!");
    })
}

function pourMilk() {
    promise.then((successMessage) => {
        window.alert("Pouring milk was " + successMessage);
    }).catch((errorMessage) => {
        window.alert("One of the steps "+ errorMessage);
    }).finally(() => {
        window.alert("Finished pouring milk!");
    })
}

function pourCoffeeAlternatively() {
    Promise.all([pourMilkPromise, pourCoffeePromise])
    .then((successMessage) => {
        window.alert("Finished "+ successMessage);
    })
    .catch((errorMessage) => {
        window.alert("Finished "+ errorMessage);
    })
}

function pourCoffeeRace() {
    Promise.race([pourCoffeePromise, pourMilkFailedPromise])
    .then((successMessage) => {
        window.alert("Finished "+ successMessage);
    })
    .catch((errorMessage) => {
        window.alert("Finished "+ errorMessage);
    })

    Promise.race([pourCoffeeFailedPromise, pourMilkPromise])
    .then((successMessage) => {
        window.alert("Finished "+ successMessage);
    })
    .catch((errorMessage) => {
        window.alert("Finished "+ errorMessage);
    })
}

function stopExecution(){
    isStopped = true;
}
