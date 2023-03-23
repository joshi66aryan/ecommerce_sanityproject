import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
export const client = createClient({
    projectId: '1f8lkni9',
    dataset: 'production',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)