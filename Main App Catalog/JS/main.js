const card = document.querySelectorAll('.memory-card');

//Card flipping
function cardFlip() {
    this.classList.toggle('flip');
}

card.forEach(card => card.addEventListener('click', cardFlip));