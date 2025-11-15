import { useState, useEffect } from "react";
import { Heart, Sparkles, Copy, Check } from "lucide-react";

export default function ProposalPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [messageRevealed, setMessageRevealed] = useState([]);
  const [showProposal, setShowProposal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showThinkingMessage, setShowThinkingMessage] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [partnerName, setPartnerName] = useState("my love");
  const [showNameEntry, setShowNameEntry] = useState(true);
  const [enteredName, setEnteredName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Check if name is in URL, if so skip name entry
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const nameFromUrl = urlParams.get("name");
      if (nameFromUrl) {
        setPartnerName(nameFromUrl);
        setShowNameEntry(false);
      }
    }
  }, []);

  const specialMessage = "I love you today tomorrow and forever".split(" ");

  // Generate floating hearts
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 20; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 2,
        });
      }
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  const handleNameSubmit = () => {
    if (enteredName.trim()) {
      const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      const link = `${baseUrl}/?name=${encodeURIComponent(enteredName.trim())}`;
      setGeneratedLink(link);
    }
  };

  const copyToClipboard = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  const revealNextWord = () => {
    if (messageRevealed.length < specialMessage.length) {
      setMessageRevealed([...messageRevealed, messageRevealed.length]);
    } else {
      setShowProposal(true);
    }
  };

  const handleProposalResponse = (answer) => {
    if (answer === "yes") {
      setShowCelebration(true);
    } else if (answer === "no") {
      setShowThinkingMessage(true);
    }
  };

  const resetToNameEntry = () => {
    setShowNameEntry(true);
    setCurrentSection(0);
    setMessageRevealed([]);
    setShowProposal(false);
    setShowCelebration(false);
    setShowThinkingMessage(false);
    setPartnerName("my love");
    setEnteredName("");
    setGeneratedLink("");
    setCopied(false);
  };

  const sections = [
    {
      title: `For ${partnerName}`,
      subtitle: "Someone very special...",
      action: "Click to continue",
    },
    {
      title: "Every moment with you",
      subtitle: "has been a beautiful journey",
      action: "Continue our story",
    },
    {
      title: "And now I have",
      subtitle: "something important to tell you...",
      action: "Reveal my message",
    },
  ];

  // Name Entry Screen
  if (showNameEntry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-pink-900 dark:via-rose-900 dark:to-red-900 relative overflow-hidden">
        {/* Floating Hearts Background */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-300 dark:text-pink-400 opacity-20 pointer-events-none"
            style={{
              left: `${heart.left}%`,
              animation: `float ${heart.duration}s ease-in-out infinite`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            <Heart size={20} fill="currentColor" />
          </div>
        ))}

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-pink-900/20 backdrop-blur-sm border border-pink-200 dark:border-pink-700 rounded-3xl p-12 md:p-16 shadow-2xl">
              {!generatedLink ? (
                <>
                  <div className="mb-8">
                    <div className="text-6xl mb-6">💕</div>
                    <h1
                      className="text-pink-900 dark:text-pink-100 font-normal leading-tight mb-4"
                      style={{
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        fontFamily: "Crimson Pro, Georgia, serif",
                      }}
                    >
                      Create Your Proposal
                    </h1>
                    <p
                      className="text-pink-700 dark:text-pink-200 text-lg md:text-xl mb-8"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Enter their name to create a personalized proposal website
                    </p>
                  </div>

                  <div className="mb-8">
                    <input
                      type="text"
                      value={enteredName}
                      onChange={(e) => setEnteredName(e.target.value)}
                      placeholder="Enter their name..."
                      className="w-full px-6 py-4 text-lg border-2 border-pink-200 rounded-full focus:border-pink-400 focus:outline-none text-center text-pink-800 dark:text-pink-200 bg-white/50 dark:bg-pink-900/30"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                      }}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleNameSubmit()
                      }
                    />
                  </div>

                  <button
                    onClick={handleNameSubmit}
                    disabled={!enteredName.trim()}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Create Proposal Link ✨
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="text-6xl mb-6">🎉</div>
                    <h1
                      className="text-pink-900 dark:text-pink-100 font-normal leading-tight mb-4"
                      style={{
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        fontFamily: "Crimson Pro, Georgia, serif",
                      }}
                    >
                      Your Link is Ready!
                    </h1>
                    <p
                      className="text-pink-700 dark:text-pink-200 text-lg mb-8"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Share this personalized link with {enteredName}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="bg-pink-50 dark:bg-pink-900/50 border-2 border-pink-200 dark:border-pink-600 rounded-2xl p-4 mb-4">
                      <p
                        className="text-pink-800 dark:text-pink-200 break-all text-sm"
                        style={{
                          fontFamily: "monospace",
                        }}
                      >
                        {generatedLink}
                      </p>
                    </div>

                    <button
                      onClick={copyToClipboard}
                      className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex items-center gap-2 mx-auto"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {copied ? (
                        <>
                          <Check size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy Link
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setGeneratedLink("");
                      setEnteredName("");
                    }}
                    className="text-pink-600 dark:text-pink-300 hover:text-pink-800 dark:hover:text-pink-100 underline"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Create another link
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Original proposal flow (when accessed via generated link)
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-pink-900 dark:via-rose-900 dark:to-red-900 relative overflow-hidden">
      {/* Floating Hearts Background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-300 dark:text-pink-400 opacity-20 pointer-events-none"
          style={{
            left: `${heart.left}%`,
            animation: `float ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart size={20} fill="currentColor" />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Initial Sections */}
          {currentSection < 3 && !showProposal && (
            <div className="bg-white dark:bg-pink-900/20 backdrop-blur-sm border border-pink-200 dark:border-pink-700 rounded-3xl p-12 md:p-16 shadow-2xl">
              <div className="mb-8">
                <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-6 animate-pulse" />
                <h1
                  className="text-pink-900 dark:text-pink-100 font-normal leading-tight mb-4"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontFamily: "Crimson Pro, Georgia, serif",
                  }}
                >
                  {sections[currentSection]?.title}
                </h1>
                <p
                  className="text-pink-700 dark:text-pink-200 text-xl md:text-2xl mb-8"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {sections[currentSection]?.subtitle}
                </p>
              </div>

              <button
                onClick={() => {
                  if (currentSection < 2) {
                    setCurrentSection(currentSection + 1);
                  } else {
                    setCurrentSection(3);
                  }
                }}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                style={{
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {sections[currentSection]?.action}
              </button>
            </div>
          )}

          {/* Message Reveal Section */}
          {currentSection === 3 && !showProposal && (
            <div className="bg-white dark:bg-pink-900/20 backdrop-blur-sm border border-pink-200 dark:border-pink-700 rounded-3xl p-12 md:p-16 shadow-2xl">
              <div className="mb-8">
                <Heart
                  className="w-16 h-16 text-red-500 mx-auto mb-8 animate-pulse"
                  fill="currentColor"
                />
                <h2
                  className="text-pink-900 dark:text-pink-100 text-2xl md:text-3xl mb-8"
                  style={{
                    fontFamily: "Crimson Pro, Georgia, serif",
                  }}
                >
                  My heart wants to tell you...
                </h2>

                <div className="min-h-[120px] flex items-center justify-center mb-8">
                  <p
                    className="text-pink-800 dark:text-pink-200 text-2xl md:text-4xl leading-relaxed"
                    style={{
                      fontFamily: "Crimson Pro, Georgia, serif",
                      fontStyle: "italic",
                    }}
                  >
                    {specialMessage.map((word, index) => (
                      <span
                        key={index}
                        className={`inline-block mr-3 transition-all duration-500 ${
                          messageRevealed.includes(index)
                            ? "opacity-100 transform translate-y-0"
                            : "opacity-0 transform translate-y-4"
                        }`}
                      >
                        {word}
                        {index === 2 && <br />} {/* Line break after "you" */}
                      </span>
                    ))}
                  </p>
                </div>

                <button
                  onClick={revealNextWord}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {messageRevealed.length < specialMessage.length
                    ? "Continue..."
                    : "There's more..."}
                </button>
              </div>
            </div>
          )}

          {/* Proposal Section */}
          {showProposal && !showCelebration && !showThinkingMessage && (
            <div className="bg-white dark:bg-pink-900/20 backdrop-blur-sm border border-pink-200 dark:border-pink-700 rounded-3xl p-12 md:p-16 shadow-2xl">
              <div className="mb-8">
                <div className="text-6xl mb-8 animate-bounce">💍</div>
                <h1
                  className="text-pink-900 dark:text-pink-100 font-normal leading-tight mb-8"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontFamily: "Crimson Pro, Georgia, serif",
                  }}
                >
                  {partnerName}, my love...
                </h1>
                <h2
                  className="text-pink-800 dark:text-pink-200 text-3xl md:text-5xl mb-12 leading-tight"
                  style={{
                    fontFamily: "Crimson Pro, Georgia, serif",
                    fontWeight: "bold",
                  }}
                >
                  Will you marry me?
                </h2>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => handleProposalResponse("yes")}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-xl"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Yes! 💕
                  </button>
                  <button
                    onClick={() => handleProposalResponse("no")}
                    className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-xl"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Let me think...
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Thinking Message Section */}
          {showThinkingMessage && !showCelebration && (
            <div className="bg-white dark:bg-pink-900/20 backdrop-blur-sm border border-pink-200 dark:border-pink-700 rounded-3xl p-12 md:p-16 shadow-2xl">
              <div className="text-center">
                <div className="text-6xl mb-8 animate-bounce">🤭</div>
                <h1
                  className="text-pink-900 dark:text-pink-100 font-bold leading-tight mb-8"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontFamily: "Crimson Pro, Georgia, serif",
                  }}
                >
                  Oh no no no! 😘
                </h1>
                <h2
                  className="text-pink-800 dark:text-pink-200 text-2xl md:text-3xl mb-8"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  You can't think about this one, {partnerName}! 💕
                </h2>
                <p
                  className="text-pink-700 dark:text-pink-300 text-lg md:text-xl mb-8"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  You have to marry me! It's the only option! 🥰✨
                </p>

                <button
                  onClick={() => handleProposalResponse("yes")}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-xl"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Fine, YES! 💍
                </button>
              </div>
            </div>
          )}

          {/* Celebration Section */}
          {showCelebration && (
            <div className="bg-white dark:bg-pink-900/20 backdrop-blur-sm border border-pink-200 dark:border-pink-700 rounded-3xl p-12 md:p-16 shadow-2xl">
              <div className="text-center">
                <div className="text-8xl mb-8 animate-bounce">🎉</div>
                <h1
                  className="text-pink-900 dark:text-pink-100 font-bold leading-tight mb-6"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontFamily: "Crimson Pro, Georgia, serif",
                  }}
                >
                  YES!
                </h1>
                <h2
                  className="text-pink-800 dark:text-pink-200 text-2xl md:text-3xl mb-8"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  We're getting married! 💍✨
                </h2>
                <p
                  className="text-pink-700 dark:text-pink-300 text-lg md:text-xl mb-8"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  I can't wait to spend forever with you, {partnerName}! 💕
                </p>

                <button
                  onClick={resetToNameEntry}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Create New Proposal ✨
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
