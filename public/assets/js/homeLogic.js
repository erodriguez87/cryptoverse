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
      }).done(function(data) {
        console.log('Sending user to: ', data.url);
        console.log('jwt: ', data.token);
        document.location.href = data.url; 

        // window.location(data)
        //   $('#name').val(''); 
      //   $('#email').val(''); 
      //   $('#password').val(''); 
      //   document.location.href = '/dashboard/' + data.id;
      // }).catch(function(err) {
      //   console.log('error', err);

      // $.post("/api/user", newUser, function(data, status) {
      //   console.log(status); 
      //   console.log(data.id); 
      //   // localStorage.setItem('token', token)
      //   $('#name').val(''); 
      //   $('#email').val(''); 
      //   $('#password').val(''); 
      //   // document.location.href = '/dashboard/' + data.id;
      // })

      }); 
    } else {
      M.toast({html: 'Please enter a valid email address'})
    }
    })

});