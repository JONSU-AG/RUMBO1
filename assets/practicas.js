const PRACTICAS = [

{
  titulo: "CEPREQUINTOS",
  descripcion: "Material en proceso. Se actualizará constantemente.",
  carpeta: "https://drive.google.com/drive/folders/1RfSFh4w496DoJ3-TShLXjgTLOALnJKDr"
},
  {
    titulo: "Prácticas Academia Esparta",
    descripcion: "Ejercicios y prácticas de la Academia Esparta.",
    carpeta: "https://drive.google.com/drive/folders/1Y8WeDnr-OwWse3RXxoMCqdHAOY7897_w"
  },

  {
    titulo: "Academia Briceño",
    descripcion: "Material de prácticas y ejercicios de la Academia Briceño.",
    carpeta: "https://drive.google.com/drive/folders/1K8WKW14uvGDSNOF5ctlVlBrCFKktlsYK"
  },

  {
    titulo: "Prácticas CEPREUNSA",
    descripcion: "Ejercicios y prácticas para reforzar la preparación.",
    carpeta: "https://drive.google.com/drive/folders/1dLvDGUtO4xJFOw30zyaH24vWiJtjlJZ3"
  }

];


function obtenerDriveId(url) {

  const coincidencia = url.match(/[-\w]{25,}/);

  return coincidencia ? coincidencia[0] : null;

}


function cargarPracticas() {

  const contenedor = document.getElementById("practicas-grid");

  if (!contenedor) return;

  contenedor.innerHTML = "";


  PRACTICAS.forEach(practica => {

    const driveId = obtenerDriveId(practica.carpeta);

    const tarjeta = document.createElement("article");

    tarjeta.className = "practica-card";


    tarjeta.innerHTML = `

      <div class="practica-header">

        <h2 class="practica-title">
          ${practica.titulo}
        </h2>

        <p class="practica-description">
          ${practica.descripcion}
        </p>


        <a
          href="${practica.carpeta}"
          target="_blank"
          rel="noopener noreferrer"
          class="practica-button">

          Abrir carpeta ↗

        </a>

      </div>


      <div class="practica-preview">

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
              <div class="practica-error">
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
    cargarPracticas
  );

} else {

  cargarPracticas();

}