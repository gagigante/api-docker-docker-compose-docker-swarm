import { ICreateContactDTO } from '@/dtos/ICreateContactDTO';
import { CreateContactUseCase } from '@/useCases/CreateContactUseCase';
import { DeleteContactUseCase } from '@/useCases/DeleteContactUseCase';
import { GetContactByIdUseCase } from '@/useCases/GetContactByIdUseCase';
import { GetContactsUseCase } from '@/useCases/GetContactsUseCase';
import { UpdateContactUseCase } from '@/useCases/UpdateContactUseCase';
import { Request, Response } from 'express';

export class ContactController {
  public async index(_: Request, response: Response): Promise<Response> {
    const getContactsUseCase = new GetContactsUseCase();

    const contacts = await getContactsUseCase.execute();

    return response.json(contacts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getContactById = new GetContactByIdUseCase();

    const contact = await getContactById.execute(Number(id));

    return response.json(contact);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone } = request.body as ICreateContactDTO;

    const createContactUseCase = new CreateContactUseCase();

    const contact = await createContactUseCase.execute({ name, email, phone });

    return response.json(contact);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone } = request.body as ICreateContactDTO;

    const updateContactUseCase = new UpdateContactUseCase();

    const contact = await updateContactUseCase.execute({ id: Number(id), name, email, phone });

    return response.json(contact);
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteContactUseCase = new DeleteContactUseCase();

    await deleteContactUseCase.execute(Number(id));

    return response.status(200).send();
  }
}