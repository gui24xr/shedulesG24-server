

export default class CompaniesService{
    constructor(companiesRepository,companySchema,logger){
        this.companiesRepository = companiesRepository;
        this.companySchema = companySchema;
        this.logger = logger || console;
    }
    
    createCompany = async(companyData)=>{
        try{
            
            console.log('companyData',companyData)
            //const validateCompanyData = this.companySchema.pick({companyCode:true,email:true}).safeParse(companyData)
            //if(!validateCompanyData.success) throw new Error('Datos de la empresa inválidos en la creacion basica.');
            const newCompany = new this.companiesRepository(companyData);
            await newCompany.save();
            return newCompany;
        }catch(error){
            this.logger.error("Error creating company", error);
            throw error;
        }
    }
}