$('submitNewGroup').submit(function(e) {
  e.preventDefault();
  var name = $('#newGroupName').val();
  var about = $('#newGroupAbout').val();
  var admin = parseInt($('#userID').val());
  console.log(name + ' ' + about + ' ' + admin);


  var postData = {
    name: name,
    about: about,
    admin: admin,
  }
  console.log(postData);
  console.log('Submitted Form');
  io.socket.post("/group/create", postData, function (data, jwres) {
    console.log('Posted');
    console.log(data);
  });

});
