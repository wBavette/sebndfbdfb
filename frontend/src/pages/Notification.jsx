import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { backupStreams, socialLinks } from "../data/mock";

const Notification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const streamId = searchParams.get("streamId") || "1";
  const [hasJoined, setHasJoined] = useState(false);

  const stream = backupStreams.find(s => s.id === streamId);

  const handleJoinTelegram = () => {
    window.open(socialLinks.telegram, "_blank");
    setHasJoined(true);
  };

  const handleContinue = () => {
    navigate(`/player/${streamId}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border/50 rounded-2xl p-6 sm:p-8 text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-telegram/10 rounded-full flex items-center justify-center">
          <Send className="w-8 h-8 text-telegram" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Rejoignez notre Telegram
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Pour accéder au contenu, vous devez d'abord rejoindre notre communauté Telegram.
          </p>
        </div>

        {stream && (
          <div className="bg-secondary/50 rounded-xl p-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-16 h-10 object-cover rounded-lg"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{stream.title}</p>
                <p className="text-xs text-muted-foreground">{stream.category}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {!hasJoined ? (
            <button
              onClick={handleJoinTelegram}
              className="btn-telegram"
            >
              <Send className="w-5 h-5" />
              Rejoindre Telegram
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
            >
              Continuer vers le stream
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="w-full text-muted-foreground hover:text-foreground text-sm py-2 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
