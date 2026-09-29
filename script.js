function obterlocalizacao() {
    const resultado = document.getElementById('resultado');
    
    if (navigator.geolocation) {
        resultado.textContent =
            "Seu navegador suporta localização.";
        return;
    }

    resultado.textContent = "📍 Buscando sua localização...";
    
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            resultado.innerHTML = `
                <strong>📍 Você está aqui!</strong><br><br>
                Latitude: ${latitude.toFixed(5)}<br>
                Longitude: ${longitude.toFixed(5)}
            `;

        },

        function () {
            resultado.textContent =
            "Não foi possível obter sua localização. Verifique a permissão do GPS";
        }
    );
}

function abrirCamera() {
    const camera = document.getElementById("camera")

    camera.click();

    camera.onchange = function () {
        const arquivo = camera.files[0];

        if (arquivo) {
            const foto = document.getElementById("foto");

            foto.scr = URL.createObjectURL(arquivo);
            foto.style.disp = "block"
        }

    };

}

function mostrarRestaurante(nome) {
    const detalhes = document.getElementById("detalhes");
    const nomeRestaurante = document.getElementById("nomeRestaurante");
    const infoRestaurante = document.getElementById("infoRestaurante");

    nomeRestaurante.textContent = "🍽️ " + nome;

    if (nome === "Burger House") {
        infoRestaurante.textContent =
            "⭐ 4,8 • Hambúrguer • 📍 0,8 km de você";
    }

    if (nome === "Pizza Mania") {
        infoRestaurante.textContent =
            "⭐ 4,6 • Pizza • 📍 1,2 km de você";
    }

    if (nome === "Sushi House") {
        infoRestaurante.textContent =
            "⭐ 4,9 • Japonês • 📍 1,5 km de você";
    }

    detalhes.style.display = "block";

    detalhes.scrollIntoView({
        behavior: "smooth"
    });
}

function compartilharWhatsApp() {
    const nome = document.getElementById("nomeRestaurante").textContent;
    const mensagem = `Olha esse lugar para comer: ${nome}. Encontrei no aplicativo!`;

    const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}

function filtrarCategoria(categoria) {
    const restaurantes = document.querySelectorAll(".card-restaurante");

    restaurantes.forEach(function(restaurante) {
        const texto = restaurante.textContent.toLowerCase();

        if (categoria === "hamburguer" && texto.includes("hambúrguer")) {
            restaurante.style.display = "block";
        } 
        else if (categoria === "pizza" && texto.includes("pizza")) {
            restaurante.style.display = "block";
        } 
        else if (categoria === "japones" && texto.includes("japonês")) {
            restaurante.style.display = "block";
        } 
        else {
            restaurante.style.display = "none";
        }
    });
}