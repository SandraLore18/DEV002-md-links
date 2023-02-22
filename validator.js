const { existsSync, statSync, readdirSync, readFile } = require("fs");
const { isAbsolute, resolve, extname } = require("path");
const { cwd } = require("process"); 
//el objeto process requiere la funcion cwd completa la ruta de donde esté cualquier archivo hasta donde estoy, generando así una ruta absoluta.

/**
 *
 * @param {string} pathname ésta es la ruta
 * @returns se valida si existe un path y retorna un boolean
 */
const routExist = (pathname) => {
  const isValid = existsSync(pathname);
  return isValid ? true : false;
};

/**
 *
 * @param {string} pathname ésta es la ruta
 * @returns se valida si la ruta es absoluta
 */
const validateAbsolute = (pathname) => {
  const absolut = isAbsolute(pathname);
  return absolut ? true : false;
};

/**
 *
 * @param {string} pathname es la ruta relativa
 * @returns una ruta absoluta
 */
const converToAbsolute = (pathname) => {
  const almacenRelativa = cwd();
  return resolve(almacenRelativa, pathname);
};

const isAdirectory = (pathname) => {
  const state = statSync(pathname);
  return state.isDirectory() ? true : false;
};

const readFolder = (pathname) => {
  const contents = readdirSync(pathname);
  return contents;
};

const itsMdFile = (pathname) => {
  return extname(pathname) === ".md" ? true : false;
};

const getMdFiles = (pathname) => {
  let mdArray = [];
  if (itsMdFile(pathname)) {
    mdArray.push(pathname);
  } else if (isAdirectory(pathname)) {
    const contentMDs = readFolder(pathname);
    contentMDs.map(
      (e) => (mdArray = mdArray.concat(getMdFiles(`${pathname}/${e}`)))
    );
  }
  return mdArray;
};

const funcReadFiles = (pathname) => {
  return new Promise((resolve, reject) => {
    readFile(pathname, "utf-8", (error, files) => {
      error ? reject(error) : resolve(files);
    });
  });
};





module.exports = {
  routExist,
  validateAbsolute,
  converToAbsolute,
  isAdirectory,
  readFolder,
  itsMdFile,
  getMdFiles,
  funcReadFiles,
};
