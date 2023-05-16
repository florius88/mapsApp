/* Vamos a importar */
const { writeFileSync, mkdirSync } = require('fs');


/* Vamos a crear la configuracion como pone en la doc de dotenv */
require('dotenv').config();


/* Le indicamos el path donde queremos que se cree */
const targetPath = './src/environments/environments.ts'


/* Contenido del archivo */
const envFileContent = `
export const environment = {
  mapbox_key: "${process.env['MAPBOX_KEY']}",
  otra: "PROPIEDAD",
}
`;


/* Creamos el directorio si no existe,
recursive porque si ya existe, lo voy a sobreescribir */
mkdirSync('./src/environments', { recursive: true });

/* Escribimos el archivo */
writeFileSync( targetPath, envFileContent );

