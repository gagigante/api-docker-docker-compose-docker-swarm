import { AppError } from '@/errors/AppError';
import RedisCacheProvider from '@/providers/CacheProvider/implementations/RedisCacheProvider';
import ICacheProvider from '@/providers/CacheProvider/models/ICacheProvider';
import { ContactRepository } from '@/repositories/implementations/ContactRepository';
import { IContactRepository } from '@/repositories/models/IContactRepository';

export class DeleteContactUseCase {
  private contactRepository: IContactRepository;

  private cacheProvider: ICacheProvider;

  constructor() {
    this.contactRepository = new ContactRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  async execute(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new AppError('Invalid ID');
    }

    const contact = await this.contactRepository.findById(id);

    if (!contact) {
      throw new AppError('Contact was not found');
    }

    await this.contactRepository.delete(contact.id);

    await this.cacheProvider.invalidade('contacts');
    await this.cacheProvider.invalidadePrefix('contacts');
  }
}