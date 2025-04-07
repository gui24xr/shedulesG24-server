
export const generateSwaggerSchemas = (mongooseModel) => {
    const schemaDefinition = {};
    const requiredFields = [];
    const postSchemaDefinition = {};
    const postRequiredFields = [];

    Object.entries(mongooseModel.schema.paths).forEach(([key, path]) => {
        if (key === "__v") return; // Omitir __v

        let type;
        let example;

        switch (path.instance) {
            case "ObjectID":
                type = "string";
                example = "65b9ef7f7cd3a72c1a3f2a01"; // Ejemplo de ObjectId
                break;
            case "Array":
                type = "array";
                example = ["valor1", "valor2"];
                break;
            case "Date":
                type = "string";
                example = "2024-03-25T12:00:00Z"; // Formato ISO 8601
                break;
            case "Number":
                type = "number";
                example = 42;
                break;
            case "Boolean":
                type = "boolean";
                example = true;
                break;
            default:
                type = "string";
                example = "Ejemplo de texto";
        }

        // Esquema completo (para GET, respuestas, etc.)
        schemaDefinition[key] = { type, example };
        if (path.isRequired) {
            requiredFields.push(key);
        }

        // Esquema para POST (excluir timestamps y campos autogenerados)
        if (!["createdAt", "updatedAt", "_id"].includes(key)) {
            postSchemaDefinition[key] = { type, example };
            if (path.isRequired) {
                postRequiredFields.push(key);
            }
        }
    });

    return {
        fullSchema: {
            type: "object",
            properties: schemaDefinition,
            required: requiredFields.length ? requiredFields : undefined
        },
        postSchema: {
            type: "object",
            properties: postSchemaDefinition,
            required: postRequiredFields.length ? postRequiredFields : undefined
        }
    };
};


      
export const generateSwaggerSchemaWithExamples = (mongooseModel) => {
    const schemaDefinition = {};
    
    Object.entries(mongooseModel.schema.paths).forEach(([key, path]) => {
        if (key === "_id" || key === "__v") return; // Omitir _id y __v

        let type;
        let example = null;  // Puedes establecer valores mockeados aquí

        if (path.instance === "ObjectID") {
            type = "string";
            example = "605c72ef1532072f32b64f2b"; // Mocked ObjectId
        } else if (path.instance === "Array") {
            type = "array";
            example = ["string1", "string2"];  // Mocked array
        } else if (path.instance === "String") {
            type = "string";
            example = "John Doe";  // Mocked string
        } else if (path.instance === "Number") {
            type = "integer";
            example = 42;  // Mocked integer
        } else if (path.instance === "Boolean") {
            type = "boolean";
            example = true;  // Mocked boolean
        } else {
            type = path.instance.toLowerCase();
        }

        schemaDefinition[key] = { 
            type,
            example // Aquí se agrega el valor mockeado
        };
    });

    return {
        type: "object",
        properties: schemaDefinition
    };
};



export const mockedMoongoseModel = (mongooseModel) => {
    
    console.log('mongoosemodel mockeado: ', generateSwaggerSchemaWithExamples(mongooseModel))
}

