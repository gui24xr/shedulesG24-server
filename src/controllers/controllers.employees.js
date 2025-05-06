class EmployeesController{
    constructor({employeesService,loggerManager}){
        this.employeesService = employeesService;
        this.loggerManager = loggerManager;
    }

    createEmployee = async (req,res,next) => {
        try{    
            const {eid:establishmentId} = req.params;
            const newEmployee = await this.employeesService.createEmployee({
                ownerId: req.user.owner.id,
                employeeId: null, // Esto es si viene de la app de empleados
                establishmentId,
                payload: req.body
            })
           return res.status(201).json(newEmployee)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error creating employee', error);
            next(error)
        }
    }

    getEmployeeById = async (req,res,next) => {
        try{
            const {eid:employeeId} = req.params;
            const employee = await this.employeesService.getEmployeeById(employeeId)
            res.status(200).json(employee)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting employee by id', error);
            next(error)
        }
    } 

    
    getEmployeesByOwner = async(req,res,next)=>{
        try{
            const {id:ownerId} = req.user.owner;
            const { eid:establishmentId} = req.query;
            const employees = await this.employeesService.getEmployeesByOwner({ownerId,establishmentId})
            return res.status(200).json(employees)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting employees establishment', error);
            next(error)
        }
    }
    
    
}

export default EmployeesController;
