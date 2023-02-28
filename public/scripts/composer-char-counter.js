$(() => {
  // --- our code goes here ---
  // const $area = $('#tweet-text')
  $('#tweet-text').on('keyup', function () {
    let charCount = $(this).val().length
    let counter = $(this).next().find('.counter');
    const currentCount = 140 - charCount;
    if (currentCount < 0) {
      counter.css('color', 'red')
    } else {
      counter.css('color', '#545149');
    }
    counter.html(currentCount);
  })
});