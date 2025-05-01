import React, { useRef, useState, useEffect } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoCausel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  const [loadedData, setLoadedData] = useState([]);

  useGSAP(() => {

    gsap.to('#slider' , {
      transform: `translateX(${-60 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut'
    } )


    gsap.to(`.video-${videoId}`, {
      scrollTrigger: {
        trigger: `.video-${videoId}`,
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [videoId]);

  useEffect(() => {
    const currentVideo = videoRef.current[videoId];
    if ( currentVideo) {
      if (!isPlaying) {
        currentVideo.pause();
      } else {
        startPlay && currentVideo.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleMetaData = (i, e) => setLoadedData((prev) => [...prev, e]);

  


  useEffect(() => {
    if (!startPlay || !videoRef.current[videoId]) return;
  
    const span = videoSpanRef.current[videoId];
    const video = videoRef.current[videoId];
    let currentProgress = 0;
  
    // Set default width of progress span to 0
    gsap.set(span, { width: "0%" });
  
    const anim = gsap.to({}, {
      duration: video.duration,
      onUpdate: () => {
        const progress = Math.ceil((video.currentTime / video.duration) * 100);
        if (progress !== currentProgress) {
          currentProgress = progress;
  
          // Update parent span width
          gsap.to(videoDivRef.current[videoId], {
            width:
              window.innerWidth < 760
                ? "10vw"
                : window.innerWidth < 1200
                ? "10vw"
                : "4vw",
          });
  
          // Update progress fill
          gsap.to(span, {
            width: `${currentProgress}%`,
            backgroundColor: "white",
          });
        }
      },
      onComplete: () => {
        if(isPlaying){
          gsap.to(videoDivRef.current[videoId], {
            width: '12px'
          })
          gsap.to(span, {
            backgroundColor: '#afafaf'
          })
        }
      }
    })

    if(videoId === 0){
      anim.restart();
    }
    const animUpdate = () =>{
      anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
    }


    if(isPlaying){
      gsap.ticker.add(animUpdate)
    } else {
      gsap.ticker.remove(animUpdate)
    }
   
  }, [videoId, startPlay]);
  

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: i + 1,
        }));
        break;

      case "video-last":
        setVideo((prev) => ({
          ...prev,
          isLastVideo: true,
          isPlaying: false,
        }));
        break;

      case "pause":
        videoRef.current[videoId]?.pause();
        setVideo((prev) => ({ ...prev, isPlaying: false }));
        break;

      case "video-reset":
        setVideo((prev) => ({
          ...prev,
          isLastVideo: false,
          videoId: 0,
          startPlay: true,
          isPlaying: true,
        }));
        break;

      case "play":
        setVideo((prev) => ({
          ...prev,
          isPlaying: true,
        }));
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="flex items-center " id="slider" >
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                onEnded={() => 
                  i !== 3 ?
                  handleProcess('video-end' , i)
                  : handleProcess('video-last')
                }
                  className={`${
                    list.id == 2  &&'translate-X-44'}
                    pointer-events-none
                  }`
                 
                }
                  playsInline
                  preload="auto"
                  
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() =>
                    setVideo((prev) => ({ ...prev, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-700 backdrop-blur-xs rounded-full">
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
                className=" mt-0 w-3 h-3 rounded-full cursor-pointer relative bg-gray-200"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="mt-0 absolute h-full w-full rounded-full"
                
                ref={(el) => (videoSpanRef.current[i] = el)}
              ></span>
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCausel;
