import { generateSwaggerSchemas } from "./buildSwaggerSchemas.js"

const buildApiJsonSwaggerFile = ({serverUrl, entitiesList}) => {
    const swaggerDocument = {
        openapi: '3.0.0',
        info: {
            title: `API en ${serverUrl}`,
            version: '1.0.0',
            description: `Documentación del router de ${entitiesList.map(item => item.collectionName).join(', ')}.`,
        },
        tags: entitiesList.map(item => ({
            name: item.collectionName,
            description: `Operaciones sobre ${item.collectionName}`,
        })),
        servers: [{url: serverUrl}
        ],
        paths: buildPathsFromEntitiesList(entitiesList),
    }

    return swaggerDocument
}


const buildPathsFromEntitiesList =(entitiesList) => {
    const paths = {}
    entitiesList.forEach(item => {
        paths[`/${item.collectionName}`] = {
            post: {
                summary: `Crear un nuevo ${item.collectionName}`,
                description: `Agrega un nuevo documento a la colección ${item.collectionName}.`,
                tags: [item.collectionName],
                requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {...generateSwaggerSchemas(item.model).postSchema}
                      }
                    }
                  },
                  responses: {
                    201: {
                        description: `${item.collectionName} creado exitosamente`,
                        content: {
                            "application/json": {
                            example: {...generateSwaggerSchemas(item.model).fullSchema}
                        }
                        }
                    },
   
                    500: {
                    description: "Error interno del servidor"
                    }
                    }
              }
              ,
            get: {
                summary: `Obtiene todos los ${item.collectionName}`,
                description: `Devuelve una lista de ${item.collectionName}`,
                tags: [item.collectionName],
                responses: {
                    200: {
                        description: `List de ${item.collectionName} obtenidos exitosamente.`,
                    },
                    404: {
                        description: `${item.collectionName} itemsno encontrado.`
                    },
                    500: {
                        description: 'Error interno del servidor.'
                }
            }
            },

            delete: {
                summary: `Borra una lista de ${item.collectionName} por ids...`,
                description: `Borra una lista de ${item.collectionName} por ids...`,
                tags: [item.collectionName],
              }

          
        }


        paths[`/${item.collectionName}/{id}`] = {

            get: {
                summary: `Obtiene ${item.collectionName} por id.`,
                description: `Devuelve ${item.collectionName} por id.`,
                tags: [item.collectionName],
                parameters: [
                    {
                      name: "id",
                      in: "path",
                      description: `ID del ${item.collectionName} a obtener.`,
                      required: true,
                      schema: {
                        type: "string",
                        pattern: "^[a-fA-F0-9]{24}$",
                        example: "507f1f77bcf86cd799439011" 
                      }
                    }
                  ],
                responses: {
                    200: {
                        description: `${item.collectionName} obtenido exitosamente`,
                    },
                    404: {
                        description: `${item.collectionName} no encontrado`
                    },
                    500: {
                        description: 'Error interno del servidor.'
                    }
                    
                }
            },

            put: {
                summary: `Edita un ${item.collectionName}.`,
                description: `Edita un nuevo documento a la colección ${item.collectionName}.`,
                tags: [item.collectionName],
                parameters: [
                    {
                      name: "id",
                      in: "path",
                      description: `ID del ${item.collectionName} a editar.`,
                      required: true,
                      schema: {
                        type: "string",
                        pattern: "^[a-fA-F0-9]{24}$",
                        example: "507f1f77bcf86cd799439011" 
                      }
                    }
                  ],
              },

        }

        
    })

    return paths
}

export default buildApiJsonSwaggerFile
