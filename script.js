/* Disclaimer: this page has been coded by myself, taking inspiration from the lectures linked
in the assignment description and consulting the official documentation. No multiple lines of
code have been taken from a single source. 
Lessons, documentation and forums consulted include: MDN Web Docs, CodeCademy.com, KhanAcademy.org,
w3schools.com and stackoverflow.com. */

// object with an array of answers and a method to randomly call them
const dumBot = {
   _answers: ['Hello, stranger.', 'Who art thou?', '42 is the answer you\'re looking for.', 'My name is neither Siri nor Alexa, I don\'t do that kind of things!', 'Nice to meet you.', 'Please, behave yourself.', 'I hope you\'re not frustrated by my lack of understanding.', 'Who am I?!', 'Say my name!', 'The guy who coded me is so lazy that he didn\'t "waste time" (his words) teaching me stuff. If you want me to learn a new sentence, type it down followed by the word \'teach\' with no punctuation surrounding it (or symbol. Remember: I\'m dumb... though I don\' care much about CAPS). Just like this: teach'],
   
   get answers() {
      return this._answers;
   },

   set answers(string) {
      this.answers.push(string);
   },
   
   reply() {
      return this._answers[Math.floor(Math.random() * this._answers.length)];
   }
};

// function to send the message with the required features
const sendMsg = () => {
let userInput = $('textarea').val();

   // function to get the current time
   const timeNow = () => {
      const d= new Date();
      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      let hrs = d.getHours() + 1;
      let mins = d.getMinutes();

      return `Sent on ${day}-${month}-${year} at ${hrs<10 ? hrs="0"+hrs : hrs}:${mins<10 ? mins="0"+mins : mins}`
   };

   // screen's auto-scroll function for the element, *I tried with a pure jQuery code passing $(element).height into $(element).scrollTop but it would stop working after a few scrolls. 
   // I'd like to investigate more the reason why. I found some discussions on StackOverflow which helped me solve the issue using the jQuery object as a DOM element while calling specific DOM methods.
   // ANOTHER working solution --> const autoScroll = () => {$('.conversation').scrollTop($('.conversation')[0].scrollHeight)}; <-- this way also works with .animate
   const autoScroll = () => {$('.bot').last()[0].scrollIntoView({behavior: 'smooth'})};
   

   // check if the user sent an empty message and return a creepy answer after a small delay
   if(userInput.trim() === "" || userInput.toLowerCase().endsWith('teach') && userInput.split(' ').slice(0, -1).join('').trim() === "") {
   const $userMsg = $('<div>')
   .text(userInput)
   .addClass('user')
   .appendTo('main');

   $('<div>')
   .text(timeNow())
   .addClass('date')
   .appendTo($userMsg);
   
   const $botMsg = $('<div>')
   .text('I\'m sorry, I can\'t read your mind... yet.')
   .addClass('bot')
   .appendTo('main')
   .hide()
   .delay(150)
   .show(0);

   $('<div>')
   .text(timeNow())
   .addClass('date')
   .appendTo($botMsg);
   } 
   // if the user wrote something, create call reply() on the obj and append the new div on the main section
   else {
   const $userMsg = $('<div>')
   .text(userInput)
   .addClass('user')
   .appendTo('main');

   $('<div>')
   .text(timeNow())
   .addClass('date')
   .appendTo($userMsg);

      // easter-egg: teach the bot a new sentence with the right command 
      // (as long as it's not exactly the same as any of those he already knows)
      if (userInput.toLowerCase().endsWith('teach') && !dumBot.answers.some(sentence => sentence.toLowerCase() + " teach" === userInput.toLowerCase())) {
         let sentence = userInput.split(' ');
         dumBot.answers = sentence.slice(0, -1).join(' ');
      
         const $botMsg = $('<div>')
         .text('Thank you, Master! I will treasure your teaching.')
         .addClass('bot')
         .appendTo('main')
         .hide()
         .delay(150)
         .show(0);

         $('<div>')
         .text(timeNow())
         .addClass('date')
         .appendTo($botMsg); 
      }  
      // regular bot answer display
      else {
         const $botMsg = $('<div>')
         .text(dumBot.reply())
         .addClass('bot')
         .appendTo('main')
         .hide()
         .delay(150)
         .show(0);

         $('<div>')
         .text(timeNow())
         .addClass('date')
         .appendTo($botMsg); 
      }
   }
   // reset the textarea field after submitting a message
   $('textarea').val('');
   // set a timeout on the page scroll to make the page scroll appropriately, including the delayed bot answer
   setTimeout(autoScroll, 150);
};

// button-submit event
$('#input').on('submit', (event) => {
   event.preventDefault();
   sendMsg();
});

//enter-submit event
$('#input').keypress('submit', function(event) {
   if (event.charCode === 13) {
      event.preventDefault();
      sendMsg();
   }
});