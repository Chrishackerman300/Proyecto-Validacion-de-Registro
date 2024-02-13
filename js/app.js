//Variables
const inputNombre = document.querySelector('#name')
const inputApellido = document.querySelector('#apellido')
const inputEmail = document.querySelector('#email')
const inputPassword = document.querySelector('#password')
const icon = document.querySelector('.bi-eye-fill')
const formulario = document.querySelector('#formulario')
const btnSubmit = document.querySelector('#btn-submit')
const spinner = document.querySelector('.spinner-container')
const btnReset = document.querySelector('#btn-reset')

//Expresiones Regulares
const regexNombre = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$"
const regexApellido = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$"
const regexPassword = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

//Objeto
const datosRegistro = {
    name: '',
    apellido: '',
    email: '',
    password: ''
}

//Events Listeners
cargarEventos()

function cargarEventos(){
    inputNombre.addEventListener('blur', validar)
    inputApellido.addEventListener('blur', validar)
    inputEmail.addEventListener('blur', validar)
    inputPassword.addEventListener('blur', validar)
    icon.addEventListener('click', showPassword)
    formulario.addEventListener('submit', enviarEmail)
    btnReset.addEventListener('click', e => {
        e.preventDefault()

        datosRegistro.name = ''
        datosRegistro.apellido = ''
        datosRegistro.email = ''
        datosRegistro.password = ''

        formulario.reset()

        comprobarEmail()
    })
}


//Funciones
function validar(e){
    const valor = e.target
    const elemento = e.target

    //Si el valor de nuestra variable valor esta vacio ejecutara el if
    if(valor.value.trim() === ''){
        showAlert(`El campo ${valor.id} esta vacio`, elemento.parentElement.parentElement)

        datosRegistro[valor.name] = ''
        comprobarEmail()
        return
    }

    //Validar Nombre
    if(valor.id === 'name'){
        if(valor.value.match(regexNombre) !== null){
            showAlert(`El nombre es valido`, elemento.parentElement.parentElement)

            setTimeout(() => {
                limpiar(elemento.parentElement.parentElement)
            }, 1400);

            datosRegistro[valor.name] = valor.value.trim().toLowerCase()
            comprobarEmail()
            return
        }
        else{
            showAlert(`El nombre es invalido`, elemento.parentElement.parentElement)
            return
        }
    }

    //Validar Apellido
    if(valor.id === 'apellido'){
        if(valor.value.match(regexApellido) !== null){
            showAlert(`El apellido es valido`, elemento.parentElement.parentElement)

            setTimeout(() => {
                limpiar(elemento.parentElement.parentElement)
            }, 1400);

            datosRegistro[valor.name] = valor.value.trim().toLowerCase()
            return
        }
        else{
            showAlert(`El apellido es invalido`, elemento.parentElement.parentElement)
            comprobarEmail()
            return
        }
    }

    //Validar Email
    if(valor.id === 'email'){
        const resultado = regexEmail.test(valor.value)

        if(resultado === true){
            showAlert(`El email es valido`, elemento.parentElement.parentElement)

            setTimeout(() => {
                limpiar(elemento.parentElement.parentElement)
            }, 1400);

            datosRegistro[valor.name] = valor.value.trim().toLowerCase()
            comprobarEmail()
            return
        }
        else{
            showAlert(`El email es invalido`, elemento.parentElement.parentElement)
            comprobarEmail()
            return
        }
    }

    //Validar Password
    if(valor.id === 'password'){
        if(valor.value.match(regexPassword) !== null){
            showAlert(`Password Fuerte`, elemento.parentElement.parentElement)

            setTimeout(() => {
                limpiar(elemento.parentElement.parentElement)

                datosRegistro[valor.name] = valor.value.trim().toLowerCase()
                comprobarEmail()
            }, 1400);
            return
        }
        else{
            showAlert(`Password Debil`, elemento.parentElement.parentElement)
            return
        }
    }

    limpiar(elemento.parentElement.parentElement)

    comprobarEmail()
}

function showAlert(mensaje, refe){

    //Eliminar alerta repetida
    limpiar(refe)

    const alert = document.createElement('div')

    alert.classList.add('alerta')
    alert.textContent = mensaje

    refe.appendChild(alert)
}

function limpiar(element){
    const alerta = element.querySelector('.alerta')

    if(alerta){
        alerta.remove()
    }
}

function showPassword(e){
    e.preventDefault()

    if(password.type === 'password'){
        password.type = 'text'
        icon.classList.remove('bi-eye-fill')
        icon.classList.add('bi-eye-slash-fill')
    }
    else{
        password.type = 'password'
        icon.classList.add('bi-eye-fill')
        icon.classList.remove('bi-eye-slash-fill')
    }
}

function comprobarEmail(){
    if(Object.values(datosRegistro).includes('')){
        btnSubmit.classList.remove('opacity')
        btnSubmit.disabled = true
    }
    else{
        btnSubmit.classList.add('opacity')
        btnSubmit.disabled = false
    }
}

function enviarEmail(e){
    e.preventDefault()

    spinner.classList.add('show-spinner')

    setTimeout(() => {
        spinner.classList.remove('show-spinner')

        alert('Registro con exito!!')
    }, 2500);
}