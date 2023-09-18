document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  const responseMessage = document.getElementById('response-message');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    fetch('https://formspree.io/f/mrgwbkpb', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          responseMessage.innerHTML = '<p class="text-success">Thank you for your message! We will get back to you soon.</p>';
          responseMessage.classList.add('success');
          contactForm.reset();
        } else {
          responseMessage.innerHTML = '<p class="text-danger">Oops! Something went wrong. Please try again later.</p>';
          responseMessage.classList.add('error');
        }
      })
      .catch((error) => {
        console.error('Error sending form data:', error);
        responseMessage.innerHTML = '<p class="text-warning">Oops! Something went wrong. Please try again later.</p>';
        responseMessage.classList.add('error');
      });
  });
});
