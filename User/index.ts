import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import * as Joi from '@hapi/joi';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('HTTP trigger function processed a request.');

    const userSchema = Joi.object({
        LastName: Joi.string().alphanum().max(20).required(),
        FirstName: Joi.string().alphanum().min(1).max(20),
        BirthYear: Joi.number().integer().min(1900).max(2013)
    });

    const name = (req.query.name || (req.body && req.body.name));

    try {
            const value = await userSchema.validateAsync(req.body);
    } catch (error) {
        context.res = {
            status: 400,
            body: {
                message : error.message
            }
        };
    }
};

export default httpTrigger;
