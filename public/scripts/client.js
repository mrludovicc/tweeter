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

const createTweetElement = (tweet) => {
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
      <div id='mainContent'>
        <p>${tweet.content.text}</p>
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
    $(`.tweetsContainer`).prepend($tweet)
  }
}

const submitTweets = () => {
  $("#submitForm").submit(function (e) {
    e.preventDefault();
    $.post("/tweets", $("#submitForm").serialize())
      .then(() => {
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

$(() => {
  submitTweets();
  loadTweets();
})
