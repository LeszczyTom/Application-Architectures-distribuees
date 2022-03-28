const setButton = document.getElementById('Ajouter')
setButton.addEventListener('click', () => {
    let data = {
        titre: document.getElementById("Titre").value,
        artiste: document.getElementById("Artiste").value,
        album: document.getElementById("Album").value,
    }
    window.electronAPI.sendForm(data)
});

const closeButton = document.getElementById('closeButton')
closeButton.addEventListener('click', () => { window.electronAPI.closeWin("t") });
