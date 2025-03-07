import { Customer } from "../../database/models/models.customer.js";

export class CustomersRepository {
  
  #populatedObject = {path:'companyId',select: 'profile.name profile.email'}
 
  async createCustomer({
    dni,
    customerNumber,
    companyId,
    firstName,
    lastName,
    phoneNumber,
    email,
  }) {
    try {
      const createdCustomer = await Customer.create({
        dni,
        customerNumber,
        companyId: companyId || null,
        firstName,
        lastName,
        phoneNumber,
        email,
      });
      return this.getMappedCustomer(createdCustomer.toObject());
    } catch (error) {
      throw error
    }
  }

  async getCustomerById(customerId) {
    try {
      const foundCustomer = await Customer.findOne({_id:customerId}).populate(this.#populatedObject).lean();
      if (!foundCustomer) throw new Error("Customer inexistente.");
      return this.getMappedCustomer(foundCustomer);
    } catch (error) {
      throw error;
    }
  }

  async getCustomers({dni,companyId,firstName,lastName,email,phoneNumber}) {
    try {
      const filter = {}
      if (dni) filter.dni = dni
      if (companyId)  filter.companyId = companyId
      if (firstName) filter.firstName = firstName
      if (lastName)  filter.lastName = lastName
      if (email) filter.email = email
      if (phoneNumber) filter.phoneNumber = phoneNumber

    
      const customersList = await Customer.find(filter).populate(this.#populatedObject).lean();
      return customersList.map((customerItem) =>
        this.getMappedCustomer(customerItem)
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteCustomers(idsList) {
    try {
      const result = await Customer.deleteMany({
        _id: { $in: idsList }
      })
      if (result.deletedCount < idsList.length) throw new Error("Uno o mas registros no han sido borrados...")
      return result.deletedCount
    } catch (error) {
      throw error;
    }
  }

  async updateCustomerData(customerId,{dni,firstName,lastName,phoneNumber,email}) {
    try {
      const updateData = {}
      if (dni) updateData.dni = dni
      if (firstName) updateData.firstName = firstName
      if (lastName) updateData.lastName = lastName
      if(phoneNumber) updateData.phoneNumber = phoneNumber
      if (email) updateData.email = email

      const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        { $set: {...updateData}},
        {new: true}
      ).populate(this.#populatedObject)
      if (!updatedCustomer) throw new Error('No existe el registro que se intenta actualizar...')
      return (this.getMappedCustomer(updatedCustomer.toObject()))
    } catch (error) {
      throw error;
    }
  }

  

  getMappedCustomer(customer) {
    const formatedId =customer._id.toString()
    
    delete customer._id,
    delete customer.__v
    return {
       id: formatedId,
      ...customer,
    };
  }
}


