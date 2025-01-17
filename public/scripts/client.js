//--------- RUNS THE WEBSITE ---------//
$(() => {
  scrollUp();
  redirecting();
  submitTweets();
  loadTweets();
});

//--------- Decrypt the tweets ---------//
const escapeP = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//--------- Create the tweet format ---------//
const createTweetElement = (tweet) => {
  const safeHTML = escapeP(tweet.content.text);
  const tweetUser = tweet.user;
  const $tweet = `
    <section class="tweets"> 
      <header>
        <div class="icon-name">
          <img src="${tweetUser.avatars}" alt="logo" width="50"   height="50">
            <p>${tweetUser.name}</p>
        </div>
        <div id="nickname">
          <p>${tweetUser.handle}</p>
        </div>
      </header>
      <div id='main-content'>
        <p>${safeHTML}</p>
      </div>
      <footer>
        <h6>${timeago.format(tweet.created_at)}</h6>
        <div class="icons">
          <p class="fa-solid fa-flag"></p>
          <p class="fa-solid fa-retweet"></p>
          <p class="fa-solid fa-heart"></p>
        </div>
      </footer>
    </section>
  `;
  return $tweet;
};

//--------- Takes the tweets and add it to the top  ---------//
const renderTweets = (tweets) => {
  for (const user of tweets) {
    const $tweet = createTweetElement(user);
    $(`.tweets-container`).prepend($tweet);
  }
};

//--------- Submit and check validation of the tweets  ---------//
const submitTweets = () => {
  $("#submit-form").submit(function (e) {
    e.preventDefault();
    const textarea = $(this).find('#tweet-text')
    const emptyText = $(this).closest('main.container').find('#empty-text')
    const longText = $(this).closest('main.container').find('#long-text')
    const counter = $(this).closest('form').find('.counter');

    if (textarea.val().length === 0) {
      return emptyText.slideDown('slow').delay(2500).slideUp('slow');
    }
    if (textarea.val().length > 140) {
      return longText.slideDown('slow').delay(3200).slideUp('slow');
    }
    $.post("/tweets", $(this).serialize())
      .then(() => {
        textarea.val('');
        counter.val(140);
        $(".tweets-container").empty();
        loadTweets();
      });
  });
};

//--------- get the tweets and render the data ---------//
const loadTweets = () => {
  $.get('/tweets')
    .then((data) => {
      renderTweets(data);
    });
};

//--------- button to scroll to the beginning of the page ---------//
const scrollUp = () => {
  window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.querySelector('.scroll-to-top').classList.add("show");
    } else {
      document.querySelector('.scroll-to-top').classList.remove("show");
    }
  }
  document.querySelector('.scroll-to-top').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};




//--------- Hide/show the form and focus on it ---------//
const redirecting = () => {
  const jumpToTextarea = document.querySelector('#jump-to-textarea');
  const jumpToTextarea2 = document.querySelector('#jump-to-textarea2');

  const textarea = document.querySelector('#jump-here');
  const textareaField = document.querySelector('#tweet-text')
  const newTweet = document.getElementById('new-tweet');

  //---hide-show the form
  jumpToTextarea.addEventListener('click', () => {
    newTweet.removeAttribute('hidden');
    newTweet.classList.toggle('visible');
  });

  //---Scroll to form and focus on it
  const jumpToTextareaHandler = () => {
    if (newTweet.classList.contains('visible')) {
      textarea.scrollIntoView({
        behavior: 'smooth'
      });
      textareaField.focus();
    }
  }

  jumpToTextarea.addEventListener('click', jumpToTextareaHandler);
  jumpToTextarea2.addEventListener('click', jumpToTextareaHandler);
};
