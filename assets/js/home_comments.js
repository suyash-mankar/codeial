// {

//     // method to submit the form data for new comment using AJAX
//     let createComment = function(createLink){

//         let postId =  $(createLink).attr('postId');

//         let newCommentForm = $(`#${postId}`);


//         newCommentForm.submit(function(e){

            
//                 e.preventDefault();
//                 $.ajax({
//                     type: 'post',
//                     url: '/comments/create',
//                     // serialize() converts the post form data into json
//                     data: newCommentForm.serialize(),
//                     success: function(data){
                        
//                         let newComment = newCommentDom(data.data.comment);
//                         $(`#posts-comments-${data.data.comment.post}`).prepend(newComment);
//                         let notyText = "Comment Published";
//                         noty(notyText);
//                         deleteComment($(' .delete-comment-button', newComment));
//                     }, error: function(error){
//                         let notyText = error.responseText;
//                         noty(notyText);
//                         console.log(error.responseText);
//                     }
    
//                 });
    
//             });
        
  
//     }


//     // method to create comment in DOM
//     let newCommentDom = function(comment){

//         return $(`<li id="comment-${comment._id}">

//         <p>
//             <small>
//                     <a class="delete-comment-button" href="/comments/destroy/${comment._id}"> X </a>
//             </small>
            
//             ${comment.content}
//             <br>
//             <small>
//                 ${comment.user.name}    
//             </small> 
//         </p>
    
//     </li>`)
//     }



//     // method to delete a post form DOM
//     let deleteComment = function(deleteLink){

           
//         $(deleteLink).click(function(e){

//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),
//                 success: function(data){
                    
//                     $(`#comment-${data.data.comment_id}`).remove();
//                     let notyText = "Comment Deleted";
//                     noty(notyText);
//                 }, error : function(error){
//                     let notyText = error.responseText;
//                     noty(notyText);
//                     console.log(error.responseText);
//                 }
//             });

//         });
//     }


//     let noty = function(notyText){

//         new Noty({

//             theme: 'relax',
//             text: notyText,
//             type: 'success',
//             layout: 'topRight',
//             timeout: 1500
            
//         }).show();
//     }

   

//     let createCommentButtons = $('.create-comment-button');
//     for(let createCommentButton of createCommentButtons){
//         createComment(createCommentButton);
//     }


//     let deleteCommentButtons = $('.delete-comment-button');
//     for(let deleteCommentButton of deleteCommentButtons){
//         deleteComment(deleteCommentButton);
//     }
// }