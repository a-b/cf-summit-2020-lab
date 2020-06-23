lemonadeColor=""
lastCount=0
counter=0
currentNumber=0
lastActionNumber=0
minCount=0
latestNumber=0


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showLemonade(color) {
  lemonadeColor = color
  document.querySelector("#lemonade_pitcher").style.display = "none"

  for(i = 1; i <= 5; i++) {
    document.querySelector("#glass" + i).style.display = "none"
  }

  drink = ["#path52795", "#path53221-9-9-9-1-1", "#path53221-9-9-9-1-1-9", "#path53221-9-9-9-1-1-9-8", "#path53221-9-9-9-1-1-9-8-1", "#path53221-9-9-9-1-1-9-8-1-2"]
  for (i=0; i < drink.length; i++) {

    if (color == "original-recipe") {
      document.querySelector(drink[i]).style.fill = "rgb(242, 214, 94)" // yellow

    } else if (color == "new-recipe") {
      document.querySelector(drink[i]).style.fill = "rgb(113, 115, 76)" // green
    }
  }

  if (color == "original-recipe" || color ==  "new-recipe") {

    document.querySelector("#lemonade_pitcher").style.display = "inline"
    for(i = 1; i <= 5; i++) {
      document.querySelector("#glass" + i).style.display = "inline"
    }
  }
}

function showSigns(number) {
  if(number > 0) {
    document.querySelector("#city_map").style.display = "inline"
  } else {
    document.querySelector("#city_map").style.display = "none"
  }

  document.querySelector("#lemonade_signs").style.display = "inline"

  for(i = 1; i <= 8; i++) {
    document.querySelector("#lemonade_sign" + i).style.display = "none"
  }

  for(i = 1; i <= number; i++) {
    if(i <= 8){
      try {
        document.querySelector("#lemonade_sign" + i).style.display = "inline"
      }
      catch(err) {
        console.log("showSigns", err)
      }
    }
  }
  //currentNumber = number
}

async function showCustomers(number) {
//  if(number > 0){
//    await sleep(5000)
//  }
  if(number > lastActionNumber){
    //add more customers after the counter is up
    switch(number){
      case 1:
        minCount=40
        break;
      case 2:
        minCount=30
        break;
      case 3:
        minCount=20
        break;
      case 4:
        minCount=10
        break;
      case 5:
        minCount=5
        break;
      case 6:
        minCount=4
        break;
      case 7:
        minCount=3
        break;
      case 8:
        minCount=2
        break;
      default:
        minCount=2
    }
    //window.alert("ADDING ==> number: " + number + " lastActionNumber: " + lastActionNumber + " latestNumber: " + latestNumber + " counter: " + counter + " lastCount: " + lastCount + " minCount: " + minCount);
    if((counter - lastCount) >= minCount){
      for(j = 1; j < number; j++) {
        await sleep(3000)
          if(j <= 8){
            try {
              document.querySelector("#customer" + j).style.display = "inline"
            }
            catch(err) {
              console.log("showCustomers", err)
            }
            if(lemonadeColor == "new-recipe"){
              try {
                document.querySelector("#sad-customer-face-" + j).style.display = "inline"
              }
              catch(err) {
                console.log("showCustomers", err)
              }

            }
          }
          lastCount = counter
       }
      lastActionNumber = number
    }
  } else if (latestNumber < lastActionNumber){
    tot = lastActionNumber
    for(k = tot; k > latestNumber; k--) {
    //  window.alert("k: " + k + " -- lastActionNumber: " + lastActionNumber + " -- latestNumber: " + latestNumber + " -- number: " + number)
      //await sleep(2000)
      try {
        document.querySelector("#customer" + k).style.display = "none"
      }
      catch(err) {
        console.log("showCustomers", err)
      }
      try {
        document.querySelector("#sad-customer-face-" + k).style.display = "none"
      }
      catch(err) {
        console.log("showCustomers", err)
      }
    }
    lastCount = counter
    lastActionNumber = number
  }
}

function siteOnline(online) {
  if (online) {
    document.querySelector("#site-up").style.display = "inline"
    document.querySelector("#site-down").style.display = "none"
  } else {
    document.querySelector("#site-up").style.display = "none"
    document.querySelector("#site-down").style.display = "inline"
  }
}

function pullAPI() {
  var request = new XMLHttpRequest()

  request.open('GET', '/api', true)
  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(this.response)

      console.info("API response", data)
      latestNumber = data.ads
      showLemonade(data.lemonade)
      if(lastActionNumber != latestNumber){
        showSigns(data.ads)
        showCustomers(data.ads)
      } else {
        lastCount = counter
      }
      siteOnline(true)
    } else {
      console.log('Error accessing API')
      siteOnline(false)
    }
  }

  request.send()
}

window.onload = function() {
  setInterval(function() {
    pullAPI()
    counter++
  }, 2000);
}
