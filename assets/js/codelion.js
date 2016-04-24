$('#submitNewGroup').click(function(e) {
  e.preventDefault();
  var name = $('#newGroupName').val();
  var about = $('#newGroupAbout').val();
  var admin = parseInt($('#userID').text());
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
    if (data.createdAt) {
      console.log("Group Success!");
      window.location.href = 'http://'+window.location.host+'/';
    }
    else {
      console.log("ERROR!!!");
      window.alert("There Is Already One Group With That Name, Please Try A New Name!");
    }
  });

});

$('#addGroupMember').click(function(e) {
  e.preventDefault();
  var memberName = $('#addMemberUserName').val();
  var groupID = parseInt($('#groupID').text());
  console.log(memberName + ' ' + groupID);

  var postData = {
    memberName: memberName,
    groupID: groupID,
  }

  console.log(postData);
  console.log('Submitted Form');

  io.socket.post("/group/addMember", postData, function (data, jwres) {
    console.log('Posted');
    console.log(data);
    if (data.success == "true") {
      console.log("Added Group Member!");
      location.reload();
    }
    else {
      console.log("ERROR!!!");
      window.alert("User Not Found, Or Already A Member!");
    }
  });
});

$('.removeGroupMember').click(function(e) {
  e.preventDefault();
  var memberID = this.getAttribute("value");
  var groupID = parseInt($('#groupID').text());
  console.log(memberID + ' ' + groupID);

  var postData = {
    memberID: memberID,
    groupID: groupID,
  }

  console.log(postData);
  console.log('Submitted Form');

  io.socket.post("/group/removeMember", postData, function (data, jwres) {
    console.log('Posted');
    console.log(data);
    if (data.success == "true") {
      console.log("Removed Group Member!");
      location.reload();
    }
    else {
      console.log("ERROR!!!");
      window.alert("User Not Found, Or Not In Group!");
    }
  });
});

$('#createNewPost').click(function(e) {
  e.preventDefault();
  var title = $('#newPostTitle').val();
  var question = $('#newPostQuestion').val();
  var author = parseInt($('#userID').text());
  var group = parseInt($('#groupID').text());
  console.log(title + ' ' + question + ' ' + author/* + ' ' + group*/);

  var postData = {
    title: title,
    question: question,
    author: author,
    group: group,
  }
  console.log(postData);
  console.log('Submitted Form');
  io.socket.post("/post/create", postData, function (data, jwres) {
    if (data.createdAt) {
      console.log("Group Success!");
      window.location.href = 'http://'+window.location.host+'/group/posts/'+group;
    } else {
      alert("Post Error!");
    }
    console.log('Posted');
    console.log(data);
  });
});

$('#submitComment').click(function(e) {
  e.preventDefault();
  var reply = $('#comment').val();
  var author = parseInt($('#userID').text());
  var post = parseInt($('#postID').text());
  console.log(reply + ' ' + author + ' ' +  post);

  var postData = {
    reply: reply,
    author: author,
    post: post,
  }

  console.log(postData);
  console.log('Submitted Form');
  io.socket.post("/comment/create", postData, function (data, jwres) {
    if (data.createdAt) {
      console.log("Comment Created!");
      location.reload();
    } else {
      alert("Comment Error!");
    }
    console.log('Posted');
    console.log(data);
  });

});

$('.deleteCommentBtn').click(function(e) {
  var commentID = parseInt($(this).val());
  var groupID = parseInt($('#groupID').text());
  swal({
    title: "Are you sure?",
    text: "This Comment Will Be Gone Forever!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false },
    function(){
      postData = {
        commentID: commentID,
        groupID: groupID,
      }
      console.log(postData);
      io.socket.post("/comment/remove", postData, function (data, jwres) {
        console.log(data);
        if (data.success == "true") {
          swal({
            title: "Deleted!",
            text: "Your imaginary file has been deleted.",
            type: "success"},
            function() {
              location.reload();
            }
          );
        }
      });
    }
  );
});
