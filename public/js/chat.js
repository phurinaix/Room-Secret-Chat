var socket = io();
var startVirtualAssistanceButton = document.getElementById("start-virtual-assistance");
var startVirtualAssistance = false;

startVirtualAssistanceButton.addEventListener("click", function() {
    startVirtualAssistance = !startVirtualAssistance;
    console.log(startVirtualAssistance);
});

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    // var params = jQuery.deparam(window.location.search);
    var params = {
        method: localStorage.getItem("method"),
        name: localStorage.getItem("name"),
        room: localStorage.getItem("room")
    };
    jQuery("#room_name_title").html('Welcome to room: <span>' + params.room + '</span>');
    if (params.method === "join") {
        // localStorage.clear();
        socket.emit('join', params, function (err) {
            if (err) {
                alert(err);
                window.location.href = '/join.html';
            }
        });
    }
    if (params.method === "create") {
        // localStorage.clear();
        socket.emit('create', params, function (err) {
            if (err) {
                alert(err);
                window.location.href = '/join.html';
            }
        });
    }
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    var ul = jQuery('<ul></ul>');
    users.forEach(function (user) {
        ul.append(jQuery('<li></li>').html(user + '<i class="fa fa-circle" style="font-size:10px;float:right;color:#2ecc71;"></i>'));
    });
    jQuery('#users').html(ul);
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
    });
    if(message.text && startVirtualAssistance){
        responsiveVoice.speak("ข้อความจาก" + message.from + "พูดว่า" + message.text, 'Thai Male');
    }
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        text: jQuery('[name=message]').val()
    }, function () {
        messageTextbox.val('');;
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch locaion.');
    });
});

