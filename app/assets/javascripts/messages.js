$(function() {

  function scrollLast(){
    $('.messages__message').animate({
      scrollTop:$('.last_message').offset().top});  
  }
  scrollLast();

  function buildHTML(message){
    if (message.image.url == null) {
      var image_html = ``
    }
    else {
      var image_html = `<div class="messages__message--image">
      <img src="${message.image.url}" class="image-size">
    </div>`
    }
    var html = `<div class="messages__message--box last_message">
                  <div class="messages__message--user">
                    ${message.user.name}
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
      $('.last_message').removeClass("last_message");
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
})