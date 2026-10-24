
function openEnquiry(productName) {
    document.getElementById('enqProductInput').value = productName;
    document.getElementById('enqProductTitle').innerText =
        'Enquiry for ' + productName;

    document.getElementById('enqFormWrap').style.display = 'block';
    document.getElementById('enqSuccessWrap').style.display = 'none';
    document.getElementById('enquiryModal').classList.add('active');
    document.getElementById('phoneError').style.display = 'none';
    document.body.style.overflow = 'hidden';
}

function closeEnquiry() {
    document.getElementById('enquiryModal').classList.remove('active');
    document.body.style.overflow = '';
}

async function submitEnquiry(e) {
    e.preventDefault();

    const form = document.getElementById('enquiryForm');
    const phone = document.getElementById('enqPhone').value;
    const phoneError = document.getElementById('phoneError');
    const submitButton = form.querySelector('button[type="submit"]');

    if (!/^[0-9]{10}$/.test(phone)) {
        phoneError.style.display = 'block';
        return;
    }

    phoneError.style.display = 'none';
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        const response = await fetch(
            'https://api.web3forms.com/submit',
            {
                method: 'POST',
                body: new FormData(form)
            }
        );

        const result = await response.json();

        if (response.ok && result.success) {
            document.getElementById('successProduct').innerText =
                document.getElementById('enqProductInput').value;

            document.getElementById('enqFormWrap').style.display = 'none';
            document.getElementById('enqSuccessWrap').style.display = 'block';

            form.reset();
            setTimeout(closeEnquiry, 2500);
        } else {
            alert(result.message || 'Unable to send enquiry. Please try again.');
        }
    } catch (error) {
        alert('Network error. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    }
}

document.getElementById('enquiryModal').addEventListener('click', function(ev) {
    if (ev.target.id === 'enquiryModal') {
        closeEnquiry();
    }
});



