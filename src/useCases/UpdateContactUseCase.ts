import { Contact } from "@/entities/Contact";
import { AppError } from "@/errors/AppError";
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

  constructor() {
    this.contactRepository = new ContactRepository();
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

    return updatedContact;
  }
}