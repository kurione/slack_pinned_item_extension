$.wait = function(msec) {
  var d = new $.Deferred;
  setTimeout(function(){
    d.resolve(msec);
  }, msec);
  return d.promise();
};

$.wait(8000).done(function() {

//$("div.section_header.no_bottom_margin.display_flex.align_items_center a:contains('Pinned Items')").on('click', function(){

  var arr = [];
  $(".section_content.pinned_items p.pin_metadata").each(function(){
    var ext = $(this).text().trim();
    if ($.inArray(ext, arr) == -1){
      arr.push(ext);
    }
  });
  console.log(arr);

  $(".section_content.pinned_items").prepend("<select name='pinned_items_filter'></select>");
  $("select[name='pinned_items_filter']").append("<option value='ALL'>ALL</option>");
  $("select[name='pinned_items_filter']").append("<option value='message'>message</option>");
  $.each(arr, function(){
    $("select[name='pinned_items_filter']").append("<option value='" + this + "'>" + this + "</option>");
  });

  $("select[name='pinned_items_filter']").change(function(){
    var selected_ext = $(this).val();
    if (selected_ext == "ALL"){
      $("div.section_content.pinned_items div.pinned_item").each(function(){
        $(this).show();
      });
    } else if (selected_ext == "message"){
      $("div.section_content.pinned_items div.pinned_item").each(function(){
        $(this).show();
      });
      $("div.section_content.pinned_items p.pin_metadata").each(function(){
        $(this).parent('div').hide();
      });
    } else {
      $("div.section_content.pinned_items div.pinned_item").each(function(){
        $(this).hide();
      });
      $("div.section_content.pinned_items p.pin_metadata").each(function(){
        var ext = $(this).text().trim();
        if (ext == selected_ext){
          $(this).parent('div').show();
        }
      });
    }
  });
});

get_pinned_items = function(){

}
