//variables
const formulario= document.querySelector(".form-container");
const enviar = document.querySelector("#btn-submit");
const email = document.querySelector(".email");
const asunto = document.querySelector(".Asunto")
const texto= document.querySelector(".texto");
const inputs = document.querySelector("inputs");
const borrar = document.querySelector("#borrar");
const spinner = document.querySelector(".spinner") 

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//EVENTOS

eventListeners();
function eventListeners() {
    document.addEventListener("DOMContentLoaded", iniciarApp);
    email.addEventListener("blur", validarFormulario);
    texto.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    formulario.addEventListener("submit", enviarMail);
    borrar.addEventListener("click", resetearFormulario);
    }

// campos de formulario

    function iniciarApp(){
        enviar.disabled = true;
    }

    function validarFormulario(e){

        if(e.target.value.length > 0){
       
           const errorr = document.querySelector("p.mensajeError");

           if(errorr!==null) {
            errorr.remove(); 
            }
           
            e.target.style.borderBottomColor= "green";
            //eliminar los errores del dom.
           

        }else {
            e.target.style.borderBottomColor="red";
            mostrarError("Todos los campos son obligatorios");
        }
        if(e.target.type==="email"){
            

            if(er.test(e.target.value)){
                  
                e.target.style.borderBottomColor= "green"
                  
            }
            else{
                mostrarError("El email no es valido");
                e.target.style.borderBottomColor= "red";
                
            }
        }

        if(er.test(email.value) && asunto.value !== "" && texto.value !== ""){
            enviar.disabled= false;
            enviar.style.background = "green";
           
        } else {
            enviar.disabled =true;
        
        }

    }

    function mostrarError(mensaje){
        const mensajeError = document.createElement("p")
        mensajeError.textContent = mensaje;
        mensajeError.classList.add("mensajeError");

        const errores = document.querySelectorAll(".mensajeError");
        if(errores.length===0){
            formulario.appendChild(mensajeError);
            //o en este caso lo ponemos el mensaje antes del primer h2. formulario.insertBefore(mensajeError, document.querySelector(".para"));
        }
    }

    function enviarMail(e){
        e.preventDefault();
        spinner.style.display= "flex";
        console.log("enviando..");

        //despues de 3 segundos eliminar el spinner y poner un mensaje
        setTimeout(() => {
            spinner.style.display= "none";
            const mensajeEnviado = document.createElement("p")
            mensajeEnviado.textContent = "Mail enviado correctamente!";
            mensajeEnviado.classList.add("enviado");

            formulario.insertBefore(mensajeEnviado, spinner);
        }, 3000);

        setTimeout(() => { 
            const enviado = document.querySelector(".enviado");
            enviado.style.display= "none";
            resetearFormulario();
            enviar.disabled =true;  
            enviar.style.backgroundColor= "white"


        },7000)
        
    }

    function resetearFormulario(){
        formulario.reset();
    }
