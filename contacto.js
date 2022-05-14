(function() {
    // https://dashboard.emailjs.com/admin/integration
    emailjs.init('85yDB4ccSl6iwgP1v');
})();

enviarMailContacto();

function enviarMailContacto() {
    const formulario = document.getElementById('contact-form');
    formulario.addEventListener('submit', e => {
        e.preventDefault();

        console.log(e);

        // these IDs from the previous steps
        emailjs.sendForm('servicio_contacto', 'contact_form', formulario)
            .then( () => {
                Swal.fire({
                    title: "Listo!",
                    icon: "success",
                    text: "Enviado correctamente. A la brevedad nos estaremos comunicando",
                    timer: 4000
                })
            }, error => {
                console.log('FAILED...', error);
            });   

    })
}