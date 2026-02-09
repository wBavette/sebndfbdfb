import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, ArrowLeft, Zap } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { backupStreams, socialLinks } from "../data/mock";

const VideoPlayer = () => {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(0);
  const [currentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const stream = backupStreams.find(s => s.id === streamId);

  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setProgress(percentage);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!stream) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Stream non trouvé</h1>
          <button
            onClick={() => navigate("/")}
            className="btn-primary-hero"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 navbar-blur border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-xl hover:bg-primary/10 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-foreground">{stream.title}</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-live animate-glow" />
              <span className="text-xs text-muted-foreground">{stream.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="bg-background py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-3">
          {/* ACHÈTE TON IPTV Button */}
          <Link
            to="/iptv"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <Zap className="w-5 h-5" />
            ACHÈTE TON IPTV
          </Link>

          {/* Telegram Button */}
          <a
            href={socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0088CC] hover:bg-[#007AB8] text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            TELEGRAM
          </a>

          {/* Discord Button */}
          <a
            href={socialLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            DISCORD
          </a>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div
          ref={containerRef}
          className="w-full max-w-5xl video-player-container"
        >
          {/* Video element - using poster as placeholder since we don't have actual video */}
          <div className="relative w-full h-full bg-card">
            <img
              src={stream.thumbnail}
              alt={stream.title}
              className="w-full h-full object-cover"
            />

            {/* Play overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
            >
              {!isPlaying && (
                <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-primary/50 transition-transform hover:scale-110">
                  <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div
              className={`video-controls transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
            >
              {/* Progress bar */}
              <div
                className="progress-bar mb-4"
                onClick={handleProgressClick}
              >
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={togglePlay} className="control-button">
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  <button onClick={toggleMute} className="control-button">
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>

                  <span className="text-xs text-muted-foreground ml-2">
                    {formatTime(currentTime)} / {formatTime(duration || 0)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="control-button">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button onClick={toggleFullscreen} className="control-button">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
