import { SiteClient } from 'datocms-client';

export default async function requestReceiver(request, response) {
  if (request.method == 'POST') {
    const TOKEN = process.env.NEXT_PUBLIC_DATOCMS_FULL_API_KEY;
    const client = new SiteClient(TOKEN);

    const createdRegister = await client.items.create({
      itemType: '968404', //ID of the model created on DatoCMS
      ...request.body
    });

    response.json({
      createdRegister: createdRegister
    });
  }
}