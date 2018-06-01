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
      let token = Cookies.get('token'); 
      console.log('token: ' + token);
 

      $.ajax({
        url: "/api/user/login",
        type: "POST",
        data: user,
        // send Authorization header
        headers: {
          "Authorization": "Bearer " + Cookies.get('token')
        }
      }).done(function(data) {
        console.log('protected data', data);

      // $.post("/api/login", user, function(data, status) {
      //   console.log(status); 
      //   console.log(data.id); 
      //   // localStorage.setItem('token', token)
      //   $('#name').val(''); 
      //   $('#email').val(''); 
      //   $('#password').val(''); 
      //   document.location.href = '/dashboard/' + data.id;
      })
    } else {
      M.toast({html: 'Please enter a valid email address'})
    }
  })

  $("#signUpBtn").on("click", function(event) {
    let newUser = {
      name: $('#name').val().trim(), 
      email: $('#email').val().trim(), 
      password: $('#password').val().trim()
    }
    console.log("sending:"); 
    console.log(newUser); 
    if (newUser.email.includes('@')) {
      // let token = Cookies.get('token'); 
      // console.log('token: ' + token);
      // $.post("/api/user", newUser, function(data, status) {
      //   console.log(status); 
      //   console.log(data.id); 
      // }); 

      $.ajax({
        url: "/api/user",
        type: "POST",
        data: newUser,
        // send Authorization header
        // headers: {
        //   "Authorization": "Bearer " + Cookies.get('token')
        // }
      }).then(function(data) {
        // console.log('Sending user to: ', data.url);
        console.log('user added and data recevied');
        // console.log(data);

        // document.location.href = data.url; 

        // GET user data to display on page =====
        $.ajax({
          url: "/api/user/:" + data.id, 
          type: "GET", 
          data: data, 
        }).then(function(resData) {
          console.log('user data retrieved');
          // console.log(resData);

          // remove sign-in button
          $('.signInBtn').addClass('hide'); 

          // add sign out button
          

          // add box for main display of current holdings and "Welcome ____" message
          

          // add cards of all user coins (include image, name, amount, and modal button to update)

          // edit modals for user cards

          // add Add Coin button
          $('.userCoins').html('<button data-target="addCoin" class="center btn modal-trigger">Add New Crypto</button>'); 
        






        })
        

 

      }); 
    } else {
      M.toast({html: 'Please enter a valid email address'})
    }
    })

});