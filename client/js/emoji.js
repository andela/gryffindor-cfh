$(document).ready(() => {
  $('#example1').emojioneArea({
    autoHideFilters: true,
    pickerPosition: 'bottom',
    tonesStyle: 'radio'
  });

  $('body').on('click', '#close-chat', () => {
    $('.chat-body').slideToggle();
    const element = document.getElementById('message-cont');
    if (element) {
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      }, 50);
    }
  });
});
