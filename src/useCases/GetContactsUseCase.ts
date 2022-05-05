import { Contact } from '@/entities/Contact';
import { AppError } from '@/errors/AppError';
import { ContactRepository } from '@/repositories/implementations/ContactRepository';
import { IContactRepository } from '@/repositories/models/IContactRepository';

export class GetContactsUseCase {
  private contactRepository: IContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  async execute(): Promise<Contact[]> {
    const contacts = await this.contactRepository.list();

    return contacts;
  }
}