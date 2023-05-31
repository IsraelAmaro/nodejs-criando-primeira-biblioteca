//pedando um comando e executar a função desejada
import chalk from "chalk";
import fs from 'fs';
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv; //meio de buscar o caminho do endereço. Séra retornado u array

async function imprimeLista(valida, resultado, identificador = '') {
    if (valida) {
        console.log(chalk.bgWhite.green('Lista validada: => '),
            chalk.bgGreen.black(identificador), await listaValidada(resultado));
    } else {
        console.log(chalk.bgWhite.blue('Lista de links: => '),
            chalk.bgGreen.black(identificador), resultado);
    }

}

async function processaTexto(argumentos) {

    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';   

    //Tratando possiveis erros na localização do arquivo
    try {
        fs.statSync(caminho)
    } catch (erro) {
        // trabalhando com o codigo dado no erro 
        if (erro.code === 'ENOENT') {
            console.log(chalk.bgWhite.red('O diretório ou arquivo não existe'))
            return
        }
    }

    //Condição para saber se é um diretório ou um arquivo com o metodo lstatSync

    if (fs.lstatSync(caminho).isFile()) {

        const resultado = await pegaArquivo(caminho);

        imprimeLista(valida,resultado);

    } else if (fs.lstatSync(caminho).isDirectory()) {
        //metodo para ler o diretório e encontrar os arquivos  .readdir

        const arquivos = await fs.promises.readdir(caminho);

        arquivos.forEach((async nomeDeArquivo => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);

            imprimeLista(valida ,lista, nomeDeArquivo);
        }))
    }
}

processaTexto(caminho);

