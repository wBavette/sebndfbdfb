import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { backupStreams } from "../data/mock";

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
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
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

      {/* Stream Info */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-live/10 border border-live/20 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-live animate-glow" />
                <span className="text-xs font-semibold text-live">En direct</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {stream.viewers.toLocaleString()} spectateurs
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">{stream.title}</h2>
            <p className="text-muted-foreground">
              Profitez du streaming en direct sur meruTV. Qualité HD disponible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
