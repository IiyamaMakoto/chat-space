$(function() {

  var search_result = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_result.append(html)
  }

  function appendErrMsgToHTML() {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    search_result.append(html);
  }

  function addUser(user_name, user_id) {
    var html = `
                <div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>
                `
    $('#chat-group-users').append(html);
  }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      search_result.empty();
      if (users.length !==0) {
        users.forEach(function(user){
          appendUser(user);
        })
      }
      else {
        appendErrMsgToHTML();
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on('click', ".chat-group-user__btn--add", function(){
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    $(this).parent().remove();
    addUser(user_name, user_id)
  });

  $(document).on('click', ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  })
})