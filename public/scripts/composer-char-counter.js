$(() => {
  charCounter();
});

//--------- Make the character counter functional ---------//
const charCounter = () => {
  $('#tweet-text').on('input', function () {
    const charCount = $(this).val().length;
    const counter = $(this).closest('form').find('.counter');
    const currentCount = 140 - charCount;

    if (currentCount < 30 && currentCount > 0) {
      counter.addClass('brown');
    } else if (currentCount <= 0) {
      counter.removeClass('brown')
      counter.addClass('red');
    } else {
      counter.removeClass('brown')
      counter.removeClass('red');
    }
    counter.text(currentCount);
  });
};

