class EmployeesController{
    constructor({employeesService,loggerManager}){
        this.employeesService = employeesService;
        this.loggerManager = loggerManager;
    }

    createEmployee = async (req,res) => {
        try{
            //Aca tenemos que por un middleware comprobar que eid pertenezca a owner para proteger datos
            const {eid:establishmentId} = req.params;
            const newEmployee = await this.employeesService.createEmployee({
                ownerId: req.user.authData.owner.id,
                employeeId: null, // Esto es si viene de la app de empleados
                establishmentId,
                payload: req.body
            })
         
           return res.status(201).json(newEmployee)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error creating employee', error);
            res.status(500).json({message: 'Error creating employee', error: error.message});
        }
    }

    getEmployeeById = async (req,res) => {
        try{
            const {eid:employeeId} = req.params;
            const employee = await this.employeesService.getEmployeeById(employeeId)
            res.status(200).json(employee)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting employee by id', error);
            res.status(500).json({message: 'Error getting employee by id', error: error.message});
        }
    } 

    
    getEmployeesByOwner = async(req,res,next)=>{
        try{
            const {id:ownerId} = req.user.authData.owner;
            const { eid:establishmentId} = req.query;
            console.log('AAAAAAAAAAA111: ', ownerId, establishmentId)
            const employees = await this.employeesService.getEmployeesByOwner({ownerId,establishmentId})
            return res.status(200).json(employees)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting employees establishment', error);
            next(error)
        }
    }
    
    
}

export default EmployeesController;
