$(function() {

  function buildHTML(message){
    if (message.image.url == null) {
      var html = `<div class="messages__message--user">
                    ${message.user.name}
                    <div class="messages__message--time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="messages__message--text">
                    ${message.message}
                  </div>`
    }
    else {
      var html = `<div class="messages__message--user">
                    ${message.user.name}
                    <div class="messages__message--time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="messages__message--text">
                    ${message.message}
                  </div>
                  <div class="messages__message--image">
                    <img src="${message.image.url}" class="image-size">
                  </div>`
    }
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
      $('.announce').empty();
      $('.announce').append(`<div class="notice">メッセージを送信しました</div>`)
    })
    .fail(function(){
      $('.announce').empty();
      $('.announce').append('<div class="alert">エラーが発生しました</div>')

    })
  });
})