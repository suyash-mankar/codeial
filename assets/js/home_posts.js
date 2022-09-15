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
        
            <form action="/comments/create" class="new-comment-form" postId="${post._id}" method="POST" required>
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
 
}