{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                // serialize() converts the post form data into json
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    let notyText = "Post Published";
                    noty(notyText);
                    deletePost($(' .delete-post-button', newPost));

                    createComment($(' .create-comment-button', newPost));

                    


                }, error: function(error){
                    let notyText = error.responseText;
                    noty(notyText);
                    console.log(error.responseText);
                }

            });

        });
    }


    // method to create post in DOM
    let newPostDom = function(post){


        return $(`<li id="post-${post._id}">
                                
        <p>     
            <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}"> X </a>
            </small>
            ${post.content}
            <br>
            <small> ${post.user.name} </small>
        </p>
        
    
        <div class="post-comments">
        
            <form action="/comments/create" class="new-comment-form" id="${post._id}" method="POST" required>
                    <input type="text" name="content" placeholder="Type here to add comment...">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment" postId="${post._id}" class="create-comment-button">
            </form>
        
           
    
            <div class="post-comments-list">
                    <ul id="posts-comments-${post._id}">
                        
                    </ul>
            </div>
        </div>

    </li>`)
    }



    // method to delete a post form DOM
    let deletePost = function(deleteLink){

   
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    let notyText = "Post Deleted";
                    noty(notyText);
                }, error : function(error){
                    let notyText = error.responseText;
                    noty(notyText);
                    console.log(error.responseText);
                }
            });

        });
    }


    let noty = function(notyText){

        new Noty({

            theme: 'relax',
            text: notyText,
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            
        }).show();
    }

    
    createPost();

    let deletePostButtons = $('.delete-post-button');
    for(let deletePostButton of deletePostButtons){
        deletePost(deletePostButton);
    }



    


    // method to submit the comment form data for new post using AJAX
    let createComment = function(createLink){

        let postId =  $(createLink).attr('postId');

        let newCommentForm = $(`#${postId}`);
        
        newCommentForm.submit(function(e){

                console.log('here');
                e.preventDefault();
                $.ajax({
                    type: 'post',
                    url: '/comments/create',
                    // serialize() converts the post form data into json
                    data: newCommentForm.serialize(),
                    success: function(data){
                        
                        let newComment = newCommentDom(data.data.comment);
                        $(`#posts-comments-${data.data.comment.post}`).prepend(newComment);
                        let notyText = "Comment Published";
                        noty(notyText);
                        deleteComment($(' .delete-comment-button', newComment));
                    }, error: function(error){
                        let notyText = error.responseText;
                        noty(notyText);
                        console.log(error.responseText);
                    }
    
                });
    
            });
        
  
    }



    // method to create post in DOM
    let newCommentDom = function(comment){

        return $(`<li id="comment-${comment._id}">

        <p>
            <small>
                    <a class="delete-comment-button" href="/comments/destroy/${comment._id}"> X </a>
            </small>
            
            ${comment.content}
            <br>
            <small>
                ${comment.user.name}    
            </small> 
        </p>
    
    </li>`)
    }



    // method to delete a post form DOM
    let deleteComment = function(deleteLink){

           
        $(deleteLink).click(function(e){

            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    
                    $(`#comment-${data.data.comment_id}`).remove();
                    let notyText = "Comment Deleted";
                    noty(notyText);
                }, error : function(error){
                    let notyText = error.responseText;
                    noty(notyText);
                    console.log(error.responseText);
                }
            });

        });
    }




    let createCommentButtons = $('.create-comment-button');
    for(let createCommentButton of createCommentButtons){
        createComment(createCommentButton);
    }

    let deleteCommentButtons = $('.delete-comment-button');
    for(let deleteCommentButton of deleteCommentButtons){
        deleteComment(deleteCommentButton);
    }
 
}


