/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const createTweetElement = (users) => {
//   // $sectionContainer = $('<section>').addClass('tweets');
//   $header = $(`<header>`).appendTo(`$sectionContainer`)
//   $headerFirstDiv = $(`<div class="icon-name">`).addClass(`icon-name`).appendTo(`$header`)
//   $avatar = $(`img`).attr({
//     alt: "avatar",
//     width: `50`,
//     height: `50`
//   }).appendTo(`$headerFirstDiv`)
//   $name = $(`<p>`).appendTo(`$headerFirstDiv`)
// }
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
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}
const createTweetElement = (tweet) => {
  const tweetUser = tweet.user;
  const $tweet = `
    <header>
      <div class="icon-name">
        <img src="${tweetUser.avatars}" alt="logo" width="50" height="50">
          <p>${tweetUser.name}</p>
      </div>
      <div id="nickname">
        <p>${tweetUser.handle}</p>
      </div>
    </header>
    <article>
      <p>${tweet.content.text}</p>
    </article>
    <footer>
      <h6>${tweet.created_at}</h6>
      <div class="icons">
        <p class="fa-solid fa-flag"></p>
        <p class="fa-solid fa-retweet"></p>
        <p class="fa-solid fa-heart"></p>
      </div>
    </footer>
  `
  return $tweet;
}
const $tweet = createTweetElement(tweetData);
$(() => {
  $(`.tweets`).append($tweet)
})
