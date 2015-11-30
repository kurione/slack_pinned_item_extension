get_exttypes = function() {
  var arr = [];
  $(".section_content.pinned_items p.pin_metadata").each(function() {
    var ext = $(this).text().trim();
    if ($.inArray(ext, arr) == -1) {
      arr.push(ext);
    }
  });
  //console.log(arr);
  return arr;
}

create_selectbox = function(arr) {
  $(".section_content.pinned_items").prepend("<select name='pinned_items_filter' class='ui fluid dropdown'></select>");
  $select = $("select[name='pinned_items_filter']");
  $select.append("<option value=''>filter by</option>")
    .append("<option value='All'>All</option>")
    .append("<option value='Message'>Message</option>");
  $.each(arr, function() {
    $select.append("<option value='" + this + "'>" + this + "</option>");
  });
  $select.dropdown();
  $select.parent().attr('style', 'margin-bottom:10px')
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
  if ($("div.section_content.pinned_items div.pinned_item").length == 0) return;
  create_selectbox(get_exttypes());
  $("select[name='pinned_items_filter']").change(function() {
    var selected_ext = $(this).val();
    if (selected_ext == "All") {
      show_all();
    } else if (selected_ext == "Message") {
      show_message();
    } else {
      show_selected_ext(selected_ext);
    }
  });
}

wait_while_show_page_pinned_items = function(){
  if ($("div.channel_page_pinned_items div.section_content").length > 0){
    add_filter();
  }
  setTimeout(wait_while_show_page_pinned_items, 300);
}

function start_scripts() {
  $(document).on("click", "div.channel_page_pinned_items div.section_header", function() {
    add_filter();
  });
  wait_while_show_page_pinned_items();
}

start_scripts();
