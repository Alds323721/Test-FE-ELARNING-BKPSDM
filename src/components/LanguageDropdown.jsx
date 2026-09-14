import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[#1D315F] hover:text-[#006A63] text-xs font-semibold px-2 py-1 rounded-md hover:bg-gray-100/70 transition-colors focus:outline-none cursor-pointer"
        title="Pilih Bahasa / Select Language"
      >
        <span>{language === 'EN' ? 'EN' : 'ID'}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 z-50 animate-fadeIn">
          <button
            type="button"
            onClick={() => {
              setLanguage('ID');
              setIsOpen(false);
            }}
            className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              language === 'ID'
                ? 'text-[#006A63] bg-[#EFF5F3]'
                : 'text-[#1D315F] hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm">🇮🇩</span>
              <span>Indonesia</span>
            </span>
            {language === 'ID' && <Check className="w-3.5 h-3.5 text-[#006A63]" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setLanguage('EN');
              setIsOpen(false);
            }}
            className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              language === 'EN'
                ? 'text-[#006A63] bg-[#EFF5F3]'
                : 'text-[#1D315F] hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm">🇬🇧</span>
              <span>English</span>
            </span>
            {language === 'EN' && <Check className="w-3.5 h-3.5 text-[#006A63]" />}
          </button>
        </div>
      )}
    </div>
  );
}
