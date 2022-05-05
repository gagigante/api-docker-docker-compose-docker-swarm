import { Contact } from '@/entities/Contact';
import { AppError } from '@/errors/AppError';
import RedisCacheProvider from '@/providers/CacheProvider/implementations/RedisCacheProvider';
import ICacheProvider from '@/providers/CacheProvider/models/ICacheProvider';
import { ContactRepository } from '@/repositories/implementations/ContactRepository';
import { IContactRepository } from '@/repositories/models/IContactRepository';

export class GetContactsUseCase {
  private contactRepository: IContactRepository;

  private cacheProvider: ICacheProvider;

  constructor() {
    this.contactRepository = new ContactRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  async execute(): Promise<Contact[]> {
    let contacts = await this.cacheProvider.recover<Contact[]>(
      'contacts',
    );

    if (!contacts) {
      contacts = await this.contactRepository.list();

      await this.cacheProvider.save('contacts', contacts);
    }

    return contacts;
  }
}