import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { SaveButton } from '@/components/ui/save-button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';
import { MatrixText } from '@/components/ui/matrix-text';
import { CheckBox } from '@/components/ui/checkbox';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';
import { Typewriter } from '@/components/ui/typewriter-text';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import SearchComponent from '@/components/ui/animated-glowing-search-bar';
import { HeroScrollDemo } from '@/components/hero-scroll-demo';
import "./App.css";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isFourthModalOpen, setIsFourthModalOpen] = useState(false);
  const [isFifthModalOpen, setIsFifthModalOpen] = useState(false);
  
  const [currentText, setCurrentText] = useState(1);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState([false, false, false, false]);
  const [selectionOrder, setSelectionOrder] = useState<number[]>([]);
  const [ethAddress, setEthAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showMintButton, setShowMintButton] = useState(false); // Добавлено состояние
  const checkboxOrder = [3, 1, 2, 0];
  const isMobile = useIsMobile();
  
  // в теле компонента:
  const [isHeroSlideOpen, setIsHeroSlideOpen] = useState(false);


  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setShowNextButton(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleParticleComplete = () => {};
  const handleSecondParticleComplete = () => {};
  const handleNextClick = () => {
    setIsOpen(false);
    setIsSecondModalOpen(true);
  };
  const handleYesClick = () => {
    setIsSecondModalOpen(false);
    setIsThirdModalOpen(true);
  };
  const handleTextComplete = () => {
    if (currentText === 1) {
      setTimeout(() => {
        setCurrentText(2);
      }, 3000);
    } else if (currentText === 2) {
      setTimeout(() => {
        setCurrentText(3);
      }, 3000);
    } else if (currentText === 3) {
      setTimeout(() => {
        setShowCheckboxes(true);
      }, 7000);
    }
  };
  const toggleCheckbox = (index: number) => {
    setCheckboxStates(prev => {
      const newStates = [...prev];
      if (newStates[index]) {
        setSelectionOrder([]);
        return [false, false, false, false];
      }
      const correctOrder = [0, 1, 2, 3];
      const expectedNext = correctOrder[selectionOrder.length];
      if (index !== expectedNext) {
        setSelectionOrder([]);
        return [false, false, false, false];
      }
      newStates[index] = true;
      const newOrder = [...selectionOrder, index];
      setSelectionOrder(newOrder);
      if (newOrder.length === 4) {
        setTimeout(() => {
          setIsThirdModalOpen(false);
          setIsFourthModalOpen(true);
        }, 500);
      }
      return newStates;
    });
  };
  const handleTypewriterComplete = () => {};
  const handleAddressSubmit = () => {
    // This will be handled by the SearchComponent now
  };
  const handleFinalNextClick = () => {
    setIsFourthModalOpen(false);
    setIsFifthModalOpen(true);
    setShowNextButton(false);
  };
  const handleLastCard = (isLast: boolean) => {
    setShowMintButton(isLast);
  };
  const handleMintClick = () => {
  setIsFifthModalOpen(false);
  
  setIsHeroSlideOpen(true);
};

  const handleGetStarted = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsOpen(true);
  };

  return (
    <div className="w-full h-full">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="w-screen h-screen bg-black flex items-center justify-center">
          <SaveButton 
            text={{
              idle: "Get Started",
              saving: "Loading...",
              saved: "Ready!"
            }}
            onSave={handleGetStarted}
            className="text-lg px-8 py-4"
          />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-0" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <div className="relative w-full h-full">
                <DialogTitle className="sr-only">CoinMarketCap Particle Effect</DialogTitle>
                <ParticleTextEffect 
                  words={["Welcome", "to", "CoinMarketCap"]} 
                  onComplete={handleParticleComplete}
                  onNext={handleNextClick}
                />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isSecondModalOpen} onOpenChange={setIsSecondModalOpen}>
            <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-0" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <div className="relative w-full h-full">
                <DialogTitle className="sr-only">CoinMarketCap Second Modal</DialogTitle>
                <ParticleTextEffect 
                  words={["Are you here", "to join", "the airdrop ?"]} 
                  onComplete={handleSecondParticleComplete}
                  onNext={handleYesClick}
                />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isThirdModalOpen} onOpenChange={setIsThirdModalOpen}>
            <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-0" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <div className="relative w-full h-full">
                <DialogTitle className="sr-only">Third Modal</DialogTitle>
                {!showCheckboxes && (
                  <div className="flex flex-col justify-center items-center text-center px-4 w-full h-full">
                    {currentText === 1 && (
                      <MatrixText 
                        text="Proof you are not a bot"
                        onComplete={handleTextComplete}
                        className="text-white text-2xl sm:text-4xl font-semibold leading-relaxed"
                      />
                    )}
                    {currentText === 2 && (
                      <MatrixText 
                        text="Remember"
                        onComplete={handleTextComplete}
                        className="text-white text-2xl sm:text-4xl font-semibold leading-relaxed"
                      />
                    )}
                    {currentText === 3 && (
                      <MatrixText 
                        text="1 Red 2 Blue 3 Yellow 4 Green"
                        onComplete={handleTextComplete}
                        className="text-white text-xl sm:text-3xl font-medium leading-relaxed"
                      />
                    )}
                  </div>
                )}
                {showCheckboxes && (
                  <div className="flex min-h-screen items-center justify-center">
                    <div className="flex flex-col items-center gap-8">
                      <div className="flex gap-8 items-center">
                        {checkboxOrder.map((colorIndex) => {
                          const colors = ["#ef4444", "#3b82f6", "#facc15", "#22c55e"];
                          return (
                            <CheckBox 
                              key={colorIndex}
                              checked={checkboxStates[colorIndex]} 
                              onClick={() => toggleCheckbox(colorIndex)} 
                              size={48} 
                              color={colors[colorIndex]} 
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isFourthModalOpen} onOpenChange={setIsFourthModalOpen}>
            <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-0" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <div className="relative w-full h-full">
                <DialogTitle className="sr-only">Interactive 3D Robot</DialogTitle>
                <div className="relative w-screen h-screen overflow-hidden">
                  <InteractiveRobotSpline
                    scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                    className="absolute inset-0 z-0 pointer-events-none"
                  />
                  <div className="absolute bottom-0 left-0 right-0 w-full h-20 sm:right-0 sm:left-auto sm:w-80 bg-black z-50" />
                  <div className="absolute inset-0 z-10 pt-4 sm:pt-8 md:pt-16 lg:pt-20 px-4 md:px-8 pointer-events-none">
                    <div className="text-center text-gray-300 drop-shadow-lg w-full max-w-xs sm:max-w-2xl mx-auto">
                      <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                        <Typewriter
                          text={[
                            "This is our friend, Coin.",
                            "He'll check what you can get.",
                            "Just enter your ETH address"
                          ]}
                          speed={80}
                          loop={true}
                          delay={2000}
                          onFirstComplete={handleTypewriterComplete}
                          className="text-gray-300 drop-shadow-lg text-sm sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide leading-relaxed font-sans"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`z-[100] pointer-events-auto absolute ${isMobile ? 'bottom-3' : 'bottom-6'} left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 ${isMobile ? 'w-[90vw] max-w-[400px]' : 'w-[400px]'}`}>
                    <SearchComponent
                      value={ethAddress}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEthAddress(e.target.value)}
                      error={errorMessage}
                      onSubmit={(success: boolean, errorMsg?: string) => {
                        if (success) {
                          setErrorMessage('');
                          setIsSubmitted(true);
                        } else {
                          setErrorMessage(errorMsg || 'Please enter a valid ETH address.');
                        }
                      }}
                      showNextButton={showNextButton}
                      onNextClick={handleFinalNextClick}
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isFifthModalOpen} onOpenChange={setIsFifthModalOpen}>
            <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-0" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
              <div className="relative w-full h-full flex items-center justify-center">
                <DialogTitle className="sr-only">Fifth Modal</DialogTitle>
                <div className="w-full h-full">
                  <AnimatedTestimonials 
                    testimonials={[
                      {
                        quote: "Unfortunately, you don't meet the requirements for this exclusive airdrop. But don't worry—there's always a next time.",
                        name: "No Prize This Time",
                        designation: "",
                        textContent: "Not eligible this time."
                      },
                      {
                        quote: "Even if this prize isn't for you, there are other ways to join the community and earn rewards.",
                        name: "Your Adventure Continues", 
                        designation: "",
                        textContent: "More chances ahead."
                      },
                      {
                        quote: "We don't want you to leave empty-handed that's why we created an alternative path for you.",
                        name: "Another Way In",
                        designation: "",
                        textContent: "Try another way."
                      },
                      {
                        quote: "By minting this NFT, you guarantee yourself a spot in the next airdrop event.",
                        name: "Unlock the Next Drop",
                        designation: "",
                        textContent: "Mint to secure spot."
                      },
                      {
                        quote: "Hold this NFT to stay connected and automatically qualify for upcoming airdrops and community perks.",
                        name: "Your VIP Pass", 
                        designation: "",
                        textContent: "NFT = future perks."
                      },
                      {
                        quote: "For just 0.0015 ETH, you secure your spot in future drops and join the next phase of our community.",
                        name: "Affordable Access",
                        designation: "",
                        textContent: "Mint price: 0.0015 ETH."
                      },
                      {
                        quote: "We won't push you. You decide whether to be part of the next chapter with us.",
                        name: "The Choice Is Yours",
                        designation: "",
                        textContent: "No pressure to mint."
                      }
                    ]}
                    onLastCard={handleLastCard}
                    className="text-white"
                    showMintButton={showMintButton}
                    onMintClick={handleMintClick}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isHeroSlideOpen} onOpenChange={setIsHeroSlideOpen}>
  <DialogContent className="max-w-none w-screen h-screen p-0 bg-white dark:bg-black border-0">
    <div className="relative w-full h-full flex items-center justify-center min-h-screen">
      <DialogTitle className="sr-only">Hero Slide</DialogTitle>
      {/* если есть компонент описания: */}
      {/* <DialogDescription className="sr-only">Финальный слайд перед mint</DialogDescription> */}
      <HeroScrollDemo />
      {/* кнопка закрытия, если нужно явное управление */}
      <button
        aria-label="Close"
        onClick={() => setIsHeroSlideOpen(false)}
        className="absolute top-4 right-4 p-2 bg-black/50 rounded"
      >
        ✕
      </button>
    </div>
  </DialogContent>
</Dialog>


        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;