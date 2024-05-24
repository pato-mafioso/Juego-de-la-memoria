document.addEventListener('DOMContentLoaded', function() {

  const timerElement = document.querySelector('.tiempo');

  let timerDuration = 60000;

  function updateTimer() {
      const corazon = document.querySelectorAll('.corazon');

      timerDuration -= 1000;  

      const minutes = Math.floor(timerDuration / 60000);
      const seconds = Math.floor((timerDuration % 60000) / 1000);

      timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  
      if (timerDuration === 0) {
        removeHearts();
          clearInterval(timerInterval);
          mostrarMensajePerdido();
      }  
  }  
  function removeHearts() {
    const corazon = document.querySelectorAll('.corazon');
    corazon.forEach(corazon => {
             corazon.remove();  
    });
}  

function restarTiempo() {
  
  timerDuration -= 5000;

  
  if (timerDuration < 0) {
      timerDuration = 0;
  }

   
  updateTimer();
}



  function mostrarMensajePerdido() {
      const mensajePerdido = document.createElement('div');
      mensajePerdido.textContent = 'Has perdido';
      mensajePerdido.style.position = 'fixed';
      mensajePerdido.style.top = '50%';
      mensajePerdido.style.left = '50%';
      mensajePerdido.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(mensajePerdido);
  }

  const playButton = document.querySelector('button');
  playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
      
      timerDuration = 60000;
      
      updateTimer();
      
      timerInterval = setInterval(updateTimer, 1000);
  });
});
