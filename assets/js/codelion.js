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
      swal({
        title: "Error!",
        text: "There is already a group with that name, please try a new one!",
        type: "error",
        confirmButtonText: "Ok!"
      });
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
      swal({
        title: "Error!",
        text: "User not found, or they are already a member of the group!",
        type: "error",
        confirmButtonText: "Ok!"
      });
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
      swal({
        title: "Error!",
        text: "User Not Found In Group!",
        type: "error",
        confirmButtonText: "Ok!"
      });
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
      swal({
        title: "Error!",
        text: "Error Creating Post!",
        type: "error",
        confirmButtonText: "Ok!"
      });
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
      swal({
        title: "Error!",
        text: "Error Creating Comment!",
        type: "error",
        confirmButtonText: "Ok!"
      });
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
            text: "Your comment has been deleted.",
            type: "success"},
            function() {
              location.reload();
            }
          );
        } else if (data.success == "false") {
          swal({
            title: "Error!",
            text: data.error,
            type: "error",
            confirmButtonText: "Ok!"
          });
        } else {

        }
      });
    }
  );
});

$('.deletePostBtn').click(function(e) {
  var postID = parseInt($(this).val());
  var groupID = parseInt($('#groupID').text());
  swal({
    title: "Are you sure?",
    text: "This Post Will Be Gone Forever!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false },
    function(){
      postData = {
        postID: postID,
        groupID: groupID,
      }
      console.log(postData);
      io.socket.post("/post/remove", postData, function (data, jwres) {
        console.log(data);
        if (data.success == "true") {
          swal({
            title: "Deleted!",
            text: "Your post has been deleted.",
            type: "success"},
            function() {
              window.location.href = 'http://'+window.location.host+'/group/posts/'+groupID;
            }
          );
        } else if (data.success == "false") {
          swal({
            title: "Error!",
            text: data.error,
            type: "error",
            confirmButtonText: "Ok!"
          });
        } else {

        }
      });
    }
  );
});

$('.codeHelp').click(function(e) {
  swal({
    title: "How To Use Syntax Highlighting",
    text: "Wrap Your Code In Pre, And Code Tags. \n\nEx) <pre><code>var count;</code></pre>",
    type: "info",
    confirmButtonText: "Got It!"
  });
});

$('.markdownHelp').click(function(e) {
  swal({
    title: "How To Format Your Post!",
    text: "We use Markdown in order to help format your post<br><br>Syntax Information available <a target='_blank' href='https://daringfireball.net/projects/markdown/syntax'>here!</a>",
    type: "info",
    html: true,
    confirmButtonText: "Got It!"
  });
});

$(document).ready(function(){
  var converter = new showdown.Converter();
  $(".markdownBlock").each(function(index) {
    var htmlBlock = $(this).html();
    htmlBlock = $.trim(htmlBlock);
    //console.log(htmlBlock);
    var markdownBlock = converter.makeHtml(htmlBlock);
    //console.log(markdownBlock);
    $(this).html(markdownBlock);
  });

});
