import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { generateSwaggerSchemas, generateSwaggerSchemaWithExamples } from './basiccrudutils.js'
import makeRequestGroup from './BasicCrudUtils/request.js'
import {exploreRouterStack,extractUrlInfoFromReqObject} from './BasicCrudUtils/exploreRouterStack.js'

export class BasicCrud {

    constructor({ middlewareOrderedArray, entitiesList }) {
        this.middlewareOrderedArray = middlewareOrderedArray || []
        this.entitiesList = entitiesList
        this.router = express.Router()

        this.#addGetJsonFileRoute()
        if (this.middlewareOrderedArray.length > 0) this.router.use(...this.middlewareOrderedArray)
        this.#addColecctionsRoutes()
        this.#addSwaggerDocsRoute()
        this.#addRoutesInfoRoute()

    }

   

    #addSwaggerDocsRoute = () => {
           
        const setupSwaggerDocumentation = (req,res,next) => {
            const {hostUrl,baseUrl} = extractUrlInfoFromReqObject(req)
            const swaggerBaseRequestUrl = hostUrl + baseUrl.replace(/\/swagger-docs\/?$/, '')
            const swaggerDocument = this.#getApiJsonSwaggerFile(swaggerBaseRequestUrl)
            req.swaggerDocument = swaggerDocument
            next()
        }
        this.router.use('/swagger-docs', setupSwaggerDocumentation, swaggerUi.serve,(req, res) => {
            swaggerUi.setup(req.swaggerDocument)(req, res);
        });
    }

    #getApiJsonSwaggerFile = (serverUrl) => {

        const paths = {}
        this.entitiesList.forEach(item => {

            

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


        const swaggerDocument = {
            openapi: '3.0.0',
            info: {
                title: `API en ${serverUrl}`,
                version: '1.0.0',
                description: `Documentación del router de ${this.entitiesList.map(item => item.collectionName).join(', ')}.`,
            },
            tags: this.entitiesList.map(item => ({
                name: item.collectionName,
                description: `Operaciones sobre ${item.collectionName}`,
            })),
            servers: [
                {
                url: serverUrl,
                
                }
            ],
            paths: paths,
         
        };

        return swaggerDocument
    }

    #addGetJsonFileRoute = () => {

        this.router.get('/get-json-file', (req, res) => {
            const {hostUrl,baseUrl} = extractUrlInfoFromReqObject(req)
            const serverUrl = `${req.protocol}://${req.get('host')}`
            console.log('url del servidor en llamador: ', serverUrl)
            console.log('url Router en llamador: ', req.baseUrl)
            const jsonFile = this.#getApiJsonFile({
                apiName: 'My Basic Crud Api',
                hostUrl: hostUrl,
                baseUrl: baseUrl
            })
            const jsonBuffer = Buffer.from(jsonFile)
            res.setHeader('Content-Disposition', 'attachment; filename="api-requests.json"');
            res.setHeader('Content-Type', 'application/json');

            // Enviar el buffer
            res.send(jsonBuffer);
        })
    }



    #getApiJsonFile = ({ apiName, hostUrl, baseUrl }) => {
        console.log('serverUrl: ', hostUrl)
        console.log('serverRouter: ', baseUrl)
        const apiRequestsCollection = {
            info: {
                name: apiName,
                description: apiName,
                schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
            },
            item: []
        }

        // Parse the baseUrl to get protocol and host
        const url = new URL(hostUrl)
        const protocol = url.protocol.replace(':', '')
        const host = url.hostname
        const port = url.port

        this.entitiesList.forEach(collectionItem => {
            const collectionFolder = {
                name: collectionItem.collectionName,
                item: [
                    {
                        name: `Create ${collectionItem.collectionName}`,
                        request: {
                            method: 'POST',
                            header: [
                                {
                                    key: 'Content-Type',
                                    value: 'application/json'
                                }
                            ],
                            body: {
                                mode: 'raw',
                                raw: '{}'
                            },
                            url: {
                                raw: `${hostUrl}${baseUrl}/${collectionItem.collectionName}`,
                                protocol: protocol,
                                host: [host],
                                port: port,
                                path: [baseUrl.replace('/', ''), collectionItem.collectionName]
                            }
                        }
                    },
                    {
                        name: `Get ${collectionItem.collectionName} by ID`,
                        request: {
                            method: 'GET',
                            url: {
                                raw: `${hostUrl}${baseUrl}/${collectionItem.collectionName}/:id`,
                                protocol: protocol,
                                host: [host],
                                port: port,
                                path: [baseUrl.replace('/', ''), collectionItem.collectionName, ':id']
                            }
                        }
                    },
                    {
                        name: `Get ${collectionItem.collectionName} list`,
                        request: {
                            method: 'GET',
                            url: {
                                raw: `${hostUrl}${baseUrl}/${collectionItem.collectionName}`,
                                protocol: protocol,
                                host: [host],
                                port: port,
                                path: [baseUrl.replace('/', ''), collectionItem.collectionName]
                            }
                        }
                    },
                    {
                        name: `Update ${collectionItem.collectionName}`,
                        request: {
                            method: 'PUT',
                            header: [
                                {
                                    key: 'Content-Type',
                                    value: 'application/json'
                                }
                            ],
                            body: {
                                mode: 'raw',
                                raw: '{}'
                            },
                            url: {
                                raw: `${hostUrl}${baseUrl}/${collectionItem.collectionName}/:id`,
                                protocol: protocol,
                                host: [host],
                                port: port,
                                path: [baseUrl.replace('/', ''), collectionItem.collectionName, ':id']
                            }
                        }
                    },
                    {
                        name: `Delete ${collectionItem.collectionName}`,
                        request: {
                            method: 'DELETE',
                            url: {
                                raw: `${hostUrl}${baseUrl}/${collectionItem.collectionName}`,
                                protocol: protocol,
                                host: [host],
                                port: port,
                                path: [baseUrl.replace('/', ''), collectionItem.collectionName]
                            }
                        }
                    }
                ]
            }
            apiRequestsCollection.item.push(collectionFolder)
        })

        return JSON.stringify(apiRequestsCollection, null, 2)
    }


    getRouter = () => {
        return this.router
    }

    #addColecctionsRoutes = () => {
        this.entitiesList.forEach(item => {
            const requestGroup = makeRequestGroup({validateSchema:item.validateSchema,model:item.model})
            this.router.post(`/${item.collectionName}`, requestGroup.postRequest)
            this.router.get(`/${item.collectionName}/:id`, requestGroup.getByIdRequest)
            this.router.get(`/${item.collectionName}`, requestGroup.getByQueryRequest)
            this.router.put(`/${item.collectionName}/:id`, requestGroup.putByIdRequest)
            this.router.delete(`/${item.collectionName}`, requestGroup.deleteByIdListRequest) 
        })
    }



    #addRoutesInfoRoute = () => {
        this.router.get('/routes-info',(req,res)=>{
        const {hostUrl,baseUrl} = extractUrlInfoFromReqObject(req)
        const routesList = exploreRouterStack(this.router)
        const routesListWithUrl = routesList.map( route => ({
            method: route.method,
            url: hostUrl + baseUrl + route.path
        }))
        res.json(routesListWithUrl)
       })
        
    }

}

