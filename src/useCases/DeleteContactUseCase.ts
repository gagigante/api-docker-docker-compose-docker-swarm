import { AppError } from '@/errors/AppError';
import { ContactRepository } from '@/repositories/implementations/ContactRepository';
import { IContactRepository } from '@/repositories/models/IContactRepository';

export class DeleteContactUseCase {
  private contactRepository: IContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  async execute(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new AppError('Invalid ID');
    }

    const contact = await this.contactRepository.findById(id);

    if (!contact) {
      throw new AppError('Contact was not found');
    }

    return this.contactRepository.delete(contact.id);
  }
}