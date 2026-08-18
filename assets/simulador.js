// ===========================================================
// RUMBO — simulador.js
// Usa datosSimulador (assets/simulador-data.js)
// ===========================================================

function groupByCurso(list){
  const groups = {};
  const order = [];

  list.forEach(item => {
    if(!groups[item.curso]){
      groups[item.curso] = [];
      order.push(item.curso);
    }

    groups[item.curso].push(item);
  });

  return { groups, order };
}


// ===========================================================
// FORMATO DE NÚMEROS
// NO REDONDEA A 2 DECIMALES
// ===========================================================

function formatNum(n){
  return String(n);
}


// ===========================================================
// RENDER DEL SIMULADOR
// ===========================================================

function renderSimulador(area){

  const wrap = document.querySelector('#sim-content');

  if(!wrap) return;

  const data = datosSimulador[area];

  const { groups, order } = groupByCurso(data);

  wrap.innerHTML = '';


  order.forEach(curso => {

    const section = document.createElement('div');

    section.className = 'sim-group';


    // TÍTULO DEL CURSO

    const h3 = document.createElement('h3');

    h3.textContent = curso;

    section.appendChild(h3);


    // TABLA

    const table = document.createElement('table');

    table.className = 'sim-table';

    table.innerHTML = `
      <thead>
        <tr>
          <th>Asignatura</th>
          <th>Preguntas</th>
          <th>Valor c/u</th>
          <th>Aciertos</th>
          <th>Subtotal</th>
        </tr>
      </thead>

      <tbody></tbody>
    `;


    const tbody = table.querySelector('tbody');


    // FILAS

    groups[curso].forEach(item => {

      const tr = document.createElement('tr');


      // ASIGNATURA

      const tdAsig = document.createElement('td');

      tdAsig.textContent = item.asignatura;


      // PREGUNTAS

      const tdPreg = document.createElement('td');

      tdPreg.textContent = item.preguntas;


      // VALOR

      const tdValor = document.createElement('td');

      tdValor.textContent = formatNum(item.valor);


      // ACIERTOS

      const tdAciertos = document.createElement('td');

      const input = document.createElement('input');

      input.type = 'number';

      input.min = '0';

      input.max = String(item.preguntas);

      input.value = '0';

      input.className = 'sim-input';

      input.setAttribute(
        'aria-label',
        `Aciertos en ${item.asignatura}`
      );

      tdAciertos.appendChild(input);


      // SUBTOTAL

      const tdSub = document.createElement('td');

      tdSub.className = 'sim-subtotal';

      tdSub.textContent = '0';

      tdSub.dataset.valor = item.valor;

      tdSub.dataset.preguntas = item.preguntas;


      // =====================================================
      // ACTUALIZAR EN TIEMPO REAL
      // =====================================================

      function update(){

        let val = parseInt(input.value, 10);


        if(isNaN(val)){
          val = 0;
        }


        if(val < 0){
          val = 0;
        }


        if(val > item.preguntas){
          val = item.preguntas;
        }


        input.value = val;


        const subtotal = val * item.valor;


        tdSub.textContent = formatNum(subtotal);


        // Actualiza inmediatamente el contador principal
        recalcTotal();
      }


      input.addEventListener('input', update);

      input.addEventListener('change', update);


      // =====================================================
      // CONSTRUIR FILA
      // =====================================================

      tr.appendChild(tdAsig);

      tr.appendChild(tdPreg);

      tr.appendChild(tdValor);

      tr.appendChild(tdAciertos);

      tr.appendChild(tdSub);

      tbody.appendChild(tr);

    });


    // SCROLL RESPONSIVO

    const scrollWrap = document.createElement('div');

    scrollWrap.className = 'table-scroll';

    scrollWrap.appendChild(table);

    section.appendChild(scrollWrap);

    wrap.appendChild(section);

  });


  recalcTotal();
}


// ===========================================================
// RECALCULAR PUNTAJE TOTAL
// ===========================================================

function recalcTotal(){

  const subtotals = document.querySelectorAll('.sim-subtotal');

  let total = 0;


  subtotals.forEach(el => {

    const valor = parseFloat(el.dataset.valor) || 0;

    const preguntas =
      parseInt(el.dataset.preguntas, 10) || 0;

    const fila =
      el.closest('tr');

    const input =
      fila ? fila.querySelector('.sim-input') : null;


    if(input){

      const aciertos =
        parseInt(input.value, 10) || 0;

      total += aciertos * valor;
    }

  });


  const totalEl =
    document.querySelector('#sim-total');


  if(totalEl){

    totalEl.textContent =
      formatNum(total);

  }
}


// ===========================================================
// INICIAR SIMULADOR
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  const tabs =
    document.querySelectorAll('.sim-tab');


  if(tabs.length === 0) return;


  tabs.forEach(tab => {

    tab.addEventListener('click', () => {

      tabs.forEach(t =>
        t.classList.remove('active')
      );


      tab.classList.add('active');


      renderSimulador(
        tab.dataset.area
      );

    });

  });


  const first = tabs[0];


  first.classList.add('active');


  renderSimulador(
    first.dataset.area
  );

});