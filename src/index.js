import fs, { readFile } from 'fs'

import chalk from "chalk";
import { url } from 'inspector';

function extraiLink(texto) {
    
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/g;

    const capturas = [...texto.matchAll(regex)];  

    const resultados = capturas.map((captura, index)=>({[captura[1]]: captura[2]}));
 
    return resultados.length !== 0 ? resultados : 'Nao há links no arquivo'    

}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Os parametros informados contem erro ou não há arquivo no diretório'));
}

// async-await

async function pegaArquivo(caminhoDoArquivo) {

    try {

        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
       
        return extraiLink(texto)
       

    } catch (error) {

        trataErro(error);
    }
    
}

export default pegaArquivo;





//[gatinho salsicha](http://gatinhosalsicha.com.br/)





