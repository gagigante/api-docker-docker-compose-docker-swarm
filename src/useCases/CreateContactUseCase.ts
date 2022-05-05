import { Contact } from "@/entities/Contact";
import RedisCacheProvider from "@/providers/CacheProvider/implementations/RedisCacheProvider";
import ICacheProvider from "@/providers/CacheProvider/models/ICacheProvider";
import { ContactRepository } from "@/repositories/implementations/ContactRepository";
import { IContactRepository } from "@/repositories/models/IContactRepository";

interface IRequestDTO {
  name: string;
  email: string;
  phone: string;
}

export class CreateContactUseCase {
  private contactRepository: IContactRepository;

  private cacheProvider: ICacheProvider;

  constructor() {
    this.contactRepository = new ContactRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  async execute({ 
    name,
    email,
    phone,
  }: IRequestDTO): Promise<Contact> {
    const contact = this.contactRepository.create({ name, email, phone });

    await this.contactRepository.save(contact);

    await this.cacheProvider.invalidade('contacts');

    return contact;
  }
}