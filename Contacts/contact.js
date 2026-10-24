
document.getElementById('contactForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('sendBtn');
  const status = document.getElementById('formStatus');
  const phone = form.querySelector('input[name="Phone"]').value;
  if(phone.length !== 10){
    status.style.display='block';
    status.style.color='red';
    status.textContent='Phone must be exactly 10 digits';
    return;
  }
  btn.textContent='Sending...';
  btn.disabled=true;
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  // SEND VIA WEB3FORMS USING ACCESS KEY -> goes to pmps.proj@gmail.com
  try{
    const res = await fetch('https://api.web3forms.com/submit', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Accept':'application/json' },
      body: JSON.stringify(object)
    });
    const data = await res.json();
    if(data.success){
      status.style.display='block';
      status.style.color='#0a8a00';
      status.textContent='✓ Successfully Submitted! ';
      form.reset();
      btn.textContent='Sent ✓';
      setTimeout(()=>{ btn.textContent='Send'; btn.disabled=false; status.style.display='none'; }, 4000);
    }
  } catch(err){
    status.style.display='block';
    status.style.color='red';
    status.textContent='Failed to send';
    btn.textContent='Send';
    btn.disabled=false;
  }
});