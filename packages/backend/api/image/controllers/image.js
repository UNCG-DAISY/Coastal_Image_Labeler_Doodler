'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    createMany: async ctx => {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services.image.create(data, { files });
        } else {
            if (Array.isArray(ctx.request.body)) {
                //  if array, loop and return created content.  
                entity = []
                
                for (const entry of ctx.request.body) {
                    const data = await strapi.services.image.create(entry);
                    entity.push(data)
                }
            // return 'X array of content created';
            } else {
                entity = await strapi.services.image.create(ctx.request.body);
            }
            
        }
        return sanitizeEntity(entity, { model: strapi.models.image });

        
    }
};
