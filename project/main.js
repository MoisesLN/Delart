function transformInObject (nome, placa, modelo, preco, data) {
    const atendimento = {
        nome: nome,
        placa: placa,
        modelo: modelo,
        preco: "R$ " + preco.toFixed(2),
        data: data
    }
    
    return atendimento
}

// const atendimento = transformInObject(
    "MoisesGay",
    "ABC-6969",
    "Golrolla",
    10,
    "03/02/2026"
// );
// const atendimento = transformInObject(
    "DlleonDabunda",
    "ABC-6767",
    "FuscãoPreto",
    11,
    "04/02/2026"
// );
const atendimento = transformInObject(
    "BtwoBaitola",
    "ABC-157",
    "BesouroAzul",
    10,
    "23/02/2026"
);

console.log(atendimento);

function addLocalStorage(atendimento) {
    localStorage.setItem("atendimento", JSON.stringify(atendimento));
   
}
function getLocalStorage() {
    return JSON.parse(localStorage.getItem("atendimento"));
}

addLocalStorage(atendimento);
console.log(getLocalStorage());