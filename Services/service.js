// ===== ENQUIRY MODAL JS - POPUP + 10 DIGIT + GMAIL SEND =====
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('enquiryModal');
  const enquiryBtns = document.querySelectorAll('.enquiry-btn');
  const closeBtn = document.querySelector('.enquiry-close');
  const serviceNameInput = document.getElementById('serviceName');
  const modalTitle = document.getElementById('modalServiceTitle');
  const phoneInput = document.getElementById('phone');
  const phoneError = document.getElementById('phoneError');
  const form = document.getElementById('enquiryForm');
  const successWrap = document.getElementById('enqSuccessWrap');
  const submitBtn = document.getElementById('submitBtn');

  // ONLY 10 NUMBERS
  if(phoneInput){
    phoneInput.addEventListener('input', function(){
      this.value = this.value.replace(/[^0-9]/g, '').slice(0,10);
      if(phoneError) phoneError.style.display='none';
    });
    phoneInput.addEventListener('keypress', function(e){
      if(!/[0-9]/.test(e.key)) e.preventDefault();
    });
  }

  // OPEN POPUP
  enquiryBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const service = this.getAttribute('data-service') || 'General Enquiry';
      if(serviceNameInput) serviceNameInput.value = service;
      const subj = document.getElementById('enqSubject');
      if(subj) subj.value = 'New Enquiry: ' + service;
      if(modalTitle) modalTitle.textContent = service + ' - Enquiry Form';
      
      modal.style.display = 'flex';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      if(form) form.style.display='block';
      if(successWrap) successWrap.style.display='none';
      if(form) form.reset();
      if(serviceNameInput) serviceNameInput.value = service;
      if(subj) subj.value = 'New Enquiry: ' + service;
    });
  });

  // CLOSE FUNCTION
  function closeEnquiry(){
    modal.style.display='none';
    modal.classList.remove('active');
    document.body.style.overflow='auto';
  }
  window.closeEnquiry = closeEnquiry;

  if(closeBtn) closeBtn.addEventListener('click', closeEnquiry);
  
  window.addEventListener('click', function(e){
    if(e.target === modal) closeEnquiry();
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.classList.contains('active')) closeEnquiry();
  });

  // SUBMIT TO GMAIL VIA WEB3FORMS
  if(form){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      
      // 10 digit validation
      if(phoneInput && !/^[0-9]{10}$/.test(phoneInput.value)){
        if(phoneError) phoneError.style.display='block';
        phoneInput.focus();
        return;
      }
      if(phoneError) phoneError.style.display='none';

      submitBtn.innerText='Sending...';
      submitBtn.disabled=true;

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData));

      try{
        const res = await fetch('https://api.web3forms.com/submit',{
          method:'POST',
          headers:{'Content-Type':'application/json','Accept':'application/json'},
          body: json
        });
        const result = await res.json();
        if(result.success){
          form.style.display='none';
          successWrap.style.display='block';
          const successProduct = document.getElementById('successProduct');
          if(successProduct) successProduct.innerText = serviceNameInput.value;
        }else{
          alert('Failed: '+result.message);
        }
      }catch(err){
        alert('Network error, please try again');
      }finally{
        submitBtn.innerText='Submit Enquiry';
        submitBtn.disabled=false;
      }
    });
  }
});