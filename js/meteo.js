const apiKey = "7fffabb24dac4038a91172847250812"; 
async function tiempo(city) {
    try {
        const res = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`
        );

        if (!res.ok) throw new Error(`Error en la petición: ${res.status}`);

        const data = await res.json();

        const locationElem = document.getElementById("location");
        const conditionElem = document.getElementById("condition");
        const iconElem = document.getElementById("icon");
        const tempElem = document.getElementById("temperature");
        const detailsElem = document.getElementById("details");
        const horasContainer = document.getElementById("prevision-horas");

        if (locationElem) {
            locationElem.textContent = `${data.location.name} / ${data.location.country}`;
        }

        if (conditionElem) {
            conditionElem.textContent = data.current.condition.text;
        }

        if (iconElem) {
            iconElem.src = `https:${data.current.condition.icon}`;
            iconElem.alt = data.current.condition.text;
        }

        if (tempElem) {
            tempElem.textContent = `${data.current.temp_c}°C`;
        }

        if (detailsElem) {
            detailsElem.textContent =
                `Humedad: ${data.current.humidity}% | ` +
                `Viento: ${data.current.wind_kph} km/h | ` +
                `Precipitación: ${data.current.precip_mm} mm`;
        }

        /* Fondos para la página de meteo */
        if (document.body.classList.contains("page-meteo")) {
            const fondos = {
                "Sunny": "../assets/fondo-sunny.jpg",
                "Clear": "../assets/fondo-sunny.jpg",
                "Partly cloudy": "../assets/fondo-cloudy.jpg",
                "Cloudy": "../assets/fondo-cloudy.jpg",
                "Overcast": "../assets/fondo-cloudy.jpg",
                "Rain": "../assets/fondo-rain.jpg",
                "Light rain": "../assets/fondo-rain.jpg",
                "Moderate rain": "../assets/fondo-rain.jpg",
                "Snow": "../assets/fondo-snow.jpg",
                "Thunderstorm": "../assets/fondo-thunder.jpg"
            };

            const condicion = data.current.condition.text;
            const fondoUrl = fondos[condicion] || "../assets/fondo-sunny.jpg";

            document.body.style.backgroundImage = `url(${fondoUrl})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
        }

        /* Previsión por horas (solo si existe)*/
        if (horasContainer) {
            horasContainer.innerHTML = "";

            data.forecast.forecastday[0].hour.forEach(hour => {
                const horaCard = document.createElement("div");
                horaCard.className = "hour-card";
                horaCard.innerHTML = `
                    <p>${hour.time.split(" ")[1]}</p>
                    <img src="https:${hour.condition.icon}" alt="icono">
                    <p>${hour.temp_c}°C</p>
                `;
                horasContainer.appendChild(horaCard);
            });
        }

    } catch (error) {
        console.error("Error obteniendo el clima:", error);
        const locationElem = document.getElementById("location");
        if (locationElem) {
            locationElem.textContent = "No se pudo cargar la información";
        }
    }
}
