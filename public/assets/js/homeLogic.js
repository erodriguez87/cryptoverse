$(document).ready(function(){
  // localStorage.getItem(token)
  // Sign-in Modal Trigger
  $('.modal').modal();
  $('.modal-trigger').modal();

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
    console.log(newUser); 
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
    

    // remove sign-in button
    $('.signInBtn').addClass('hide'); 

    // add sign out button
    
    // add api call for current market values of all crypto

    // add logic for calculating user coins and market values
    let cryptoBal = 0; 

    // add box for main display of current holdings and "Welcome ____" message
    $('.userMain').empty(); 
    let welcome = `<h2>Welcome ${resData.name}!</h2>`;
    let currentBal = `<h4>Current Crypto-Balance: ${cryptoBal}</h4>`;
    $('.userMain').append(welcome, currentBal); 

    // add cards of all user coins (include image, name, amount, and modal button to update)

    // edit modals for user cards

    // add Add Coin button
    $('.userCoins').append('<button data-target="addCoin" class="center btn modal-trigger">Add New Crypto</button>'); 
  
    // add logic for adding new coins


    });
  }


});