const buildJsonApiTestCollection = ({ apiName, hostUrl, baseUrl, entitiesList, fakeUsersEnabled }) => {
    
    //Aca validar los datos de entrada.
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

    entitiesList.forEach(collectionItem => {
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

   //--------------------------------------------------------------
        const collectionFakeUsers = {
            name: 'Fake Users',
            item:[
                {
                    name: 'Register Fake User',
                    request: {
                        method: 'POST',
                        url: `${hostUrl}${baseUrl}/fake-users/register`
                    }
                },
                {
                    name: 'Login Fake User',
                    request: {
                        method: 'POST',
                        url: `${hostUrl}${baseUrl}/fake-users/login`
                    }
                }
            ]
        }
   //--------------------------------------------------------------
        if (fakeUsersEnabled == true) {
            apiRequestsCollection.item.push(collectionFakeUsers)
        }
        
        return JSON.stringify(apiRequestsCollection, null, 2)
}




export default buildJsonApiTestCollection