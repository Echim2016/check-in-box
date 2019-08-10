function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

		var colors = [
			'#490A3D',
			'#BD1550',
			'#E97F02',
			'#F8CA00',
			'#8A9B0F',
			'#69D2E7',
			'#FA6900',
			'#16a085',
			'#27ae60',
			'#2c3e50',
			'#f39c12',
			'#e74c3c',
			'#9b59b6',
			'#FB6964',
			'#342224',
			'#472E32',
			'#77B1A9',
			'#73A857'
		];

var quotes=[
	// ["推薦的一部電影","alpha team"],
	// ["最近最期待的一件事","alpha team"]
];
      var sliderPeople = document.getElementById("sliderPeople");
      var outPeople = document.getElementById("outPeople");
      var sliderTime = document.getElementById("sliderTime");
      var outTime = document.getElementById("outTime");

      var timeFactor = "0";

      outPeople.innerHTML = sliderPeople.value;
      outTime.innerHTML = sliderTime.value;

      var persons = 2;
      var mins = 5 ;
      sliderPeople.oninput = function() {
        outPeople.innerHTML = this.value;
        persons = parseInt(document.getElementById("sliderPeople").value);
        timeFactor = Math.floor(mins/persons);
      }
      sliderTime.oninput = function() {
        outTime.innerHTML = this.value;
        mins = parseInt(document.getElementById("sliderTime").value);
        timeFactor = Math.floor(mins/persons);
      }


     var topic = ["嗨，想聊些什麼？"];
     var group = ["這是問題分類"];
     var group2 = [""];
     var estTime = [""];

     $.getJSON('https://spreadsheets.google.com/feeds/list/1_dTloIAxD4loWNOn3JeHcokU2uo5anzvjDKE3uCYmXs/od6/public/values?alt=json', function (data){
       // console.log(data.feed.entry[0]['gsx$topic']['$t']);
       // console.log(data.feed.entry.length);
       for (var i = 0; i < data.feed.entry.length; i++){
            topic[i] = data.feed.entry[i].gsx$topic['$t'];
            group[i] = data.feed.entry[i].gsx$group['$t'];
            group2[i] = data.feed.entry[i].gsx$group2['$t'];
            estTime[i]= data.feed.entry[i].gsx$time['$t'];
      }
      });


var randomquote = "";
var randomcolor = "";

function getQuote() {
    console.log(timeFactor);
  	randomcolor = Math.floor(Math.random() * colors.length);
    randomquote = Math.floor(Math.random() * topic.length);

    if(timeFactor==0){
      var currentQuote = "這是 Check In 資料庫";
      var currentAuthor = "這是預估時間";
      timeFactor = Math.floor(mins/persons);
    }
    else if(timeFactor<2){
      currentQuote = "哎呀，看起來依照你們的人數和時間，現在並不適合check-in，你們要不要多留點時間呢？"
      currentAuthor = "0" + " （min/人）";
    }
    else{

      while (estTime[randomquote] > timeFactor) {
        randomquote = Math.floor(Math.random() * topic.length);
      }

      currentQuote = topic[randomquote];
      currentAuthor = estTime[randomquote] + " （min/人）";

    }



    // if (estTime[randomquote] <= timeFactor || estTime[randomquote]=="?"){
    //     currentQuote = topic[randomquote];
    //     currentAuthor = estTime[randomquote] + " （min）";
    // }

	// if (inIframe()) {
	// 	$('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=aLamm&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
	// }

	$(document).ready(function () {
	    $('html body').animate({
	        backgroundColor: colors[randomcolor],
	        color: colors[randomcolor]
	    }, 500);
	    $('#newquote, .social-icons .fa-twitter').animate({ backgroundColor: colors[randomcolor] }, 500);
			$('blockquote footer').animate({ color: colors[randomcolor] }, 500);
	    $('blockquote').animate({ borderLeftColor: colors[randomcolor] }, 500);
	    $('#quotetext').animate({ opacity: 0 }, 500, function () {
	        $(this).animate({ opacity: 1 }, 500);
	        $(this).text(currentQuote);
	    });
	    $('#quotesource').animate({ opacity: 0 }, 300, function () {
	        $(this).animate({ opacity: 1 }, 500);
	        $(this).text(currentAuthor);
	    });
    });
}

function openURL(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

getQuote();

$(document).ready(function () {
    $('#newquote').on('click', getQuote);
    $('#tweetquote').on('click', function () {
        if (!inIframe()) {
            openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });
});
