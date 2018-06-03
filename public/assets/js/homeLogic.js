$(document).ready(function(){
  // localStorage.getItem(token)
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
    console.log(user); 
    if (user.email.includes('@')) {
      $.ajax({
        url: "/api/user/login",
        type: "POST",
        data: user,
      }).then(function(data) {
        console.log('user added and data recevied');
        // console.log(data);
        loadUserData(data);       
      }); 
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
    // console.log(newUser); 
    if (newUser.email.includes('@')) {
      $.ajax({
        url: "/api/user",
        type: "POST",
        data: newUser,
      }).then(function(data) {
        console.log('user added and data recevied');
        // console.log(data);
        loadUserData(data);       
      }); 
    } else {
      M.toast({html: 'Please enter a valid email address'})
    }
  });

  function loadUserData(data) {
    // GET user data to display on page =====
    $.ajax({
      url: "/api/user/:" + data.id, 
      type: "GET", 
      data: data, 
    }).then(function(resData) {
      console.log('user data retrieved');
      console.log(resData); 
      // save user data to global var
      userData = {
        id: resData.id, 
        name: resData.name, 
        email: resData.email, 
        Banks: resData.Banks
      }
      console.log(userData);
    
      // remove sign-in button
      $('.signInBtn').addClass('hide'); 
      $('.animated-chart').addClass('hide'); 

      // add sign out button
      
      // create welcome screen with market balance
      userDashboard(userData); 
           
      // edit modals for user cards

      
      // add cards of all user coins (include image, name, amount, and modal button to update)
      // add Add Coin button
      $('.userCoins').html('<button data-target="addFav" class="addFav center btn modal-trigger">Add New Crypto</button>'); 
      $("#addCoinBtn").on("click", function(event) {
        // save user coin data to global var
        userCoinData = {
          // name: userData.name,
          UserId: userData.id,
          userEmail: userData.email, 
          cryptoId: $('#coinOptions').val(),
        }
        console.log(userCoinData); 
        addFavs(userCoinData); 
      }); 

    }); 
  }; // END loadUserData

  function userDashboard(userData) {
    loadCoinCards(userData);
    let userBank = userData.Banks; 
    console.log('in userDashboard'); 
    console.warn(userData); 
    console.warn(userBank); 
    if (userBank.length === 0) {
      cryptoBal = 0; 
      console.log('No Crypto Balance'); 
      $('.userMain').empty(); 
      let welcome = `<h2>Hold on for dear life ${userData.name}! #HODL</h2>`;
      let currentBal = `<h4>Current Crypto-Balance: ${cryptoBal}</h4>`;
      $('.userMain').append(welcome, currentBal); 
    } else {
      userBank.forEach((coin) => {
        // call external api to get value of each coin value
        $.ajax({
          url: '/api/ticker/' + coin.cryptoId, 
          type: 'GET'
        }).then(function(resCoinData) {
          // add logic for calculating user coins and market values
          let balance = []; 
          balance.push(coin.value * resCoinData.price); 
          console.log(balance); 
          cryptoBal = 0; 
          balance.forEach((value) => {
            cryptoBal += value;  
          }); 
          console.log(cryptoBal); 

          // add box for main display of current holdings and "Welcome ____" message
          $('.userMain').empty(); 
          let welcome = `<h2>Welcome ${resData.name}!</h2>`;
          let currentBal = `<h4>Current Crypto-Balance: ${cryptoBal}</h4>`;
          $('.userMain').append(welcome, currentBal); 
  
        }); 
      });
    };
  }; 

  function addFavs(userCoinData) {
    // add logic for adding new coins
    $.ajax({
      url: `/api/user/:${userCoinData.userEmail}/bank`, 
      type: "POST", 
      data: userCoinData, 
    }).then(function(resData) {
      console.log('user data retrieved');
      console.log(resData); 
      loadCoinCards(userData); 
    });
  }

  function loadCoinCards(userData) {
    $.ajax({
      url: "/api/user/" + userData.id, 
      type: "GET", 
      data: userData, 
    }).then(function(resData) {
      console.log('Coin Cards to be loaded: ');
      console.log(resData);
      console.log(resData.Banks);
      let coinCards = resData.Banks; 
      if (coinCards.length === 0) {
        return; 
      } else {
        $('.coinCardContainer').empty(); 
        coinCards.forEach((coin) => {
          $.ajax({
            url: '/api/ticker/' + coin.cryptoId, 
            type: 'GET'
          }).then(function(resCoinData) {
            console.log(resCoinData); 
            let usdBal = resCoinData.price * coin.value; 
          
            console.log(`${coin.cryptoId}: ${coin.value}`); 
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

  // $('.card').on('click', '#updateCoin', function() {

  $('.coinCardContainer').on('click', '#updateCoin', function() {
    let cryptoId = $(this).data('crypto'); 
    let userEmail = $(this).data('email'); 
    let id = `#${cryptoId}Bal`; 
    let value = parseFloat($(id).val().trim()); 
    let updateData = {
      userEmail: userEmail, 
      cryptoId: cryptoId, 
      value: value
    } 
    console.log(updateData);
    addAmounts(updateData);  
  })

  function addAmounts(updateData) {
    console.log('in addAmounts request'); 
    // add logic for adding new coins
    $.ajax({
      url: `/api/user/${updateData.userEmail}/bank/${updateData.cryptoId}`, 
      type: "PUT", 
      data: updateData, 
    }).then(function(addCoin) {
      console.log('user data retrieved');
      console.log(addCoin); 
      userDashboard(userData); 

    });
  }


});