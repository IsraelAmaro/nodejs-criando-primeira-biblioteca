// extraindo os links da lista

import chalk from "chalk";

function extraiLinks(arrayLinks) {
    // metodo nativo do javascrips para extrair informações (neste caso o valor ) de um objeto {Object.values}
    return arrayLinks.map((objetoLink)=> Object.values(objetoLink).join());
}

//validação das URLs usando o fetch

async function checaStatus(listaUrl) {
    const arrStatus = await Promise.all(listaUrl.map(async(url)=>{ 
        
        try {
            const response = await fetch(url);        
            return response.status;  
        } catch (erro) {
            return manejaErros(erro);
        }            
    })
    )
    return arrStatus;
}

function manejaErros(erro) {
if(erro.cause.code ==='ENOTFOUND'){
    return 'link não encontrado';
    
}else{
    return 'Algo deu errado';       
}
}

export default async function  listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links); 
        
    return  listaDeLinks.map((objeto, indice)=>({
        ...objeto,
        status: status[indice]
    }));
}