import React from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/supabaseClient';

interface SearchComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onSubmit: (success: boolean, errorMsg?: string) => void;
  showNextButton: boolean;
  onNextClick: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ 
  value, 
  onChange, 
  error, 
  onSubmit, 
  showNextButton, 
  onNextClick 
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmitWithSupabase = async () => {
    if (value.trim().length < 30) {
      onSubmit(false, 'Please enter a valid ETH address.');
      return;
    }
    
    setIsLoading(true);
    const { error } = await supabase
      .from('eth_addresses')
      .insert({ address: value });
    
    setIsLoading(false);
    
    if (error) {
      console.error('Ошибка при сохранении адреса:', error.message);
      onSubmit(false, 'Failed to save address.');
    } else {
      console.log('Адрес успешно сохранен:', value);
      onSubmit(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div className="absolute z-[-1] w-full h-min-screen bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
      
      {/* Enhanced container with better visual hierarchy */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto">
        {/* Error message with improved styling */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
            <div className="text-sm text-red-400 text-center font-medium flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
              {error}
            </div>
          </div>
        )}
        
        {/* Main input container with enhanced glow effects */}
        <div id="poda" className="relative flex flex-col items-center justify-center group w-full">
          <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[70px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                        before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-120deg] group-focus-within:[&::before]:rotate-[420deg] group-focus-within:[&::before]:duration-4000">
          </div>
          <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:[&::before]:rotate-[442deg] group-focus-within:[&::before]:duration-4000">
          </div>
          <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:[&::before]:rotate-[442deg] group-focus-within:[&::before]:duration-4000">
          </div>
          <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:[&::before]:rotate-[442deg] group-focus-within:[&::before]:duration-4000">
          </div>
          <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[63px] rounded-lg blur-[2px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)] before:brightness-140
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-97deg] group-focus-within:[&::before]:rotate-[443deg] group-focus-within:[&::before]:duration-4000">
          </div>
          <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[59px] rounded-xl blur-[0.5px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                        before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)] before:brightness-130
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-110deg] group-focus-within:[&::before]:rotate-[430deg] group-focus-within:[&::before]:duration-4000">
          </div>
          
          {/* Enhanced input container */}
          <div className="relative group flex flex-col items-center w-full">
            <div className="flex w-full relative">
              {/* Input field with improved styling */}
            <input
              placeholder="Enter ETH Address"
              type="text"
              name="ethAddress"
              value={value}
              onChange={onChange}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-[#010201] to-[#0a0a0a] border-none h-[56px] rounded-l-lg text-white px-4 text-lg focus:outline-none placeholder-gray-400 truncate transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:shadow-lg focus:shadow-purple-500/20"
            />
            
            {/* Enhanced submit button */}
            <button
              type={showNextButton ? "button" : "submit"}
              onClick={showNextButton ? onNextClick : handleSubmitWithSupabase}
              disabled={isLoading}
              className="bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-700 text-white text-sm px-6 rounded-r-lg transition-all duration-300 h-[56px] min-w-[80px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Loading...</span>
                </>
              ) : showNextButton ? (
                "Next"
              ) : (
                "Submit"
              )}
            </button>
            </div>
            
            {/* Enhanced visual effects */}
            <div id="input-mask" className="pointer-events-none w-[100px] h-[20px] absolute bg-gradient-to-r from-transparent via-black/50 to-black top-[18px] left-[70px] group-focus-within:hidden transition-opacity duration-300"></div>
            <div id="pink-mask" className="pointer-events-none w-[30px] h-[20px] absolute bg-[#cf30aa] top-[10px] left-[5px] blur-2xl opacity-80 transition-all duration-2000 group-hover:opacity-0 group-focus-within:opacity-60"></div>
            
            {/* Loading indicator overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;