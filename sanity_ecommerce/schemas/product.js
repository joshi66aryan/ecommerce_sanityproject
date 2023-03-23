export default {
    name:'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            titel: 'Slug',
            type: 'slug',  // custome type for unique type
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title : 'Price',
            type: 'number',

        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        }
    ]
}