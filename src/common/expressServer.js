import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export class ExpressServer {
    constructor({port,serverCookiesSign,logger,routerList,errorHandlerMiddleware}) {
        this.app = express()
        this.port = port
        this.routerList = routerList
        this.serverCookiesSign = serverCookiesSign
        this.logger = logger
        this.errorHandlerMiddleware = errorHandlerMiddleware
        this.server = null
        this.#useStandardMiddlewares()
        this.#useRoutesMiddlewares()
        this.#useErrorHandlerMiddleware()
    }

    #useStandardMiddlewares = () => {
        this.app.use(morgan("dev"))
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static("public"))
        this.app.use(cookieParser(this.serverCookiesSign))
        this.app.use(cors({
            origin: "http://localhost:5173", 
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'], 
            credentials: true, 
          }))
        
    }

    #useRoutesMiddlewares = () => {
        this.routerList && 
        this.routerList.forEach(routeDetails => {
            this.app.use(routeDetails.path, routeDetails.router)
        })
    }

    #useErrorHandlerMiddleware =()  => {
        this.errorHandlerMiddleware && this.app.use(this.errorHandlerMiddleware)
    }

   

    start = () =>{
        try {
            this.server = this.app.listen(this.port,()=>{
                this.logger.info(`Server escuchando en puerto ${this.port}.`)
            })
        } catch (error) {
            this.logger.error("Error al iniciar el servidor: ", error);
        }
    }
    

    stop =() => {
        if (this.server) {
            return new Promise((resolve, reject) => {
                this.server.close((error) => {
                    if(error) {
                        this.logger.error("Error al detener el servidor: ", error);
                        reject(error)
                    } else {
                        this.logger.info("Servidor detenido.")
                        resolve()
                    }
                })
            })
        } 
    }

    exploreStack = () => {
        console.log("\n=== Explorando Stack ===");
        this.app._router.stack.forEach((layer, index) => {
            // Primero veamos qué tipo de layer es
            console.log(`\nLayer ${index}:`);
            console.log('Nombre:', layer.name);
            console.log('Tipo:', layer.name === 'router' ? 'Router' : 
                              layer.route ? 'Ruta' : 
                              'Middleware');
    
            // Si es un middleware, podemos ver su nombre
            if (layer.name && layer.name !== 'router') {
                console.log('Middleware:', layer.name);
            }
            
            if (layer.name === 'router') {
                // Obtener el path real de montaje
                let mountPath = layer.regexp.toString()
                    .replace('/^', '')
                    .replace('\\/?(?=\\/|$)/i', '')
                    .replace(/\\\//g, '/')
                    .replace(/^\/\//, '/');
    
                console.log('Mount Path:', mountPath);
                console.log('Rutas en este router:');
                
                // Explorar las rutas dentro del router
                if (layer.handle && layer.handle.stack) {
                    layer.handle.stack.forEach((routerLayer, rIndex) => {
                        if (routerLayer.route) {
                            let fullPath = `${mountPath}${routerLayer.route.path}`
                                .replace(/\/+/g, '/');
    
                            console.log(`  Ruta ${rIndex}:`, {
                                fullPath,
                                method: Object.keys(routerLayer.route.methods)[0].toUpperCase()
                            });
                        } else if (routerLayer.name === 'router') {
                            console.log(`  Sub-Router en ${rIndex}`);
                        }
                    });
                }
            }
        });
    
        // También podemos imprimir un resumen
        console.log('\n=== Resumen de Middlewares y Routers ===');
        this.app._router.stack.forEach((layer, index) => {
            if (layer.name === 'router') {
                console.log(`Router en posición ${index}`);
            } else if (layer.name) {
                console.log(`Middleware '${layer.name}' en posición ${index}`);
            }
        });
    }

    getDocs = () => {
        const documentation = {
            middlewares: [],
            routers: [],
            routes: [],
            summary: {
                totalMiddlewares: 0,
                totalRouters: 0,
                totalRoutes: 0
            }
        };

        this.app._router.stack.forEach((layer, index) => {
            // Middleware
            if (layer.name && layer.name !== 'router') {
                documentation.middlewares.push({
                    name: layer.name,
                    position: index,
                    type: 'Middleware'
                });
                documentation.summary.totalMiddlewares++;
            }
            
            // Router
            if (layer.name === 'router') {
                const mountPath = layer.regexp.toString()
                    .replace('/^', '')
                    .replace('\\/?(?=\\/|$)/i', '')
                    .replace(/\\\//g, '/')
                    .replace(/^\/\//, '/');

                const routerInfo = {
                    mountPath,
                    position: index,
                    routes: []
                };

                // Rutas dentro del router
                if (layer.handle && layer.handle.stack) {
                    layer.handle.stack.forEach((routerLayer, rIndex) => {
                        if (routerLayer.route) {
                            const fullPath = `${mountPath}${routerLayer.route.path}`
                                .replace(/\/+/g, '/');
                            
                            const method = Object.keys(routerLayer.route.methods)[0].toUpperCase();
                            
                            routerInfo.routes.push({
                                path: fullPath,
                                method,
                                position: rIndex
                            });

                            documentation.routes.push({
                                path: fullPath,
                                method,
                                router: mountPath,
                                position: rIndex
                            });
                        }
                    });
                }

                documentation.routers.push(routerInfo);
                documentation.summary.totalRouters++;
            }
        });

        // Actualizar resumen
        documentation.summary.totalRoutes = documentation.routes.length;

        // Imprimir documentación formateada
        console.log('\n=== Documentación de la API ===\n');
        
        // Resumen
        console.log('📊 Resumen:');
        console.log(`- Total de Middlewares: ${documentation.summary.totalMiddlewares}`);
        console.log(`- Total de Routers: ${documentation.summary.totalRouters}`);
        console.log(`- Total de Rutas: ${documentation.summary.totalRoutes}\n`);

        // Middlewares
        console.log('🛠️ Middlewares:');
        documentation.middlewares.forEach(mw => {
            console.log(`- ${mw.name} (posición: ${mw.position})`);
        });
        console.log('');

        // Routers y sus rutas
        console.log('🌐 Routers y Rutas:');
        documentation.routers.forEach(router => {
            console.log(`\n📁 Router: ${router.mountPath}`);
            router.routes.forEach(route => {
                console.log(`  ${route.method} ${route.path}`);
            });
        });

        // Lista completa de rutas
        console.log('\n📝 Lista Completa de Rutas:');
        documentation.routes.forEach(route => {
            console.log(`${route.method} ${route.path}`);
        });

        return documentation;
    }

    generateMockFromSchema = (schema) => {
        const mockData = {};
        
        // Función para generar datos aleatorios según el tipo
        const generateRandomValue = (type) => {
            switch (type) {
                case 'string':
                    return 'string_' + Math.random().toString(36).substring(7);
                case 'number':
                    return Math.floor(Math.random() * 100);
                case 'boolean':
                    return Math.random() > 0.5;
                case 'date':
                    return new Date().toISOString();
                case 'array':
                    return [];
                case 'object':
                    return {};
                default:
                    return null;
            }
        };

        // Función para procesar el esquema
        const processSchema = (schema, path = '') => {
            if (!schema) return;

            // Si es un objeto
            if (schema.shape) {
                Object.entries(schema.shape).forEach(([key, value]) => {
                    const fullPath = path ? `${path}.${key}` : key;
                    mockData[key] = processSchema(value, fullPath);
                });
                return mockData;
            }

            // Si es un array
            if (schema.element) {
                return [processSchema(schema.element)];
            }

            // Si es un tipo primitivo
            if (schema._def) {
                const type = schema._def.typeName;
                return generateRandomValue(type);
            }

            return null;
        };

        return processSchema(schema);
    }
}

