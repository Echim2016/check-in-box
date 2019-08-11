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

      // var sliderPeople = document.getElementById("sliderPeople");
      // var outPeople = document.getElementById("outPeople");
      // var sliderTime = document.getElementById("sliderTime");
      // var outTime = document.getElementById("outTime");

      // var timeFactor = "0";

      // outPeople.innerHTML = sliderPeople.value;
      // outTime.innerHTML = sliderTime.value;
      //
      // var persons = 2;
      // var mins = 5 ;
      // sliderPeople.oninput = function() {
      //   outPeople.innerHTML = this.value;
      //   persons = parseInt(document.getElementById("sliderPeople").value);
      //   timeFactor = Math.floor(mins/persons);
      // }
      // sliderTime.oninput = function() {
      //   outTime.innerHTML = this.value;
      //   mins = parseInt(document.getElementById("sliderTime").value);
      //   timeFactor = Math.floor(mins/persons);
      // }


     var topic = ["嗨，想聊些什麼？"];
     var group = ["這是問題分類"];
     var group2 = [""];
     // var estTime = [];

     // var dislike = [""];
     // var like = [""];
     var featured =[]
     var weight = [];
     var no = [];
     var like = [];
     var dislike = [];

     var drawArray=[];
     var noArray=[];
     var disArray=[];
     var likeArray=[];
     var featuredArray=[];

     var randomquote = "";
     var randomcolor = "";
     var currentQuote = "";


     $.getJSON('https://spreadsheets.google.com/feeds/list/1_dTloIAxD4loWNOn3JeHcokU2uo5anzvjDKE3uCYmXs/od6/public/values?alt=json', function (data){

       for (var i = 0; i < data.feed.entry.length; i++){
            topic[i] = data.feed.entry[i].gsx$topic['$t'];
            // group[i] = data.feed.entry[i].gsx$group['$t'];
            // group2[i] = data.feed.entry[i].gsx$group2['$t'];
            // estTime[i]= data.feed.entry[i].gsx$time['$t'];
            featured[i]= data.feed.entry[i].gsx$featured['$t'];
            like[i]= data.feed.entry[i].gsx$like['$t'];
            dislike[i]= data.feed.entry[i].gsx$dislike['$t'];
            weight[i]= data.feed.entry[i].gsx$weight['$t'];
            no[i]= data.feed.entry[i].gsx$no['$t'];

            for (var j = 0; j < weight[i]; j++) {
              drawArray.push(topic[i]);
              noArray.push(no[i]);
              disArray.push(dislike[i]);
              likeArray.push(like[i]);
              featuredArray.push(featured[i]);

            }
      }
      getQuote();
      });



function pressDislike(){
  var url='https://script.google.com/macros/s/AKfycbzjmC31RJi_ZsPCAhkGtnyXHjB8J_zbac2uvNqW1A/exec';
  // console.log(disArray[randomquote]);
  // console.log(randomquote);
  // console.log(noArray[randomquote]);
  $.ajax({
        url: url,
        type: 'GET',
        data:{
          "like":0,
          "dislike":disArray[randomquote],
          "row":noArray[randomquote],
          "column":9,
          "action":"dislike"
        },
        success: function(res) {
            // alert("Successfully submitted");
        }
    });
    getQuote();
}

function pressLike(){
  var url='https://script.google.com/macros/s/AKfycbzjmC31RJi_ZsPCAhkGtnyXHjB8J_zbac2uvNqW1A/exec';
  console.log(likeArray[randomquote]);
  console.log(randomquote);
  console.log(noArray[randomquote]);
  $.ajax({
        url: url,
        type: 'GET',
        data:{
          "like":likeArray[randomquote],
          "dislike":0,
          "row":noArray[randomquote],
          "column":8,
          "action":"like"
        },
        success: function(res) {
            // alert("Successfully submitted");
            Swal.fire({
              type: 'success',
              title: '讚啦，祝你有個愉快的Check-in時光！',
              showConfirmButton: false,
              timer: 6000
            })
            setTimeout(function(){// wait for 5 secs(2)
                location.reload(); // then reload the page.(3)
           }, 2000);
        }
    });

}


var currentText = "";
var getQuoteCount =0;

function getQuote() {
  	// randomcolor = Math.floor(Math.random() * colors.length);
    getQuoteCount++;
    currentText ="";
    randomquote = Math.floor(Math.random() * drawArray.length);
    // if(timeFactor==10){
    //   var currentQuote = "這是 Check In 資料庫";
    //   var currentAuthor = "這是預估時間";
    //   // timeFactor = Math.floor(mins/persons);
    //   timeFactor = 1;
    // }
    // else if(timeFactor<0){
    //   currentQuote = "哎呀，系統似乎出了點問題，請重新整理";
    //   currentAuthor = "0" + " （min/人）";
    // }
    // else{

      // while (estTime[randomquote] > timeFactor) {
      //   randomquote = Math.floor(Math.random() * topic.length);
      // }
      currentQuote = drawArray[randomquote];
      if(featured[randomquote]==3){
        currentText = "本月編輯精選" ;
      }
      else if (featured[randomquote]==2) {
        currentText = "歷久不衰系列"
      }

      if (getQuoteCount == 40){
        currentQuote = "欸欸欸，挑太久了吧！！";
      }
      else if(getQuoteCount == 50){
        currentQuote = topic[289];
        randomquote = 0;
        getQuoteCount = 0;
      }

      // currentAuthor = estTime[randomquote] + " （min/人）";
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
	        $(this).text(currentText);
	    });
    });

}

function openURL(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

$(document).ready(function () {
    $('#newquote').on('click', getQuote);
    $('#btnDislike').on('click', pressDislike);
    $('#btnLike').on('click', pressLike);
    $('#tweetquote').on('click', function () {
        if (!inIframe()) {
            openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });
});
