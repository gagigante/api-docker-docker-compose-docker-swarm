import { Contact } from '@/entities/Contact';
import { AppError } from '@/errors/AppError';
import RedisCacheProvider from '@/providers/CacheProvider/implementations/RedisCacheProvider';
import ICacheProvider from '@/providers/CacheProvider/models/ICacheProvider';
import { ContactRepository } from '@/repositories/implementations/ContactRepository';
import { IContactRepository } from '@/repositories/models/IContactRepository';

export class GetContactByIdUseCase {
  private contactRepository: IContactRepository;

  private cacheProvider: ICacheProvider;

  constructor() {
    this.contactRepository = new ContactRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  async execute(id: number): Promise<Contact> {
    if (isNaN(id)) {
      throw new AppError('Invalid ID');
    }

    let contact = await this.cacheProvider.recover<Contact>(
      `contacts:${id}`,
    );

    if (!contact) {
      contact = await this.contactRepository.findById(id);

      if (!contact) {
        throw new AppError('Contact was not found');
      }

      await this.cacheProvider.save(`contacts:${id}`, contact);
    }
    
    return contact;
  }
}