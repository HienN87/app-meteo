let ville;

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    position => {
      const key = "703bf068414b958e7ffeb989a4842ad2";
      const url = `https://api.openweathermap.org/data/2.5/weather?lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${key}&units=metric`;

      fetch(url).then(requete => {
        if (requete.ok) {
          requete.json().then(donnees => {
            let temperature = donnees.main.temp;
            let ville = donnees.name;

            document.querySelector("#temperature_label").textContent = temperature;
            document.querySelector("#ville").textContent = ville;
          });
        } else {
          alert("Un problème est survenu");
        }
      });
    },
    error,
    options,
  );
} else {
  ville = "Marseille";
  recevoirTemperature(ville);
}

var options = {
  enableHighAccuracy: true,
};

let changer = document.querySelector("#changer");
changer.addEventListener("click", () => {
  let viilleChoisie = prompt("Choisissez une ville");

  recevoirTemperature(viilleChoisie);
});

function error() {
  ville = "Marseille";
  recevoirTemperature(ville);
}

async function recevoirTemperature(ville) {
  const key = "703bf068414b958e7ffeb989a4842ad2";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${key}&units=metric`;

  const requete = await fetch(url, {
    method: "GET",
  });

  if (requete.ok) {
    requete.json().then(donnees => {
      let temperature = donnees.main.temp;
      let ville = donnees.name;

      document.querySelector("#temperature_label").textContent = temperature;
      document.querySelector("#ville").textContent = ville;
    });
  } else {
    alert("Un problème est survenu");
  }
}
