// Array para almacenar respuestas del usuario
let respuestas = [];

// Validar edad (18-50 años)
function validarEdad(edad) {
    return !isNaN(edad) && edad >= 18 && edad <= 50;
}

// Validar respuestas de Sí/No
function validarSiNo(respuesta) {
    let resp = respuesta.trim().toLowerCase();
    return resp === "si" || resp === "no";
}

// Mostrar alerta personalizada
function mostrarAlerta(mensaje) {
    alert(mensaje);
}

// Función para validar el correo electrónico
function validarEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
}

// Función para validar el teléfono
function validarTelefono(telefono) {
    const regexTelefono = /^\d{10}$/;
    return regexTelefono.test(telefono);
}

// Función para obtener la entrada válida
function obtenerEntradaValida(mensaje, validacion) {
    let respuesta;
    do {
        respuesta = prompt(mensaje);
        if (respuesta === null) {
            mostrarAlerta("Gracias por participar. ¡Nos vemos!");
            return null;
        }
        if (!validacion(respuesta)) {
            mostrarAlerta("Por favor, ingresa una respuesta válida.");
        }
    } while (!validacion(respuesta));

    console.log(`Pregunta: ${mensaje} | Respuesta: ${respuesta}`); // Registro en consola
    return respuesta;
}

// Simulación de entrevista
function iniciarSimulador() {
    if (!confirm("¡Bienvenido! ¿Deseas comenzar la entrevista?")) {
        mostrarAlerta("Gracias, ¡nos vemos pronto!");
        return;
    }

    const preguntas = [
        { mensaje: "¿Cuál es tu nombre completo?", validacion: input => /^[a-zA-Z\s]{4,}$/.test(input) },
        { mensaje: "¿Cuál es tu apellido?", validacion: input => /^[a-zA-Z\s]{4,}$/.test(input) },
        { mensaje: "¿Cuántos años tienes?", validacion: validarEdad },
        { mensaje: "¿Cuántos años de experiencia tienes en tu área profesional?", validacion: input => !isNaN(input) && input >= 0 },
        { mensaje: "¿Cuáles son tus principales habilidades?", validacion: input => input.length > 0 },
        { mensaje: "¿Por qué te interesa trabajar con nosotros?", validacion: input => input.length > 0 },
        { mensaje: "¿Consideras que trabajas bien en equipo? (Si/No)", validacion: validarSiNo },
        { mensaje: "¿Estás disponible para comenzar de inmediato? (Si/No)", validacion: validarSiNo },
        { mensaje: "¿Tienes un email? (Debe tener el formato correcto: ej. ejemplo@dominio.com)", validacion: validarEmail },
        { mensaje: "¿Cuál es tu número de teléfono? (Debe tener 10 dígitos sin letras)", validacion: validarTelefono },
        { mensaje: "¿Dónde vives? (Dirección)", validacion: input => input.length > 0 },
        { mensaje: "¿Tienes hijos?", validacion: input => /^(si|no)$/i.test(input) },
        { mensaje: "¿Con quiénes vives?", validacion: input => input.length > 0 },
        { mensaje: "¿Quieres contarnos algo más?", validacion: () => true },
        { mensaje: "¿Qué disponibilidad tienes? (Full time/Part time)", validacion: input => /^(full time|part time)$/i.test(input) },
        { mensaje: "¿Estarías dispuesto a trabajar en horarios rotativos si es necesario? (Si/No)", validacion: validarSiNo }
    ];

    // Obtener respuestas válidas
    for (let i = 0; i < preguntas.length; i++) {
        let respuesta = obtenerEntradaValida(preguntas[i].mensaje, preguntas[i].validacion);
        if (respuesta === null) return;
        respuestas.push({ pregunta: preguntas[i].mensaje, respuesta });
    }

    mostrarResultados();
}

// Mostrar resultados al usuario
function mostrarResultados() {
    const tarjetaResultado = document.getElementById("tarjetaResultado");

    // Obtener respuestas específicas
    const nombre = respuestas.find(r => r.pregunta.includes("nombre completo")).respuesta;
    const apellido = respuestas.find(r => r.pregunta.includes("apellido")).respuesta;
    const experiencia = respuestas.find(r => r.pregunta.includes("experiencia tienes")).respuesta;
    const habilidades = respuestas.find(r => r.pregunta.includes("habilidades")).respuesta;
    const trabajoEnEquipo = respuestas.find(r => r.pregunta.includes("trabajas bien en equipo")).respuesta;
    const disponibilidad = respuestas.find(r => r.pregunta.includes("disponible para comenzar")).respuesta;
    const email = respuestas.find(r => r.pregunta.includes("email")).respuesta;
    const telefono = respuestas.find(r => r.pregunta.includes("teléfono")).respuesta;
    const direccion = respuestas.find(r => r.pregunta.includes("vives")).respuesta;
    const hijos = respuestas.find(r => r.pregunta.includes("hijos")).respuesta;
    const conQuienVives = respuestas.find(r => r.pregunta.includes("vives")).respuesta;
    const comentarioExtra = respuestas.find(r => r.pregunta.includes("contarnos algo más")).respuesta;
    const disponibilidadTrabajo = respuestas.find(r => r.pregunta.includes("disponibilidad tienes")).respuesta;
    const horariosRotativos = respuestas.find(r => r.pregunta.includes("trabajar en horarios rotativos")).respuesta;

    // Construir tarjeta de resultados formateada
    let tarjetaHTML = `
        <h2>Resumen Formal de la Entrevista</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Años de experiencia:</strong> ${experiencia}</p>
        <p><strong>Principales habilidades:</strong> ${habilidades}</p>
        <p><strong>Trabajo en equipo:</strong> ${trabajoEnEquipo === 'si' ? 'Sí, considero que trabajo bien en equipo.' : 'No, prefiero trabajar de manera individual.'}</p>
        <p><strong>Disponibilidad inmediata:</strong> ${disponibilidad === 'si' ? 'Sí, estoy disponible para comenzar de inmediato.' : 'No, necesitaría más tiempo para comenzar.'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>¿Tiene hijos?:</strong> ${hijos === 'si' ? 'Sí' : 'No'}</p>
        <p><strong>Con quién vive:</strong> ${conQuienVives}</p>
        <p><strong>Disponibilidad de trabajo:</strong> ${disponibilidadTrabajo === 'full time' ? 'Full time' : 'Part time'}</p>
        <p><strong>¿Estaría dispuesto a trabajar en horarios rotativos?:</strong> ${horariosRotativos === 'si' ? 'Sí' : 'No'}</p>
    `;

    // Agregar comentario adicional si existe
    if (comentarioExtra.trim() !== "") {
        tarjetaHTML += `<p><strong>Comentario adicional:</strong> ${comentarioExtra}</p>`;
    }

    // Mensaje final
    tarjetaHTML += `
        <p><strong>En breve nos estaremos comunicando con usted.</strong></p>
        <button onclick="cerrarEntrevista()">Cerrar Entrevista</button>
    `;

    tarjetaResultado.innerHTML = tarjetaHTML;

    console.log("Resumen de respuestas:", respuestas); // Registro en consola
}

// Función para cerrar la entrevista
function cerrarEntrevista() {
    const tarjetaResultado = document.getElementById("tarjetaResultado");
    tarjetaResultado.innerHTML = "<p>La entrevista ha sido cerrada. Gracias por participar. Creemos que su perfil puede adaptarse a lo que buscamos.</p>";
}
