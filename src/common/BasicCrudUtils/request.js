


const makeRequestGroup = ({validateSchema,model}) =>{

    const postRequest = async (req, res, next) => {
        try {
            validateSchema && validateSchema.createSchema.parse(req.body)
            const created = await model.create({ ...req.body })
            return res.status(201).json({ ...created.toObject() })
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor.' })
        }
    }

    const getByIdRequest = async (req, res, next) => {
        try {
            const founded = await model.findById(req.params.id).exec()
            if (!founded) return res.status(404).json({ message: 'ID no existe.' })
            return res.status(200).json({ ...founded.toObject() })
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor.' })
        }
    }

    const getByQueryRequest = async (req, res, next) => async (req, res, next) => {
        try {
            validateSchema && validateSchema.querySchema.parse(req.query)
            const founded = await model.find(req.query).exec()
            if (founded.length > 0) {
                return res.status(200).json(founded);
            } else {
                return res.status(404).json({ message: `No se encontraron ${item.collectionName}.` })
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor.' })
        }
    }

    const putByIdRequest = async (req, res, next) => {
        try {
            validateSchema.validateSchema.updateSchema.parse(req.body)
            const updated = await model.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true }).exec()
            return res.status(200).json({ ...updated.toObject() })
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor.' })
        }
    }

    const deleteByIdListRequest = async (req, res, next) => {
        try {
            const ids = req.query.ids?.split(",");
            const result = await model.deleteMany({
                _id: { $in: ids }
            })
            if (result.deletedCount < ids.length) throw new Error("Uno o mas registros no han sido borrados...")
            return res.status(204)
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor.' })
        }
    }

    return {
        postRequest,
        getByIdRequest,
        getByQueryRequest,
        putByIdRequest,
        deleteByIdListRequest   
    }
}


export default makeRequestGroup