$(document).ready(function(){
  // Sign-in Modal Trigger
  $('.modal').modal();
  $('.modal-trigger').modal();
  let userData = {}; 
  let userCoinData = {}; 
  let cryptoBal = 0; 

  // Grab logInBtn & SignUpBtn and make /login calls
  $("#logInBtn").on("click", function(event) {
    let user = {
      name: $('#name').val().trim(), 
      email: $('#email').val().trim(), 
      password: $('#password').val().trim()
    }
    // validate email and password length
    if (user.email.includes('@')) {
      if(user.password.length >= 6) {
        $.ajax({
          url: "/api/user/login",
          type: "POST",
          data: user,
        }).then(function(data) {
          // set token to local storage
          localStorage.setItem('token', data.token);
          loadUserData(data);       
        }); 
      } else {
        M.toast({html: 'Password must contain at least 6 characters'})
      }
    } else {
      M.toast({html: 'Please enter a valid email address'})
    }
  });

  $("#signUpBtn").on("click", function(event) {
    let newUser = {
      name: $('#name').val().trim(), 
      email: $('#email').val().trim(), 
      password: $('#password').val().trim()
    }
    // validate email and password length
    if (newUser.email.includes('@')) {
      if(newUser.password.length >= 6) {
        $.ajax({
          url: "/api/user",
          type: "POST",
          data: newUser,
        }).then(function(data) {
          // set token to local storage
          localStorage.setItem('token', data.token);
          loadUserData(data);       
        }); 
      } else {
        M.toast({html: 'Password must contain at least 6 characters'})
      }
    } else {
      M.toast({html: 'Please enter a valid email address'})
    }
  });

  function loadUserData(data) {
    // GET user data to display on page 
    $.ajax({
      url: "/api/user/:" + data.id, 
      type: "GET", 
      data: data, 
    }).then(function(resData) {
      // save user data to global var
      userData = {
        id: resData.id, 
        name: resData.name, 
        email: resData.email, 
        Banks: resData.Banks
      }

      // remove sign-in button
      $('.signInBtn').addClass('hide'); 
      $('.animated-chart').addClass('hide'); 
    
      // create welcome screen with market balance
      userDashboard(resData); 
             
      // add cards of all user coins (include image, name, amount, and modal button to update)
      // add Add Coin button
      $('.userCoins').html('<button data-target="addFav" class="addFav center btn modal-trigger">Add New Crypto</button>'); 
      $("#addCoinBtn").on("click", function(event) {
        // save user coin data to global var
        userCoinData = {
          UserId: userData.id,
          userEmail: userData.email, 
          cryptoId: $('#coinOptions').val(),
        }
        addFavs(userCoinData); 
      }); 

    }); 
  }; // END loadUserData

  function userDashboard(data) {
    loadCoinCards(data);
    $.ajax({
      url: "/api/user/:" + data.id, 
      type: "GET", 
      data: data, 
    }).then(function(resData) {
      let userBank = resData.Banks; 
      // check if user has coins already saved
      if (userBank.length === 0) {
        cryptoBal = 0; 
        $('.userMain').empty(); 
        let welcome = `<h2>Hold on for dear life ${resData.name}! #HODL</h2>`;
        let currentBal = `<h4>Current Crypto-Balance: $${cryptoBal}</h4>`;
        $('.userMain').append(welcome, currentBal); 
      } else {
        let balance = []; 
        userBank.forEach((coin) => {
          // call external api to get value of each coin value
          $.ajax({
            url: '/api/ticker/' + coin.cryptoId, 
            type: 'GET'
          }).then(function(resCoinData) {
            // logic for calculating user coins and market values
            cryptoBal = 0; 
            let newValue = coin.value * resCoinData.price; 
            balance.push(newValue); 
            balance.forEach(function(value) {
              cryptoBal += value;  
            }); 
            return cryptoBal; 
          }).then(function(cryptoBal) {
            $('.userMain').empty(); 
            let welcome = `<h2>Hold on for dear life ${resData.name}! #HODL</h2>`;
            let currentBal = `<h4>Current Crypto-Balance: $${cryptoBal}</h4>`;
            $('.userMain').append(welcome, currentBal); 
          });
        }); //END forEach
      };
    }); 
  }; 

  function addFavs(userCoinData) {
    // add logic for adding new coins
    $.ajax({
      url: `/api/user/:${userCoinData.userEmail}/bank`, 
      type: "POST", 
      data: userCoinData, 
    }).then(function(resData) { 
      loadCoinCards(userData); 
    });
  }

  function loadCoinCards(userData) {
    $.ajax({
      url: "/api/user/" + userData.id, 
      type: "GET", 
      data: userData, 
    }).then(function(resData) {
      let coinCards = resData.Banks; 
      if (coinCards.length === 0) {
        return; 
      } else {
        $('.coinCardContainer').empty(); 
        // get current market price for user coins
        coinCards.forEach((coin) => {
          $.ajax({
            url: '/api/ticker/' + coin.cryptoId, 
            type: 'GET'
          }).then(function(resCoinData) {
            let usdBal = resCoinData.price * coin.value; 
            let tempDiv = $(`<div class="col s12 m6 l4" id="${coin.cryptoId}">`); 
            let mainCard = $('<div class="card horizontal hoverable">'); 
            // get coin image
            let coinImage = ''
            switch(coin.cryptoId) {
              case 'ADA':
                coinImage = './assets/images/ada.Cardano.png';
                break;
              case 'BAT':
                coinImage = './assets/images/bat.BasicAttentionToken.png';
                break;
              case 'BTC':
                coinImage = './assets/images/btc.Bitcoin.png';
                break;
              case 'DOGE':
                coinImage = './assets/images/doge.Dogecoin.png';
                break;
              case 'ETH':
                coinImage = './assets/images/eth.Ethereum.png';
                break;
              case 'LTC':
                coinImage = './assets/images/ltc.Litecoin.png';
                break;
              case 'TRX':
                coinImage = './assets/images/trx.TronCoin.png';
                break;
              case 'VEN':
                coinImage = './assets/images/ven.VeChain.png';
                break;
              case 'XLM':
                coinImage = './assets/images/xlm.stellar.png';
                break;
              case 'XRP':
                coinImage = './assets/images/xrp.Ripple.png';
                break;
              default:
                coinImage = '#';
            }; 
          
            let imgDiv = $('<div class="card-image" style="padding-top: 30px">'); 
            imgDiv.append(`<img src="${coinImage}" style="max-width:80px; padding:5px">`);
            let cardDiv = $('<div class="card-stacked">'); 
            let cardReveal = $(`
            <div class="card-reveal updateForm">
            <span class="card-title grey-text text-darken-4">Update Coin Balance<i class="material-icons right">close</i></span>
            <form class="col s10 updateForm">
              <input placeholder="Update Balance" id="${coin.cryptoId}Bal" type="number" class="validate">
            </form>
            <div class="formBtn">
              <button class="btn-small updateCoin" id="updateCoin" data-email="${resData.email}" data-crypto="${coin.cryptoId}">Update</button>
            </div>
            </div>`);
            let cardContent = $('<div class="card-content" style="padding-top: 10px">'); 
            let cardInfo = 
            `<h5><b>${coin.cryptoId}</b></h5>\n
            <h6>USD Balance: $${usdBal}</h6>\n
            <h6>Coin Balance: ${coin.value}</h6>\n
            <h6>Coin Price: $${resCoinData.price}</h6>\n
            <a class="activator">Update</a>`
            cardContent.append(cardInfo); 
            cardDiv.append(cardContent); 
            mainCard.append(imgDiv, cardDiv, cardReveal); 
            tempDiv.append(mainCard); 
            $('.coinCardContainer').append(tempDiv); 
          });
        }); 
      }; 
    });
  }; 

  // edit modals for user cards
  $('.coinCardContainer').on('click', '#updateCoin', function() {
    let cryptoId = $(this).data('crypto'); 
    let userEmail = $(this).data('email'); 
    let id = `#${cryptoId}Bal`; 
    let value = parseFloat($(id).val().trim()); 
    let updateData = {
      userEmail: userEmail, 
      cryptoId: cryptoId, 
      value: value
    };
    addAmounts(updateData);  
  });

  function addAmounts(updateData) {
    // add logic for adding new coins
    $.ajax({
      url: `/api/user/${updateData.userEmail}/bank/${updateData.cryptoId}`, 
      type: "PUT", 
      data: updateData, 
    }).then(function(addCoin) {
      userDashboard(userData); 
    });
  };
  
  // $('.slider').slider();

  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('.slider').slider();

  });
});