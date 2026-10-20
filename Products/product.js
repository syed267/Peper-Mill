function openEnquiry(productName){
  document.getElementById('enqProductInput').value = productName;
  document.getElementById('enqProductTitle').innerText = 'Enquiry for ' + productName;
  document.getElementById('enqFormWrap').style.display = 'block';
  document.getElementById('enqSuccessWrap').style.display = 'none';
  document.getElementById('enquiryModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeEnquiry(){
  document.getElementById('enquiryModal').classList.remove('active');
  document.body.style.overflow = '';
}
function submitEnquiry(e){
  e.preventDefault();
  const phone = document.getElementById('enqPhone').value;
  if(!/^[0-9]{10}$/.test(phone)){
    document.getElementById('phoneError').style.display = 'block';
    return;
  }
  document.getElementById('enqFormWrap').style.display = 'none';
  document.getElementById('successProduct').innerText = document.getElementById('enqProductInput').value;
  document.getElementById('enqSuccessWrap').style.display = 'block';
  document.getElementById('enquiryForm').reset();
  setTimeout(closeEnquiry, 2500);
}
// close on outside click
document.getElementById('enquiryModal').addEventListener('click', function(ev){
  if(ev.target.id === 'enquiryModal') closeEnquiry();
});
