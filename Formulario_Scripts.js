document.addEventListener('DOMContentLoaded', function () {
    const calcularBtn = document.getElementById('calcular-btn');
    const successMessage = document.getElementById('success-message');
    const resultadoDiv = document.getElementById('resultado');

    // Inicializar las puntuaciones para cada categoría
    const categorias = {
        ingenieriaSoftware: 0,
        ingenieriaSistemas: 0,
        analisisDatos: 0,
        desarrolladorVideojuegos: 0,
        ciberseguridad: 0,
        inteligenciaArtificial: 0
    };

    // Descripciones de las carreras
    const descripciones = {
        ingenieriaSoftware: "La Ingeniería de Software se enfoca en el desarrollo de aplicaciones, sistemas y soluciones tecnológicas para resolver problemas específicos. Involucra habilidades en programación, diseño de software y pruebas de calidad.",
        ingenieriaSistemas: "La Ingeniería de Sistemas se centra en la integración y el diseño de sistemas informáticos, tanto en hardware como en software. Es ideal para aquellos interesados en optimizar procesos y gestionar infraestructuras tecnológicas.",
        analisisDatos: "El Análisis de Datos se trata de recolectar, procesar e interpretar grandes volúmenes de datos para tomar decisiones informadas. Es perfecto para quienes disfrutan trabajar con datos y encontrar patrones que mejoren procesos.",
        desarrolladorVideojuegos: "El Desarrollo de Videojuegos se enfoca en crear videojuegos, desde la programación hasta el diseño gráfico y la experiencia del usuario. Ideal para quienes tienen pasión por los videojuegos y la creatividad.",
        ciberseguridad: "La Ciberseguridad se dedica a proteger sistemas, redes y datos de ataques y amenazas. Es una carrera crucial para garantizar la privacidad y seguridad de la información en un mundo cada vez más digital.",
        inteligenciaArtificial: "La Inteligencia Artificial estudia cómo las máquinas pueden realizar tareas que normalmente requieren inteligencia humana, como el aprendizaje y la toma de decisiones. Es ideal para aquellos que desean trabajar en tecnologías emergentes y vanguardistas."
    };

    // Mapeo de preguntas a categorías
    const preguntas = [
        { id: 'q1', categorias: ['ingenieriaSoftware', 'ingenieriaSistemas'] },
        { id: 'q2', categorias: ['analisisDatos'] },
        { id: 'q3', categorias: ['desarrolladorVideojuegos'] },
        { id: 'q4', categorias: ['inteligenciaArtificial'] },
        { id: 'q5', categorias: ['ingenieriaSoftware', 'ingenieriaSistemas'] },
        { id: 'q6', categorias: ['ciberseguridad'] },
        { id: 'q7', categorias: ['analisisDatos'] },
        { id: 'q8', categorias: ['inteligenciaArtificial'] },
        { id: 'q9', categorias: ['ingenieriaSistemas'] },
        { id: 'q10', categorias: ['desarrolladorVideojuegos'] }
    ];

    function calcularPuntuacion() {
        // Validar si todas las preguntas tienen una respuesta seleccionada
        let faltanRespuestas = false;
    
        preguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta.id}"]:checked`);
            if (!respuesta) {
                faltanRespuestas = true;
            }
        });
    
        if (faltanRespuestas) {
            resultadoDiv.innerHTML = `
                <p style="color: red;">Por favor, responde todas las preguntas antes de calcular.</p>
            `;
            return; // Detener la ejecución si faltan respuestas
        }
    
        // Reiniciar las puntuaciones
        for (const categoria in categorias) {
            categorias[categoria] = 0;
        }
    
        // Recorrer las preguntas y sumar puntos a las categorías
        preguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta.id}"]:checked`);
            if (respuesta) {
                pregunta.categorias.forEach(categoria => {
                    categorias[categoria] += 1; // Sumar 1 por cada respuesta seleccionada
                });
            }
        });
    

        // Calcular la categoría con la mayor puntuación
        const maxPuntuacion = Math.max(...Object.values(categorias));
        const categoriasMaximas = Object.keys(categorias).filter(categoria => categorias[categoria] === maxPuntuacion);

        // Mostrar el resultado con la recomendación de carrera
        let recomendacion = "";
        let descripcion = "";

        // Lógica para manejar empates
        if (categoriasMaximas.length > 1) {
            // Mostrar opciones para que el usuario seleccione
            recomendacion = `¡Te recomendamos estudiar una de las siguientes carreras!`;
            descripcion = "Por favor, elige la carrera que más te interese:";

            // Crear un HTML con las opciones para que el usuario seleccione
            resultadoDiv.innerHTML = `
                <h3>${recomendacion}</h3>
                <p>${descripcion}</p>
                <select id="carreraSeleccionada">
                    ${categoriasMaximas.map(categoria => {
                        return `<option value="${categoria}">${categoria.replace(/([A-Z])/g, ' $1').trim()}</option>`;
                    }).join('')}
                </select>
                <button onclick="mostrarDescripcion()">Ver descripción de la carrera seleccionada</button>
                <p><strong>Tu puntuación total por categoría es:</strong></p>
                <ul>
                    <li>Ingeniería de Software: ${categorias.ingenieriaSoftware}</li>
                    <li>Ingeniería de Sistemas: ${categorias.ingenieriaSistemas}</li>
                    <li>Análisis de Datos: ${categorias.analisisDatos}</li>
                    <li>Desarrollador de Videojuegos: ${categorias.desarrolladorVideojuegos}</li>
                    <li>Ciberseguridad: ${categorias.ciberseguridad}</li>
                    <li>Inteligencia Artificial: ${categorias.inteligenciaArtificial}</li>
                </ul>
            `;
        } else {
            const categoriaMaxima = categoriasMaximas[0];
            recomendacion = `¡Te recomendamos estudiar ${categoriaMaxima.replace(/([A-Z])/g, ' $1').trim()}!`;
            descripcion = descripciones[categoriaMaxima];

            resultadoDiv.innerHTML = `
                <h3>${recomendacion}</h3>
                <p>${descripcion}</p>
                <p><strong>Tu puntuación total por categoría es:</strong></p>
                <ul>
                    <li>Ingeniería de Software: ${categorias.ingenieriaSoftware}</li>
                    <li>Ingeniería de Sistemas: ${categorias.ingenieriaSistemas}</li>
                    <li>Análisis de Datos: ${categorias.analisisDatos}</li>
                    <li>Desarrollador de Videojuegos: ${categorias.desarrolladorVideojuegos}</li>
                    <li>Ciberseguridad: ${categorias.ciberseguridad}</li>
                    <li>Inteligencia Artificial: ${categorias.inteligenciaArtificial}</li>
                </ul>
            `;
        }
    }

    // Función para mostrar la descripción de la carrera seleccionada
    function mostrarDescripcion() {
        const carreraSeleccionada = document.getElementById('carreraSeleccionada').value;
        const descripcionSeleccionada = descripciones[carreraSeleccionada];
        
        // Mostrar la descripción de la carrera seleccionada
        resultadoDiv.innerHTML = `
            <h3>Has seleccionado estudiar ${carreraSeleccionada.replace(/([A-Z])/g, ' $1').trim()}!</h3>
            <p>${descripcionSeleccionada}</p>
            <p><strong>Tu puntuación total por categoría es:</strong></p>
            <ul>
                <li>Ingeniería de Software: ${categorias.ingenieriaSoftware}</li>
                <li>Ingeniería de Sistemas: ${categorias.ingenieriaSistemas}</li>
                <li>Análisis de Datos: ${categorias.analisisDatos}</li>
                <li>Desarrollador de Videojuegos: ${categorias.desarrolladorVideojuegos}</li>
                <li>Ciberseguridad: ${categorias.ciberseguridad}</li>
                <li>Inteligencia Artificial: ${categorias.inteligenciaArtificial}</li>
            </ul>
        `;
    }

   // Lógica cuando se presiona el botón "Calcular"
    calcularBtn.addEventListener('click', function () {
        calcularPuntuacion();  // Calcular puntuación
    });
});
