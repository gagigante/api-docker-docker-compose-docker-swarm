import { Repository } from 'typeorm';

import { appDataSource } from '@/database/data-source';
import { IContactRepository } from '../models/IContactRepository';
import { Contact } from '@/entities/Contact';
import { ICreateContactDTO } from '@/dtos/ICreateContactDTO';
import { IUpdateContactDTO } from '@/dtos/IUpdateContactDTO';

export class ContactRepository implements IContactRepository {
  private repository: Repository<Contact>;

  constructor() {
    this.repository = appDataSource.getRepository(Contact);
  }

  public async list(): Promise<Contact[]> {
    const contacts = await this.repository.find();
    
    return contacts;
  }

  public async findById(id: number): Promise<Contact | undefined> {
    const contact = await this.repository.findOneBy({ id });

    return contact;
  }

  public create(data: ICreateContactDTO): Contact {
    const contact = this.repository.create(data);

    return contact;
  }

  public async save(data: Contact): Promise<Contact> {
    const contact = this.repository.save(data);

    return contact;
  }

  public async update(data: IUpdateContactDTO): Promise<Contact> {
    const contact = this.repository.save(data);

    return contact;
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
