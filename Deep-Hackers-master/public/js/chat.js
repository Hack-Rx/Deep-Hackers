const socket = io()

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

//options
const{username,room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('Video', (message) => {
    video=message.text
    console.log(video)
    if(video.status=='pause'){
        player.pauseVideo()
        video.time=player.getCurrentTime();
    }
    if(video.status=='play'){
        player.seekTo(video.time, true)
        player.playVideo()
    }
})


$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled','disabled')
    const message = e.target.elements.message.value
    console.log(typeof(message))
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value=''
        $messageFormInput.focus()
        if(error) {
            return console.log(error)
        }

        console.log('Message Delivered')
    })
})

socket.emit('join', {username,room}, (error) => {
    if(error){
        alert(error)
        location.href = '/'
    }
})

var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 
 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     height: '390',
     width: '640',
     videoId: 'M7lc1UVf-VE',
     events: {
       'onReady': onPlayerReady
       }
   });
 }
     

 var video = {
    status: null,
    time: 0,
    newUser: false
  }
  


 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {
   event.target.playVideo();
 }

 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 

 document.getElementById('resume').onclick = function() {
     console.log('sanket')
    //e.preventDefault()
    //$play.setAttribute('disabled','disabled')
    video.status='play'
    const message = video
    socket.emit('play', message, (error) => {
        //$messageFormButton.removeAttribute('disabled')
        if(error) {
            return console.log(error)
        }
        //player.playVideo();
        console.log('Video Play')
    })
};

document.getElementById('pause').onclick = function() {
    console.log('sanket')
    //e.preventDefault()
    //$play.setAttribute('disabled','disabled')
    video.status='pause'
    const message = video
    socket.emit('pause', message, (error) => {
        //$messageFormButton.removeAttribute('disabled')
        if(error) {
            return console.log(error)
        }
        //player.playVideo();
        console.log('Video Pause')
    })
};


document.getElementById('sync').onclick = function() {
    const message = 'Sync Request'
    console.log(message)
    socket.emit('sendMessage', message, (error) => {
        if(error) {
            return console.log(error)
        }

        console.log('Message Delivered')
    })

};








