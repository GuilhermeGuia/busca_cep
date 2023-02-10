const btn_buscar = document.querySelector("#btn_buscar");
const input_cep = document.querySelector("#input_cep");

const fetchEndress = (cep) => {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then(({ bairro, cep, localidade, logradouro, uf }) => {
      const htmlTemplate = `
      <h2 class="titulo_cidade_uf" id="cidade_uf">
        ${localidade}, ${uf}
      </h2>
      <span class="titulo_bairro" id="bairro">
        Bairro: ${bairro}
      </span>
      <span class="titulo_logradouro" id="logradouro">
        Logradouro: ${logradouro}
      </span>
      <span class="titulo_cep" id="cep">
        ${cep}
      </span>
    `;
      const body_pesquisa = document.querySelector(".body-pesquisa");

      body_pesquisa.innerHTML = htmlTemplate;

      body_pesquisa.style.opacity = "1";
    })
    .catch((error) => {
      console.log(error);
    });
};

btn_buscar.addEventListener("click", () => {
  let input_value = input_cep.value.trim().replace("-", "");

  if (input_value === "" || input_value.length > 8) return;

  fetchEndress(input_value);
});

input_cep.addEventListener("keypress", (e) => {
  if (!checkChar(e)) {
    e.preventDefault();
  }

  formatar_input(e);
});

const formatar_input = (e) => {
  let input_value = e.target.value.trim();

  if (input_value.length > 8) {
    e.preventDefault();
    return;
  }

  if (input_value.length === 5) {
    e.target.value = input_value + "-";
  }
};

const checkChar = (e) => {
  const char = String.fromCharCode(e.keyCode);

  const pattern = "[0-9]";

  if (char.match(pattern)) {
    return true;
  }
};
