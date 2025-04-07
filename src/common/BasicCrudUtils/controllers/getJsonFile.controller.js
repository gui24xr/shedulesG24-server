import buildJsonApiTestCollection from "../utils/buildJsonApiTestCollection.js"

const getJsonFileController = ({apiName,entitiesList,fakeUsersEnabled}) => {
    return  (req, res) => {
        const jsonApiTestCollection = buildJsonApiTestCollection({
            apiName: apiName,
            hostUrl: req.hostUrl,
            baseUrl: req.baseUrl,
            entitiesList: entitiesList,
            fakeUsersEnabled: fakeUsersEnabled
        })
        const jsonBuffer = Buffer.from(jsonApiTestCollection)
        res.setHeader('Content-Disposition', `attachment; filename="${apiName}-collection.json"`);
        res.setHeader('Content-Type', 'application/json');
        res.send(jsonBuffer);
    }
}

export default getJsonFileController