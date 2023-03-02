/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1677519565757
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1677605965757
  }
]

const escapeP = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
  `
  return $tweet;
}


const renderTweets = (tweets) => {
  for (const user of tweets) {
    const $tweet = createTweetElement(user)
    $(`.tweets-container`).prepend($tweet)
  }
}

const submitTweets = () => {
  $("#submit-form").submit(function (e) {
    e.preventDefault();
    if ($('#tweet-text').val().length === 0) {
      return $('#empty-text').slideDown('slow').delay(2200).fadeOut('slow')
    }
    if ($('#tweet-text').val().length > 140) {
      return $('#long-text').slideDown('slow').delay(2200).fadeOut('slow')
    }
    $.post("/tweets", $("#submit-form").serialize())
      .then(() => {
        $('#tweet-text').val('')
        $('.counter').val(140)
        loadTweets()
      })

  });
}

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then((data) => {
      renderTweets(data);
    })
}

const scrollUp = () => {
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.querySelector('.scroll-to-top').classList.add("show");
    } else {
      document.querySelector('.scroll-to-top').classList.remove("show");
    }
  }
}

const redirecting = () => {

  const jumpToTextarea = document.querySelector('#jump-to-textarea');
  const jumpToTextarea2 = document.querySelector('#jump-to-textarea2');
  const textarea = document.querySelector('#jump-here');

  jumpToTextarea.addEventListener('click', function () {
    textarea.scrollIntoView({ behavior: 'smooth' });
  });
  jumpToTextarea2.addEventListener('click', function () {
    textarea.scrollIntoView({ behavior: 'smooth' });
  });
}

$(() => {

  scrollUp();
  redirecting();
  submitTweets();
  loadTweets();
})
