$(function() {
 $("a.thumbnail").click(function () {
    var url = $(this).data("url");
    var record = $(this).data("record");
    var image = $("<img/>").attr("src", url);
    image.appendTo($("#show_image .modal-body"));

    $("#show_image #record_id").attr("value", record);
    $('#show_image').modal();
    return false;
 });
});