import swaggerUi from 'swagger-ui-express';
import buildApiJsonSwaggerFile from '../utils/buildApiSwaggerJsonFile.js'

const buildAndServeSwaggerDocs = (entitiesList) => {
    return [
        swaggerUi.serve,
        (req, res, next) => {
            const serverUrl = req.hostUrl + req.baseUrl.replace(/\/swagger-docs\/?$/, '')
            const swaggerDocument = buildApiJsonSwaggerFile(
                {serverUrl:serverUrl,
                entitiesList:entitiesList
            })
            swaggerUi.setup(swaggerDocument)(req, res, next);
        }
    ];
};

export default buildAndServeSwaggerDocs;
