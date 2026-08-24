const TOMOS = [

  [
    "Tomos y prácticas CEPREQUINTOS 2027",
    "Material de estudio, tomos y prácticas de CEPREQUINTOS.",
    "https://drive.google.com/drive/folders/1RfSFh4w496DoJ3-TShLXjgTLOALnJKDr"
  ],

  [
    "Exámenes pasados",
    "Exámenes anteriores para practicar.",
    "https://drive.google.com/drive/folders/1SvOPvIwppyUTJ-16ImBpfnh6wDWaKNVZ"
  ],

  [
    "Material y resúmenes",
    "Material complementario para reforzar el estudio.",
    "https://drive.google.com/drive/folders/1fNBpQ7M-QKWELu6S2aSsW340ULCZnM4z"
  ]

];


function obtenerDriveId(url) {

  const match = url.match(/[-\w]{25,}/);

  return match ? match[0] : null;

}


function cargarTomos() {

  const contenedor = document.getElementById("tomos-grid");

  if (!contenedor) return;

  contenedor.innerHTML = "";


  TOMOS.forEach((tomo) => {

    const titulo = tomo[0];
    const descripcion = tomo[1];
    const driveUrl = tomo[2];

    const driveId = obtenerDriveId(driveUrl);


    const tarjeta = document.createElement("article");

    tarjeta.className = "tomo-card";


    tarjeta.innerHTML = `

      <div class="tomo-card-header">

        <div class="tomo-heading">

          <div>

            <h2 class="tomo-title">
              ${titulo}
            </h2>

            <p class="tomo-description">
              ${descripcion}
            </p>

          </div>


          <a
            href="${driveUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="tomo-button">

            Abrir carpeta ↗

          </a>

        </div>

      </div>


      <div class="tomo-preview">

        ${
          driveId
            ? `
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=${driveId}#list"
                loading="lazy"
                allowfullscreen>
              </iframe>
            `
            : `
              <div class="tomo-error">
                No se pudo cargar la vista previa.
              </div>
            `
        }

      </div>

    `;


    contenedor.appendChild(tarjeta);

  });

}


if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    cargarTomos
  );

} else {

  cargarTomos();

}