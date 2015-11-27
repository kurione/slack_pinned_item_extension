get_exttypes = function() {
  var arr = [];
  $(".section_content.pinned_items p.pin_metadata").each(function() {
    var ext = $(this).text().trim();
    if ($.inArray(ext, arr) == -1) {
      arr.push(ext);
    }
  });
  console.log(arr);
  return arr;
}

create_selectbox = function(arr) {
  $(".section_content.pinned_items").prepend("<select name='pinned_items_filter'></select>");
  $("select[name='pinned_items_filter']")
    .append("<option value='ALL'>ALL</option>")
    .append("<option value='message'>message</option>");
  $.each(arr, function() {
    $("select[name='pinned_items_filter']").append("<option value='" + this + "'>" + this + "</option>");
  });
}

show_all = function(){
  $("div.section_content.pinned_items div.pinned_item").each(function() {
    $(this).show();
  });
}

show_message = function(){
  $("div.section_content.pinned_items div.pinned_item").each(function() {
    $(this).show();
  });
  $("div.section_content.pinned_items p.pin_metadata").each(function() {
    $(this).parent('div').hide();
  });
}

show_selected_ext = function(selected_ext){
  $("div.section_content.pinned_items div.pinned_item").each(function() {
    $(this).hide();
  });
  $("div.section_content.pinned_items p.pin_metadata").each(function() {
    var ext = $(this).text().trim();
    if (ext == selected_ext) {
      $(this).parent('div').show();
    }
  });
}

add_filter = function(){
  if ($("select[name='pinned_items_filter']").length > 0) return;
  create_selectbox(get_exttypes());
  $("select[name='pinned_items_filter']").change(function() {
    var selected_ext = $(this).val();
    if (selected_ext == "ALL") {
      show_all();
    } else if (selected_ext == "message") {
      show_message();
    } else {
      show_selected_ext(selected_ext);
    }
  });
}

wait_while_loading = function(){
  if ($("div.section_content.pinned_items div.pinned_item").length == 0){
    setTimeout(wait_while_loading, 500);
    console.log('wait:500ms');
  } else {
    add_filter();
  }
}

start = function(){
  $(document).on("click", "div.channel_page_pinned_items div.section_header", function() {
    add_filter();
  });
  wait_while_loading();
}

start();