//speak sound
  var msg = new SpeechSynthesisUtterance('สวัสดี, วันนี้ต้องการให้ช่วยอะไร?');
  msg.lang = 'th-TH';
  window.speechSynthesis.speak(msg);
  var final_transcript = '';
  var recognizing = false;
  var ignore_onend;
  if (!('webkitSpeechRecognition' in window)) {

  } else {
      var recognition = new webkitSpeechRecognition();
      recognition.lang = "th-TH";
      recognition.onstart = function() {
        recognizing = true;
        start_img.src = 'mic-animate.gif';
      };
      recognition.onresult = function(event) {
        console.log(event)
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        final_span.innerHTML = final_transcript;
        document.getElementById("myText").value = final_span.innerHTML;
        speak(final_transcript);
      }
  }
  function startButton(event) {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final_transcript = '';
    recognition.start();
    ignore_onend = false;
    start_img.src = 'mic-slash.gif';
  }
  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = 'mic.gif';
  };
  function speak(text) {

    var msg_light = 'เปิดไฟหน้าบ้าน';
    var turnoffAllLight = 'ปิดไฟทั้งหมด'
    var whatsup = 'สบายดีไหม';
    var nice = 'สบายดี';
    var sawasdee = 'สวัสดี';
    var name ='ชื่ออะไร';
    var fan = 'มีแฟนหรือยัง';
    var web = 'เว็บนี้ดียังไง';
    var web1 = 'เว็บไซต์นี้ดียังไง';
    var web2 = 'เว็บนี้ดีอย่างไง';
    var webdetail = 'เล่าเกี่ยวกับเว็บนี้';
   //sitting sound
    var speechSynthesis = new SpeechSynthesisUtterance();
    speechSynthesis.voiceURI = 'native';
    speechSynthesis.volume = 1; // 0 to 1
    speechSynthesis.rate = 1; // 0.1 to 10
    speechSynthesis.pitch = 2; //0 to 2
    speechSynthesis.lang = 'th-TH';
    var msg = '';
    //botchat sound
    if(text.search(msg_light) != -1 || text.search(turnoffAllLight) != -1 ) {
      msg = "ทำการ" + text + "เรียบร้อยแล้วค่ะ";

      responsiveVoice.speak(msg ,'Thai Female');
    } else if(text.search(whatsup) != -1) {
      msg = 'สบายดีค่ะ, แล้วคุณหล่ะคะ ';

      responsiveVoice.speak(msg ,'Thai Female');
    } else if(text.search(nice) != -1) {
      msg = 'เรื่องของมึง , บอกกูทำไม';

      responsiveVoice.speak(msg ,'Thai Female');
    } else if(text.search(sawasdee) != -1) {
      msg = 'สวัสดีค่ะ,แล้วคุณสบายดีหรือเปล่า';

      responsiveVoice.speak(msg ,'Thai Female');
    } else if(text.search(name) != -1) {
      msg = 'ฉันชื่อพิงคุ';

      responsiveVoice.speak(msg ,'Thai Female');
    } else if(text.search(fan) != -1) {
      msg = 'มีแล้วชื่อว่าเติ้ดสุดหล่อ';

      responsiveVoice.speak(msg ,'Thai Female');
    } else if(text.search(web) != -1) {
      msg = 'เป็น Web Service Chat ที่มีการเข้าระหัสทั้งต้นทางและปลายทางหรือเรียกอีกอย่างนึงคือ End-to-End Encryption หรือ E2EE คือการเข้ารหัสระหว่างคู่สนทนาสองคนตั้งแต่ต้นทางถึงปลายทาง ยกตัวอย่างให้มีคู่สนทนาเป็นนายA และนายBเมื่อนายAส่งข้อความหานายBโดยเปิดระบบE2EE คือLetterSealing ในLINE ข้อความที่ออกไปหานายB จะถูกแปลงเป็นรหัสระหว่างทางโดยมีถนนคืออินเทอร์เน็ตระหว่างที่ข้อความถูกส่งนั้นหากมีผู้ไม่ประสงค์ดีต้องการดูข้อความก็จะแสดงเป็นแค่รหัสเท่านั้นไม่สามารถเห็นข้อความที่นายAส่งถึงนายBได้แบบตรงๆครับ';

      responsiveVoice.speak(msg ,'Thai Female');
    } else if(text.search(web1) != -1) {
      msg = 'เป็น Web Service Chat ที่มีการเข้าระหัสทั้งต้นทางและปลายทางหรือเรียกอีกอย่างนึงคือ End-to-End Encryption หรือ E2EE คือการเข้ารหัสระหว่างคู่สนทนาสองคนตั้งแต่ต้นทางถึงปลายทาง ยกตัวอย่างให้มีคู่สนทนาเป็นนายA และนายBเมื่อนายAส่งข้อความหานายBโดยเปิดระบบE2EE คือLetterSealing ในLINE ข้อความที่ออกไปหานายB จะถูกแปลงเป็นรหัสระหว่างทางโดยมีถนนคืออินเทอร์เน็ตระหว่างที่ข้อความถูกส่งนั้นหากมีผู้ไม่ประสงค์ดีต้องการดูข้อความก็จะแสดงเป็นแค่รหัสเท่านั้นไม่สามารถเห็นข้อความที่นายAส่งถึงนายBได้แบบตรงๆครับ';

      responsiveVoice.speak(msg ,'Thai Female');
    } else if(text.search(web2) != -1) {
      msg = 'เป็น Web Service Chat ที่มีการเข้าระหัสทั้งต้นทางและปลายทางหรือเรียกอีกอย่างนึงคือ End-to-End Encryption หรือ E2EE คือการเข้ารหัสระหว่างคู่สนทนาสองคนตั้งแต่ต้นทางถึงปลายทาง ยกตัวอย่างให้มีคู่สนทนาเป็นนายA และนายBเมื่อนายAส่งข้อความหานายBโดยเปิดระบบE2EE คือLetterSealing ในLINE ข้อความที่ออกไปหานายB จะถูกแปลงเป็นรหัสระหว่างทางโดยมีถนนคืออินเทอร์เน็ตระหว่างที่ข้อความถูกส่งนั้นหากมีผู้ไม่ประสงค์ดีต้องการดูข้อความก็จะแสดงเป็นแค่รหัสเท่านั้นไม่สามารถเห็นข้อความที่นายAส่งถึงนายBได้แบบตรงๆครับ';
      speechSynthesis.text = msg;
      responsiveVoice.speak(msg ,'Thai Female');
    } else if(text.search(webdetail) != -1) {
      msg = 'เว็บนี้เป็นเว็บแชทโดยผู้ใช้สามารถสร้างห้องแชทเพื่อใช้พูดคุยกับเพื่อนหรือบุคคลอื่นๆที่ต้องการสนทนาด้วย เว็บนี้จะเป็นช่องทางในการติดต่อสื่อสารซึ่งกันและกัน โดยที่ข้อความที่ผู้ส่งและผู้รับได้รับนั้น จะมั่นใจได้เลยว่าไม่มีการถูกตัดแปลง หรือถูฏแก้ไขได้ หรือจะถูกแอบดักจับข้อความระหว่างทางที่ส่งได้ เพราะข้อความของเว็บไซต์มีการเข้าระหัสแบบRSA จึงมั่นใจได้เลยว่าปลอดภัย มีความเป็นส่วนตัว';

      responsiveVoice.speak(msg ,'Thai Female');
    }else {
      msg = 'บทสนทนาที่สามารถคุยกับbotchat ได้ มีดังนี้ '+msg_light+','+turnoffAllLight+','+whatsup+','+sawasdee+','+name+','+fan+','+web+','+web1+','+web2+','+webdetail;
    }
    window.speechSynthesis.speak(speechSynthesis);
    final_result.innerHTML = msg;
  }
