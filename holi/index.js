const emailInput = document.querySelector('#email-input');
const phoneInput = document.querySelector('#phone-input');
const formBtn = document.querySelector('#form-btn')
const form = document.querySelector('#form')
//regex

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_REGEX = /^[0](412|414|416|426|424|212)[0-9]{7}$/
//validacion

let emailValidation = false;
let phoneValidation = false;

//function

const validateInput = (input, regexValidation) =>{
    const infoText = input.parentElement.children[1]; // para seleccionar elemento hijo en especifico
    formBtn.disabled = emailValidation && phoneValidation? false : true;

    if (input.value === '') {
        input.classList.remove('correct')
        input.classList.remove('wrong')
        infoText.classList.remove('show')
    }
    else if (regexValidation) {
        input.classList.add('correct')
        input.classList.remove('wrong')
        infoText.classList.remove('show')
    }else{
        input.classList.remove('correct')
        input.classList.add('wrong')
        infoText.classList.add('show')
    }
};

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_REGEX.test(emailInput.value);
    validateInput(emailInput, emailValidation)
});

phoneInput.addEventListener('input', e => {
    phoneValidation = PHONE_REGEX.test(phoneInput.value);
    validateInput(phoneInput, phoneValidation)
});

form.addEventListener('submit', e => {
    e.preventDefault();
    //crear elemento de la lista
    const li = document.createElement('li');
    //creo contenido del li dependiendo de lo que escribio el usuario en los inputs
    li.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="deleteicon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
        <p>${emailInput.value}</p>
        <input type = "text" value = "${phoneInput.value}" readonly>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="editicon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
        `;
    //agrego el elemento a la lista
    list.append(li);
    //limpio los inputs
    emailInput.value='';
    phoneInput.value='';

    validateInput(emailInput);
    validateInput (phoneInput);
    emailValidation=false;
    phoneValidation=false;
    formBtn.disabled = true;
    //guardar en locarStorage (navegador)
    localStorage.setItem('listaContactos', list.innerHTML);

});

list.addEventListener('click', e => {
    if (e.target.closest('.deleteicon')) {
    e.target.closest('.deleteicon').parentElement.remove();
    localStorage.setItem('listaContactos', list.innerHTML);
    }
    
if (e.target.closest('.editicon')) {
    // selecciona el icono de editar
    const editicon = e.target.closest('.editicon');
    // selecciona el input
    const editInput = editicon.parentElement.children[2];
    // define mi condicional usando una clasee llamada editando para saber el estado del boton
    if (editicon.classList.contains('editando')) {
        // cuando edita
        // remueve la clase de editando para indicar que esta guardando los cambios
        editicon.classList.remove('editando');
        // guardo el numero de valor del input
        editInput.setAttribute('value',editInput.value)
        // remuevo clase editando para poder escribir en el input
        editInput.setAttribute('readonly','true')
        editInput.classList.add('editing')
        const end = editInput.value.length;
        editInput.setSelectionRange(end, end);
        editInput.focus()
        // coloca el icono de editar
        editicon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="editicon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        `;
        // guardo en local storage
        localStorage.setItem('listaContactos', list.innerHTML);
    } 
    
    else {
        // nueva clase editando para el boton
        editicon.classList.add('editando')
        // remuevo el atributo readonly para poder escribir en el input
        editInput.removeAttribute('readonly');
        //  cambio el icono para indicarle al usuario q esta editando
        editicon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="editicon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
        `;
        }
}

});

(()=>{
    const localList = localStorage.getItem('listaContactos');
    list.innerHTML = localList
})()