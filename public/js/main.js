$(document).ready(() => {
  $(".object-delete").on("click", (e) => {
    $target = $(e.target);
    $.ajax({
      type: "DELETE",
      url: "/homepage/delete/" + $target.attr("data-id"),
      success: (responde) => {
        alert("Object removed");
        window.location.href = "/homepage";
      },
      error: (error) => {
        console.log(error);
      }
    });
  });
});
