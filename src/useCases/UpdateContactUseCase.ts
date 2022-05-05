import { Contact } from "@/entities/Contact";
import { AppError } from "@/errors/AppError";
import RedisCacheProvider from "@/providers/CacheProvider/implementations/RedisCacheProvider";
import ICacheProvider from "@/providers/CacheProvider/models/ICacheProvider";
import { ContactRepository } from "@/repositories/implementations/ContactRepository";
import { IContactRepository } from "@/repositories/models/IContactRepository";

interface IRequestDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export class UpdateContactUseCase {
  private contactRepository: IContactRepository;

  private cacheProvider: ICacheProvider;

  constructor() {
    this.contactRepository = new ContactRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  async execute({ 
    id,
    name,
    email,
    phone,
  }: IRequestDTO): Promise<Contact> {
    if (isNaN(id)) {
      throw new AppError('Invalid ID');
    }

    const contact = await this.contactRepository.findById(id);

    if (!contact) {
      throw new AppError('Contact was not found');
    }

    const updatedContact = await this.contactRepository.update({ id, name, email, phone });

    await this.cacheProvider.invalidade('contacts');
    await this.cacheProvider.invalidadePrefix('contacts');

    return updatedContact;
  }
}