function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showCustomers(number) {
  for(i = 1; i <= 8; i++) {
    document.querySelector("#customer" + i).style.display = "none"
  }


  for(i = 1; i <= number; i++) {
    try {
      document.querySelector("#customer" + i).style.display = "inline"
      await sleep(300)
    }
    catch(err) {
      console.log("showCustomers", err)
    }
  }

}

function showSigns(number) {
  document.querySelector("#city_map").style.display = "inline"
  document.querySelector("#lemonade_signs").style.display = "inline"

  for(i = 1; i <= 8; i++) {
    document.querySelector("#lemonade_sign" + i).style.display = "none"
  }

  for(i = 1; i <= number; i++) {
    try {
      document.querySelector("#lemonade_sign" + i).style.display = "inline"
    }
    catch(err) {
      console.log("showSigns", err)
    }
  }

}

function showLemonade(color) {

    document.querySelector("#lemonade_pitcher").style.display = "none"

    for(i = 1; i <= 5; i++) {
      document.querySelector("#glass" + i).style.display = "none"
    }

    drink = ["#path52795", "#path53221-9-9-9-1-1", "#path53221-9-9-9-1-1-9", "#path53221-9-9-9-1-1-9-8", "#path53221-9-9-9-1-1-9-8-1", "#path53221-9-9-9-1-1-9-8-1-2"]
    for (i=0; i < drink.length; i++) {

      if (color == "yellow") {
        document.querySelector(drink[i]).style.fill = "rgb(242, 214, 94)" // yellow

      } else if (color == "green") {
        document.querySelector(drink[i]).style.fill = "rgb(0, 214, 0)" // green
      }
    }

    if (color == "yellow" || color ==  "green") {

        document.querySelector("#lemonade_pitcher").style.display = "inline"
        for(i = 1; i <= 5; i++) {
          document.querySelector("#glass" + i).style.display = "inline"
        }
    }

}


function pullAPI() {
  var request = new XMLHttpRequest()


  request.open('GET', '/api', true)
  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(this.response)

      console.info("API response", data)
      showSigns(data.ads)
      showLemonade(data.lemonade)
      showCustomers(8)
    } else {
      console.log('Error accessing API')
    }
  }

  request.send()
}

window.onload = function() {
  setInterval(function() {
    pullAPI()
  }, 2000);
}