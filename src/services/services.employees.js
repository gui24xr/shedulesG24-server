class EmployeesService{
    constructor({employeesRepository,profilesRepository,workProfileDataRepository,establishmentsRepository,dbTransactionsService,loggerManager=null}){
        this.employeesRepository = employeesRepository;
        this.profilesRepository = profilesRepository;
        this.workProfileDataRepository = workProfileDataRepository;     
        this.establishmentsRepository = establishmentsRepository;
        this.dbTransactionsService = dbTransactionsService;
        this.loggerManager = loggerManager;
    }

 

    createEmployee = async ({ownerId,employeeId,establishmentId,payload}) => {
        const session = await this.dbTransactionsService.startSession();
        try{
            console.log('ownerId: ',ownerId)
            console.log('employeeId: ',employeeId)
            console.log('establishmentId: ',establishmentId)
            console.log('payload: ',payload)
            this.loggerManager && this.loggerManager.debug(
                'authData: ',{ownerId: ownerId, employeeId:employeeId},
                'establishmentId: ',establishmentId,
                'payload: ',payload)    
            /*  employeeData = {
                establishmentId: 'valor',
                employeeRecord: 'valor' | null,-->>Si es null lo asigna el sistema.
                profile: {
                    phoneNumber: 'valor',
                    email: 'valor',
                    firstName: 'valor', 
                    lastName: 'valor',
                    profilePicture: 'valor'},
                }
                workProfileData: {
                    displayName: 'valor',
                    type: 'valor',
                    functions: ['valor1','valor2'],
                    phoneNumber: 'valor',
                    email: 'valor',
                    profilePicture: 'valor',
                }
              }
            */
            //validar datos
          
            const foundedEstablishment = await this.establishmentsRepository.findById(establishmentId).populate('employees')
            if (!foundedEstablishment) throw new Error('Establecimiento no encontrado u operacion no autorizada...')
            if (ownerId){
                  //proteger recursos
                if (foundedEstablishment.ownerId.toString() !== ownerId.toString()) throw new Error('Establecimiento no encontrado u operacion no autorizada...')
            }
            if (employeeId){
                const foundedEmployee = foundedEstablishment.employees.find(employee => employee._id.toString() === employeeId.toString())
                if (!foundedEmployee) throw new Error('Empleado no encontrado u operacion no autorizada...')
            }
            
            const getEmployeeRecord = async () =>{
                const employees = await this.employeesRepository.find({establishmentId:establishmentId})
                const employeeRecord = employees.length + 1
                return 'LEG' + employeeRecord.toString()
            }
            

            const employeeData = {
                establishmentId:establishmentId,
                tenantsAppUserId:null,
                employeeRecord: ('LEG' + payload.employeeRecord.toString()) || (await getEmployeeRecord()),
                status: 'active',
            }

            await session.startTransaction();
            const [newEmployee] = await this.employeesRepository.create([employeeData],{session})

            if (!newEmployee) throw new Error('Problemas al crear el empleado...')
            const profileData = payload.profile ? {employeeId:newEmployee.id,...payload.profile} : {employeeId:newEmployee.id}
            const workProfileData = payload.workProfileData ? {employeeId:newEmployee.id,...payload.workProfileData} : {employeeId:newEmployee.id}
            
            await this.profilesRepository.create([profileData],{session})
            await this.workProfileDataRepository.create([workProfileData],{session})
            await session.commitTransaction();
            return await this.getEmployeeById(newEmployee.id)
        }catch(error){
            await session.abortTransaction();
            this.loggerManager && this.loggerManager.error('Error creating/updating owner', error);
            throw error;
        }finally{
            await session.endSession();
        }
    }

    getEmployeeById = async (employeeId) => {
        try{
            const employee = await this.employeesRepository.findById(employeeId).populate('profile').populate('workProfileData').populate('establishment')
            if (!employee) throw new Error('Empleado no encontrado...')
            return this.#getEmployeeDTO(employee)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting employee by id', error);
            throw error;
        }
    }

    getEmployeesByOwner = async({ownerId, establishmentId})=>{
        try{
            const filter = establishmentId ? {establishmentId} : {}
            const employees = await this.employeesRepository.find(filter)
            .populate({ path: 'establishment',match: { ownerId: ownerId },})
            .populate('profile')
            .populate('workProfileData')
            .populate('establishment')

            const employeesOfOwner = employees.filter(employee => employee.establishment.ownerId.toString() === ownerId.toString())
            return employeesOfOwner.map(employee => this.#getEmployeeDTO(employee))
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting employees by owner', error);
            throw error;
        }
    }

   
    getEmployeesByEstablishment = async(establishmentId)=>{
        try{
            //Ojoa ca creo el resucrso no esta protegido del todo xno pedir el ownr
            const employees = await this.employeesRepository.find({establishmentId:establishmentId}).populate('profile').populate('workProfileData')
            return employees.map(employee => this.#getEmployeeDTO(employee))
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting employees by establishment', error);
            throw error;
        }
    }


    #getEmployeeDTO = (employee)=>{

        return {
            id:employee.id,
            employeeRecord:employee.employeeRecord,
            status:employee.status,
            profile:{
                id:employee.profile.id,
                firstName:employee.profile.firstName,
                lastName:employee.profile.lastName,
                phoneNumber:employee.profile.phoneNumber,
                email:employee.profile.email,
                profilePicture:employee.profile.profilePicture
            },
            workProfileData:{
                id:employee.workProfileData.id,
                displayName:employee.workProfileData.displayName,
                type:employee.workProfileData.type,
                functions:employee.workProfileData.functions,
                phoneNumber:employee.workProfileData.phoneNumber,
                email:employee.workProfileData.email,
                profilePicture:employee.workProfileData.profilePicture,
            },
            establishment:{
                name:employee.establishment.name,
            },
            createdAt:employee.createdAt,
            updatedAt:employee.updatedAt,            
        }
    }
}

export default EmployeesService;
