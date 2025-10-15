document.getElementById("btnVolver").addEventListener("click", () => {
      window.history.back();
      });
document.querySelector('assets/perrin').addEventListener('click', () => {
  document.getElementById('menu').classList.remove('activa');
  document.getElementById('Usuario').classList.add('activa');
});
