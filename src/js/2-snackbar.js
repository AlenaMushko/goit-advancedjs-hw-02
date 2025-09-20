import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

const handleSubmit = event => {
  event.preventDefault();

  const formData = new FormData(form);
  const delayValue = formData.get('delay');
  const state = formData.get('state');

  if (!delayValue || delayValue.trim() === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a delay value',
      position: 'topRight',
    });
    return;
  }

  const delay = parseInt(delayValue);

  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Delay must be a positive number',
      position: 'topRight',
    });
    return;
  }

  if (!state) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a state (Fulfilled or Rejected)',
      position: 'topRight',
    });
    return;
  }

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
};

form.addEventListener('submit', handleSubmit);
