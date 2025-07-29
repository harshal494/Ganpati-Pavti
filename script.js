// Marathi month names
const marathiMonths = [
    'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
    'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
  ];
  const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  
  function convertToMarathiDigits(num) {
    return num.toString().split('').map(digit => marathiDigits[parseInt(digit)] ?? digit).join('');
  }
  
  function generateMarathiDate() {
    const today = new Date();
    const day = convertToMarathiDigits(today.getDate());
    const month = marathiMonths[today.getMonth()];
    const year = convertToMarathiDigits(today.getFullYear());
    return `${day}/${month}/${year}`;
  }
  
  function generateReceiptNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  // Auto-resize input fields based on content
  function autoResizeInput(input) {
    const minWidth = input.type === 'tel' ? 95 : 80;
    const maxWidth = input.type === 'tel' ? 140 : 250;
    
    // Create a temporary span to measure text width
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.fontSize = window.getComputedStyle(input).fontSize;
    span.style.fontFamily = window.getComputedStyle(input).fontFamily;
    span.style.fontWeight = window.getComputedStyle(input).fontWeight;
    span.textContent = input.value || input.placeholder;
    
    document.body.appendChild(span);
    const textWidth = span.offsetWidth + 30; // Add padding
    document.body.removeChild(span);
    
    const newWidth = Math.max(minWidth, Math.min(maxWidth, textWidth));
    input.style.width = newWidth + 'px';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentDate').textContent = generateMarathiDate();
    document.getElementById('receiptNo').value = generateReceiptNumber();
  
    const userName = document.getElementById('userName');
    const mobileNo = document.getElementById('mobileNo');
    const amount = document.getElementById('amount');
    const submitBtn = document.getElementById('submitBtn');
    const msgAmount = document.getElementById('amountMarathi');
  
    // Auto-resize inputs on input
    userName.addEventListener('input', function() {
      autoResizeInput(this);
      validate();
    });
  
    mobileNo.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '').substr(0, 10);
      autoResizeInput(this);
      validate();
    });
  
    // Initial resize
    autoResizeInput(userName);
    autoResizeInput(mobileNo);
  
    function updateAmountInMsg() {
      const amt = amount.value;
      msgAmount.textContent = amt ? convertToMarathiDigits(amt) + ' /-' : '____';
    }
  
    amount.addEventListener('input', function() {
      if (this.value < 0) this.value = '';
      updateAmountInMsg();
      validate();
    });
  
    function validate() {
      if (
        userName.value.trim() !== '' &&
        mobileNo.value.length === 10 &&
        amount.value !== '' && parseInt(amount.value) > 0
      ) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    }
  
    submitBtn.addEventListener('click', function() {
      if (submitBtn.disabled) return;
      alert(
        `धन्यवाद ${userName.value}!\nपावती नंबर: ${document.getElementById('receiptNo').value}\nरक्कम: ₹${amount.value}\nतुमची नोंद यशस्वी झाली आहे.`
      );
      // Optionally: location.reload();
    });
  
    updateAmountInMsg();
  });
  