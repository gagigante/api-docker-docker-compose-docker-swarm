import { ICreateContactDTO } from '@/dtos/ICreateContactDTO';
import { IUpdateContactDTO } from '@/dtos/IUpdateContactDTO';
import { Contact } from '@/entities/Contact';

export interface IContactRepository {
  list(): Promise<Contact[]>;
  findById(id: number): Promise<Contact | undefined>;
  create(data: ICreateContactDTO): Contact;
  save(user: Contact): Promise<Contact>;
  update(data: IUpdateContactDTO): Promise<Contact>;
  delete(id: number): Promise<void>;
}