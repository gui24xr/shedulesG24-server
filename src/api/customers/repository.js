import { Customer } from "../../database/models/models.customer.js";

export class CustomersRepository {
  async createCustomer({
    dni,
    customerNumber,
    firstName,
    lastName,
    phoneNumber,
    email,
  }) {
    try {
      const createdCustomer = await Customer.create({
        dni,
        customerNumber,
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

  async getCustomer(customerId) {
    try {
      const foundCustomer = await Customer.findOne({_id:customerId}).lean();
      if (!foundCustomer) throw new Error("Customer inexistente.");
      return this.getMappedCustomer(foundCustomer);
    } catch (error) {
      throw error;
    }
  }

  async getCustomers() {
    try {
      const customersList = await Customer.find().lean();
      return customersList.map((customerItem) =>
        this.getMappedCustomer(customerItem)
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteCustomers(customerIdList) {
    try {
      const result = await Customer.deleteMany({
        _id: { $in: customerIdList }
      })
      return result.deletedCount
    } catch (error) {
      throw error;
    }
  }

  async updateCustomer(customerId) {
    try {
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


