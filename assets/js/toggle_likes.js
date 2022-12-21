// create a class to toggle likes when a link is clicked, using AJAX

class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.toggleLike();
  }

  toggleLike() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;

      // send a POST ajax request to controller via the route
      $.ajax({
        type: "POST",
        url: $(self).attr("href"),
      })
        .done(function (data) {
          // data will come from the json response from likes_controller

          let likesCount = parseInt($(self).attr("data-likes"));
          if (data.data.deleted == true) {
            likesCount -= 1;
          } else {
            likesCount += 1;
          }

          $(self).attr("data-likes", likesCount);
          $(self).html(`
            <img
              src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
              alt="like"
            />
            ${likesCount} Likes
          `);
        })
        .fail(function (errData) {
          console.log("error in completing the request", errData);
        });
    });
  }
}
