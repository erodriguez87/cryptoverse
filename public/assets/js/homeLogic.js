$(document).ready(function(){
  localStorage.getItem(token)
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
      $.post("/api/user", user, function(data, status) {
        console.log(status); 
        console.log(data.id); 
        // localStorage.setItem('token', token)
        $('#name').val(''); 
        $('#email').val(''); 
        $('#password').val(''); 
        // document.location.href = '/dashboard/' + data.id;
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
      let token = Cookies.get('token'); 
      console.log(token);
      $.ajax({
        url: "/api/user",
        type: 'POST',
        // send Authorization header
        headers: {
          "Authorization": "Bearer " + Cookies.get('token')
        }
      }).then(function(data) {
        console.log('protected data', data);
        $('#name').val(''); 
        $('#email').val(''); 
        $('#password').val(''); 
        document.location.href = '/dashboard/' + data.id;
      });
      // $.post("/api/user", newUser, function(data, status) {
      //   console.log(status); 
      //   console.log(data.id); 
      //   // localStorage.setItem('token', token)
      //   $('#name').val(''); 
      //   $('#email').val(''); 
      //   $('#password').val(''); 
      //   // document.location.href = '/dashboard/' + data.id;
      // })

    } else {
      M.toast({html: 'Please enter a valid email address'})
    }
    })

});