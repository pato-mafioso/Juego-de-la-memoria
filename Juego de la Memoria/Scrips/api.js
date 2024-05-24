class Cartita extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <main class="principal">
        <section class= "info">
          <div class="tiempo">1:00</div>
          <div class="vidas">
            <span class="corazon">&#10084;</span>
            <span class="corazon">&#10084;</span>
            <span class="corazon">&#10084;</span>
            </div>
            <button id = "play"> Jugar </button>
          <div id="buscador">
            <p>Carta a buscar<p>
            <div class="contenedor-cartas-duplicadas"></div>              
          </div>
        </section>
        <section id="mesa"> 
          <div class="contenedor-cartas"> </div>     
        </section>
      </main>`;

    const contenedorDuplicadas = this.querySelector(
      ".contenedor-cartas-duplicadas"
    );
    const contenedorPrincipal = this.querySelector("div.contenedor-cartas");

    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        const characters = data.results;

        
        const personajesAleatorios = characters
          .sort(() => Math.random() - 0.5)
          .slice(0, 8);

      
        const personajesDuplicados = [
          ...personajesAleatorios,
          ...personajesAleatorios,
        ];

        
        const personajesMezclados = personajesAleatorios.sort(
          () => Math.random() - 0.5
        );

        personajesMezclados.forEach((character, index) => {
          const card = document.createElement("div");
          card.classList.add("carta");
          card.dataset.id = character.id;

          const cardFront = document.createElement("div");
          cardFront.classList.add("cartaFront");

          const cardBack = document.createElement("div");
          cardBack.classList.add("cartaBack");
          const imagen = document.createElement("img");
          imagen.src = character.image;
          cardBack.appendChild(imagen);

          card.appendChild(cardFront);
          card.appendChild(cardBack);

          
          contenedorPrincipal.append(card);


          if (index >= 0) {
            const duplicateCard = card.cloneNode(true);
            duplicateCard.classList.add("cartaDuplicada");
            contenedorDuplicadas.appendChild(duplicateCard);
          }

          
          card.addEventListener("click", function () {
            
            if (card.classList.contains("flip")) return;

            card.classList.toggle("flip");

            
            const cartasVolteadas = document.querySelectorAll(".flip");
            if (cartasVolteadas.length === 2) {
              const carta1 = cartasVolteadas[0];
              const carta2 = cartasVolteadas[1];
              const carta1IsDuplicated = contenedorDuplicadas.querySelector(`[data-id="${carta1.dataset.id}"]`);
              const carta2IsDuplicated = contenedorDuplicadas.querySelector(`[data-id="${carta2.dataset.id}"]`);
              if (carta1IsDuplicated === carta2IsDuplicated) {
                
                console.log("¡Ambas cartas son duplicadas!");
                
                setTimeout(() => {
                  carta1.remove();
                  carta2.remove();
                  carta1IsDuplicated.remove();
                  carta2IsDuplicated.remove();
                  
                  mostrarNuevasCartas();
                }, 1000); 
              } else {
                
                
                console.log("¡Al menos una carta no es duplicada!");
                
                setTimeout(() => {
                  cartasVolteadas.forEach(carta => carta.classList.remove("flip"));
                }, 1000); 
              }
            }
          });
        });

        
        const cartasDuplicadas = document.querySelectorAll(".cartaDuplicada");
        cartasDuplicadas.forEach((carta) => {
          carta.addEventListener("click", function () {
            
            if (carta.classList.contains("flip")) return;

            carta.classList.toggle("flip");
          });
        });
      })
      .catch((error) => console.log(error));
      

    function mostrarNuevasCartas() {
      
      const nuevasCartasAleatorias = characters
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      nuevasCartasAleatorias.forEach((character) => {
        const card = document.createElement("div");
        card.classList.add("carta");
        card.dataset.id = character.id;

        const cardFront = document.createElement("div");
        cardFront.classList.add("cartaFront");

        const cardBack = document.createElement("div");
        cardBack.classList.add("cartaBack");
        const imagen = document.createElement("img");
        imagen.src = character.image;
        cardBack.appendChild(imagen);

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        
        contenedorPrincipal.append(card);
      });
    }
  }
}

window.customElements.define("cart-component", Cartita);