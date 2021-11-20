import { IEmailUser } from "src/shared/interfaces";
import { UserEmail } from "../models";

export class NotificationService {

    async add(emailUser: IEmailUser) {
        const existingEmaiUser = await UserEmail.findOne({
            attributes: ['useremailid'],
            where: {
                deletedat: null,
                email: emailUser.email
            }
        });
        
        if (existingEmaiUser === null) {
            return await UserEmail.create(emailUser);
        } else {
            return existingEmaiUser;
        }
    }

    async find(email: string) {
        return await UserEmail.findOne({
            attributes: ['useremailid'],
            where: {
                deletedat: null,
                email: email
            }
        });
    }

}