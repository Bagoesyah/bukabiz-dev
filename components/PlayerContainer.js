import { useEffect, useState } from "react";
import ICPlayCircle from "@assets/PlayCircle.svg"

let player = '';

function PlayerContainer({ urlVideo, urlThumbnail, className } = props) {
  const [loading, setLoading] = useState(true)
  const strUrl = urlVideo.split('/');
  const videoId = strUrl[4];

  useEffect(() => {
    setLoading(false)
    //I need to pause/play the video by pressing space button which is coming form parent handleSpace
    if (videoId) {
      if (!window.YT) {
        // If not, load the script asynchronously
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        // onYouTubeIframeAPIReady will load the video after the script is loaded
        window.onYouTubeIframeAPIReady = loadVideo;

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        // If script is already there, load the video directly
        loadVideo();
      }
    }
  });

  const loadVideo = () => {
    // the Player object is created uniquely based on the id in props
    player = new window.YT.Player(`youtube-player-${videoId}`, {
      videoId: videoId,
      height: '100%',
      // width: '870',
      playerVars: {
        autoplay: 0,
        fs: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      },
    });
  };

  const onPlayerReady = event => {
    // console.log("onPlayerReady", event.target);
    event.target.setVolume(100);
    // event.target.playVideo();
    // if (handleSpace) console.log(event); // want to stop the video if space bar clicked
  };

  const onPlayerStateChange = event => {
    // console.log('onPlayerStateChange', event.target);
    if (videoId.id && iframeCont) {
      if (handleSpace) {
        stopVideo();
      } else {
        startVideo();
      }
    }

    let playerWrap = document.querySelector(".player-wrap");
    let iconButton = document.querySelector(".icon-button");

    if (event.data == YT.PlayerState.ENDED) {
      playerWrap.classList.add("ended");
      iconButton.classList.add("ended");
    } else if (event.data == YT.PlayerState.PAUSED) {
      playerWrap.classList.add("paused");
      iconButton.classList.add("paused");
    } else if (event.data == YT.PlayerState.PLAYING) {
      setTimeout(() => {
        playerWrap.classList.remove("ended");
        playerWrap.classList.remove("paused");

        iconButton.classList.remove("ended");
        iconButton.classList.remove("paused");
      }, 100);
    }

    let playerWrapOuter = document.querySelector(".player-wrap-outer")
    playerWrapOuter.addEventListener("click", function () {
      let playerState = player.getPlayerState();
      if (playerState == YT.PlayerState.ENDED) {
        player.seekTo(0);
      } else if (playerState == YT.PlayerState.PAUSED) {
        player.playVideo();
      }
    });
  };

  function stopVideo() {
    player.stopVideo();
  }

  function startVideo() {
    player.startVideo();
  }

  return (
    <>
      {!loading && (
        <style>
          {`
          .player-wrap.paused::after, .player-wrap.ended::after {
            background-image: url(${urlThumbnail});
          }
        `}
        </style>
      )}

      <div className={`player-wrap-outer ${className}`}>
        <div className="player-wrap">
          <div id={`youtube-player-${videoId}`} />
        </div>
        <div className=" icon-button">
          <ICPlayCircle />
        </div>
      </div>
    </>
  )
}
export default PlayerContainer