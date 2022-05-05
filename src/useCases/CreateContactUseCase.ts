import { Contact } from "@/entities/Contact";
import { ContactRepository } from "@/repositories/implementations/ContactRepository";
import { IContactRepository } from "@/repositories/models/IContactRepository";

interface IRequestDTO {
  name: string;
  email: string;
  phone: string;
}

export class CreateContactUseCase {
  private contactRepository: IContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  async execute({ 
    name,
    email,
    phone,
  }: IRequestDTO): Promise<Contact> {
    const contact = this.contactRepository.create({ name, email, phone });

    await this.contactRepository.save(contact);

    return contact;
  }
}