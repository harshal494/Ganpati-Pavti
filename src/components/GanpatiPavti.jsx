import React, { useState, useEffect } from 'react';
import './GanpatiPavti.css';

const GanpatiPavti = () => {
  const [userName, setUserName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [amount, setAmount] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // Marathi month names
  const marathiMonths = [
    'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
    'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
  ];

  // Marathi digits
  const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  // Convert English digits to Marathi
  const convertToMarathiDigits = (num) => {
    return num.toString().split('').map(digit => marathiDigits[parseInt(digit)] ?? digit).join('');
  };

  // Generate current date in Marathi
  const generateMarathiDate = () => {
    const today = new Date();
    const day = convertToMarathiDigits(today.getDate());
    const month = marathiMonths[today.getMonth()];
    const year = convertToMarathiDigits(today.getFullYear());
    return `${day}/${month}/${year}`;
  };

  // Generate unique 5-character alphanumeric receipt number
  const generateReceiptNumber = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Auto-resize input fields based on content
  const autoResizeInput = (input, type = 'text') => {
    const minWidth = type === 'tel' ? 95 : 80;
    const maxWidth = type === 'tel' ? 140 : 250;
    
    // Create a temporary span to measure text width
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.fontSize = '1rem';
    span.style.fontFamily = 'Noto Sans Devanagari, Arial, sans-serif';
    span.style.fontWeight = '500';
    span.textContent = input.value || input.placeholder;
    
    document.body.appendChild(span);
    const textWidth = span.offsetWidth + 30; // Add padding
    document.body.removeChild(span);
    
    const newWidth = Math.max(minWidth, Math.min(maxWidth, textWidth));
    input.style.width = newWidth + 'px';
  };

  // Handle name input change
  const handleNameChange = (e) => {
    setUserName(e.target.value);
    autoResizeInput(e.target, 'text');
  };

  // Handle mobile number input change
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').substr(0, 10);
    setMobileNo(value);
    autoResizeInput(e.target, 'tel');
  };

  // Handle amount input change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setAmount('');
    } else {
      setAmount(value);
    }
  };

  // Validate form
  const validateForm = () => {
    const isNameFilled = userName.trim() !== '';
    const isMobileFilled = mobileNo.length === 10;
    const isAmountFilled = amount !== '' && parseInt(amount) > 0;
    
    setSubmitDisabled(!(isNameFilled && isMobileFilled && isAmountFilled));
  };

  // Handle submit
  const handleSubmit = () => {
    if (!submitDisabled) {
      alert(
        `धन्यवाद ${userName}!\nपावती नंबर: ${receiptNo}\nरक्कम: ₹${amount}\nतुमची नोंद यशस्वी झाली आहे.`
      );
      // Optionally: Reset form or handle data submission
    }
  };

  // Get amount in Marathi for display
  const getAmountInMarathi = () => {
    return amount ? convertToMarathiDigits(amount) + ' /-' : '____';
  };

  // Initialize component
  useEffect(() => {
    setCurrentDate(generateMarathiDate());
    setReceiptNo(generateReceiptNumber());
  }, []);

  // Validate form when inputs change
  useEffect(() => {
    validateForm();
  }, [userName, mobileNo, amount]);

  // Auto-resize inputs after render
  useEffect(() => {
    const nameInput = document.getElementById('userName');
    const mobileInput = document.getElementById('mobileNo');
    if (nameInput) autoResizeInput(nameInput, 'text');
    if (mobileInput) autoResizeInput(mobileInput, 'tel');
  });

  return (
    <div className="container">
      {/* Top Section: Image */}
      <div className="photo-hero">
        <img src="/1.webp" alt="Ganpati" />
      </div>

      {/* Section 1: Year Title with Flowers */}
      <div className="title-section">
        <span className="flower">🌺</span>
        <h1>गणेशोत्सव २०२५</h1>
        <span className="flower">🌺</span>
      </div>

      {/* Section 2: Pavti Details and Dynamic Message */}
      <div className="details-section">
        <div className="top-row">
          <div className="pavti-left">
            <label>पावती नं.<br />
              <input id="receiptNo" type="text" value={receiptNo} readOnly />
            </label>
          </div>
          <div className="date-right">
            <label>दिनांक<br />
              <span>{currentDate}</span>
            </label>
          </div>
        </div>
        <div className="msg-section">
          <div className="input-group">
            <span className="msg-text">श्री / श्रीमती :-</span>
            <input 
              type="text" 
              id="userName" 
              placeholder="नाव" 
              maxLength="50" 
              value={userName}
              onChange={handleNameChange}
              required 
            />
            <span className="msg-text">मोबाइल नं. :-</span>
            <input 
              type="tel" 
              id="mobileNo" 
              placeholder="मोबाइल" 
              maxLength="10" 
              value={mobileNo}
              onChange={handleMobileChange}
              required 
            />
            <span className="msg-text">यांनी आपल्या मंडळाला</span>
            <span className="inline-amt">{getAmountInMarathi()}</span>
            <span className="msg-text">रक्कमचे सहकार्य केल्याबद्दल धन्यवाद.</span>
          </div>
        </div>
      </div>

      {/* Section 3: Amount and Submit */}
      <div className="amount-section">
        <label className="rupee-label">₹</label>
        <input 
          type="number" 
          id="amount" 
          placeholder="रक्कम टाका" 
          min="1" 
          value={amount}
          onChange={handleAmountChange}
          required 
        />
      </div>
      <div className="submit-section">
        <button 
          id="submitBtn" 
          disabled={submitDisabled}
          onClick={handleSubmit}
        >
          सबमिट
        </button>
      </div>
      <div className="dhanyawaad">
        <div className="dhanyawaad-wrapper">
          <h2 className="dhanyawaad-text">धन्यवाद!</h2>
          <div className="sparkles">
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanpatiPavti;
