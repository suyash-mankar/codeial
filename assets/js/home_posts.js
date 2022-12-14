{
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        // serialize() converts the post form data into json
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          let notyText = "Post Published";
          noty(notyText);
          deletePost($(" .delete-post-button", newPost));

          // call the create comment class
          new PostComments(data.data.post._id);

          // enable the functionality of the toggle like button on the new post
          new ToggleLike($(" .toggle-like-button", newPost));
        },
        error: function (error) {
          let notyText = error.responseText;
          noty(notyText);
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create post in DOM
  let newPostDom = function (post) {
    return $(`
    
    
    <li id="post-${post._id}" class="posts-container">
                                
        <p>     
            <small>
                    <a class="delete-post-button  btn btn-outline-dark" href="/posts/destroy/${post._id}"> Delete Post </a>
            </small>
            <br />
            <small class="user-name"> ${post.user.name} </small>
            <br>
            <small class="post-content"> ${post.content} </small>
            <br>

            <small class="likes-comment-container" id="likes-comment-container">
                <a href="/likes/toggle?id=${post._id}&type=Post" class="toggle-like-button" data-likes="0">
                        
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
                    alt="like"
                  />
                  
                  0 Likes     
                </a>

                <img
                  src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
                  alt="like"
                  style="width: 18px; margin: 0 10px; margin-top: 2px"
                />


                <span id="post-comments-length-${post._id}" data-comments="${post.comments.length}">
                  ${post.comments.length} Comments
                </span>


                
            </small>

        </p>

        <div class="post-comments">
        
            <form action="/comments/create" id="post-${post._id}-comments-form" method="POST" required>
                    <input class="write-comment" type="text" name="content" placeholder="Write a comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
            </form>
        
            <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                        
                    </ul>
            </div>
        </div>

    </li>`);
  };

  // method to delete a post form DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();

          let notyText = "Post Deleted";
          noty(notyText);
        },
        error: function (error) {
          let notyText = error.responseText;
          noty(notyText);
          console.log(error.responseText);
        },
      });
    });
  };

  let noty = function (notyText) {
    new Noty({
      theme: "relax",
      text: notyText,
      type: "success",
      layout: "topRight",
      timeout: 1500,
    }).show();
  };

  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  let convertPostsToAjax = function () {
    $("#posts-list-container>ul>li").each(function () {
      let self = $(this);
      let deleteButton = $(" .delete-post-button", self);
      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      let postId = self.prop("id").split("-")[1];
      new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}
