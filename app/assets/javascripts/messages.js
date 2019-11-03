$(function() {

  last_message_id = $(".messages__message--box").last().data("id");
  function scrollLast(){
    $('.messages__message').animate({
      scrollTop:$('.messages__message--box').last().offset().top});  
    }
    if ('.messages__message' == null ) {
      scrollLast();
    }

  function buildHTML(message){
    if (message.image.url !== null ) {
      var image_html = `<div class="messages__message--image">
      <img src="${message.image.url}" class="image-size">
    </div>`
    }
    else {
      var image_html = ``
    }
    var html = `<div class="messages__message--box" data-id='${message.id}'>
                  <div class="messages__message--user">
                    ${message.user_name}
                    <div class="messages__message--time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="messages__message--text">
                    ${message.message}
                  </div>
                  ${image_html}
                </div>`
    return html;
  }
  
  $('.input-box').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    $.ajax({
      url: $(this).attr('action'),
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages__message').append(html);
      $('.messages__post--textbox').val('');
      $("input[type='file']").val(null);
      $('.messages__post--send').prop('disabled', false);
      scrollLast();
    })
    .fail(function(){
      alert("メッセージを入力してください")
      $('.messages__post--send').prop('disabled', false);
    })
  });

  var reloadMessages = function() {
    last_message_id = $(".messages__message--box").last().data("id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message);
      });
      $('.messages__message').append(insertHTML);
      if (messages.length !== 0){
        scrollLast();
      }
    })
    .fail(function() {
      alert('error');
    })
  }
  if ('.messages__message' == null ) {
    setInterval(reloadMessages, 5000);
  }
})