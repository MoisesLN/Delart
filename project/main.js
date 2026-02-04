// divs do dashboard
const totalGanhoDiv = document.getElementById('total-earned');
const countDiv = document.getElementById('count');
const lavagensContainer = document.getElementById('lavagens')

// divs do form
const form = document.getElementById('form');
const nomeInput = document.getElementById('nome');
const modeloInput = document.getElementById('modelo');
const placaInput = document.getElementById('placa');
const tipoInput = document.getElementById('tipo');
const precoInput = document.getElementById('preco');
const dataInput = document.getElementById('data');

// inicializando variáveis
let id = Number(localStorage.getItem('id')) || 1;
let lavagens = JSON.parse(localStorage.getItem("lavagens")) || [];
console.log(lavagens)
renderDOM();


function transformInObject (nome, placa, modelo, preco, tipo, data) {
    console.log(data)
    const atendimento = {
        id: id,
        nome: nome,
        placa: placa,
        modelo: modelo,
        preco: "R$ " + preco.toFixed(2),
        tipo: tipo,
        data: data
    }

    id += 1;
    localStorage.setItem('id', id);
    return atendimento
}

function renderDOM() {
    if(!lavagens.length) {
        lavagensContainer.innerHTML = '<h1>Sem lavagens até o momento</h1>'
        return
    }
    let htmlContent = ''
    lavagens.forEach(lavagem => {
        htmlContent += getHtmlFromObject(lavagem);
    })

    lavagensContainer.innerHTML = htmlContent;
}

function getHtmlFromObject(object) {
    const html = `
    <div class="lavagem p-4 bg-slate-700/20 border border-slate-700/60 rounded-[.5em] flex flex-col gap-4 hover:bg-slate-700/40 hover:border-slate-500/70 duration-200">
        <div class="flex gap-4 justify-between">
            <div class="flex flex-col gap-2">
                <div class="flex">
                    <p class="px-3 py-1 bg-blue-900/30 rounded-[.25em] border border-blue-900/90">${object.nome}</p>
                </div>
                <div class="flex gap-2 text-blue-50/60 text-sm leading-none">
                    <p>${object.modelo}</p>
                    <span>•</span>
                    <p>${object.placa}</p>
                </div>
                <p class="text-blue-50/60 text-sm leading-none">${object.tipo}</p>
            </div>
            <div class="flex flex-col gap-1 justify-center items-end">
                <p class="text-green-700">${object.preco}</p>
                <p class="text-blue-50/60 text-sm">${object.data}</p>
            </div>
        </div>
        <button onclick="deleteWash(${object.id})" class="flex gap-1 items-center bg-red-900/70 text-red-300 w-fit px-4 py-2 text-sm border border-red-800 rounded-[.5em] duration-200 hover:border-red-600 hover:scale-[102%] cursor-pointer active:scale-[98%]">
            <i class="bi bi-trash"></i>
            <p>Excluir</p>
        </button>
    </div>
    `
    return html
}

function deleteWash(id) {
    lavagens = lavagens.filter(lavagem => lavagem.id !== id);
    localStorage.setItem('lavagens', JSON.stringify(lavagens));
    alert("Lavagem deletada com sucesso!");
    renderDOM();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let nome, modelo, placa, tipo, preco, data;
    try {
        nome = nomeInput.value;
        modelo = modeloInput.value;
        placa = placaInput.value;
        tipo = tipoInput.value == 'simples' ? 'Lavagem simples' : 'Lavagem detalhada';
        preco = Number(precoInput.value);
        data = dataInput.value;
    } catch {
        alert('Nem todos os campos foram preenchidos!')
        return
    }
    lavagens.push(transformInObject(nome, placa, modelo, preco, tipo, data))
    localStorage.setItem('lavagens', JSON.stringify(lavagens))
    renderDOM();
    alert("Lavagem adicionada com sucesso!");
    form.reset();
})