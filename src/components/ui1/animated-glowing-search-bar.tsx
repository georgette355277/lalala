import React from 'react';
import { supabase } from '@/supabaseClient';

interface SearchComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onSubmit: (success: boolean, errorMsg?: string) => void; // Обновленный тип для обратной связи
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
  const handleSubmitWithSupabase = async () => {
    if (value.trim().length < 30) {
      onSubmit(false, 'Please enter a valid ETH address.');
      return;
    }
    const { error } = await supabase
      .from('eth_addresses')
      .insert({ address: value });
    if (error) {
      console.error('Ошибка при сохранении адреса:', error.message);
      onSubmit(false, 'Failed to save address.');
    } else {
      console.log('Адрес успешно сохранен:', value);
      onSubmit(true); // Успешная отправка
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute z-[-1] w-full h-min-screen"></div>
      <div id="poda" className="relative flex flex-col items-center justify-center group">
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[70px] max-w-[400px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                        before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-120deg] group-focus-within:[&::before]:rotate-[420deg] group-focus-within:[&::before]:duration-4000">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] max-w-[398px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:[&::before]:rotate-[442deg] group-focus-within:[&::before]:duration-4000">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] max-w-[398px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:[&::before]:rotate-[442deg] group-focus-within:[&::before]:duration-4000">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] max-w-[398px] rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:[&::before]:rotate-[442deg] group-focus-within:[&::before]:duration-4000">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[63px] max-w-[393px] rounded-lg blur-[2px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)] before:brightness-140
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-97deg] group-focus-within:[&::before]:rotate-[443deg] group-focus-within:[&::before]:duration-4000">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[59px] max-w-[389px] rounded-xl blur-[0.5px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                        before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)] before:brightness-130
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-110deg] group-focus-within:[&::before]:rotate-[430deg] group-focus-within:[&::before]:duration-4000">
        </div>
        <div className="relative group flex flex-col items-center">
          {error && (
            <div className="absolute top-[-35px] text-sm text-red-500 animate-pulse text-center font-medium w-[380px]">
              {error}
            </div>
          )}
          <div className="flex w-full">
            <input
              placeholder="Enter ETH Address"
              type="text"
              name="ethAddress"
              value={value}
              onChange={onChange}
              className="flex-1 bg-[#010201] border-none h-[56px] rounded-l-lg text-white px-4 text-lg focus:outline-none placeholder-gray-400 truncate"
            />
            <button
              type={showNextButton ? "button" : "submit"}
              onClick={showNextButton ? onNextClick : handleSubmitWithSupabase}
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm px-4 rounded-r-lg transition-all opacity-60 hover:opacity-100 h-[56px]"
            >
              {showNextButton ? "Next" : "Submit"}
            </button>
          </div>
          <div id="input-mask" className="pointer-events-none w-[100px] h-[20px] absolute bg-gradient-to-r from-transparent to-black top-[18px] left-[70px] group-focus-within:hidden"></div>
          <div id="pink-mask" className="pointer-events-none w-[30px] h-[20px] absolute bg-[#cf30aa] top-[10px] left-[5px] blur-2xl opacity-80 transition-all duration-2000 group-hover:opacity-0"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;