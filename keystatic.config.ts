import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: process.env.NODE_ENV === 'development' ? 'local' : 'github',
    repo: {
      owner: 'itsmeedooo',
      name: 'idolaaudio-website'
    }
  },
  ui: {
    brand: { name: 'Idola Audio & CCTV CMS' },
  },
  collections: {
    faq: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'src/content/faq/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({
          name: {
            label: 'Pertanyaan',
            description: 'Contoh: Apakah mengirim dari area jawa?'
          },
          slug: {
            label: 'Slug',
            description: 'Contoh: apakah-mengirim-dari-area-jawa'
          }
        }),
        answer: fields.text({ label: 'Jawaban', multiline: true, description: 'Contoh: Ya, kami melayani pengiriman ke seluruh Indonesia.' }),
      },
    }),
    portfolio: collection({
      label: 'Portfolio',
      slugField: 'title',
      path: 'src/content/portfolio/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Judul Portfolio',
            description: 'Contoh: Premium CCTV'
          },
          slug: {
            label: 'Slug',
            description: 'Contoh: premium-cctv'
          }
        }),
        category: fields.text({ label: 'Kategori (e.g., Premium CCTV)' }),
        image: fields.image({
          label: 'Gambar',
          directory: 'public/images/portfolio',
          publicPath: '/images/portfolio/'
        }),
      },
    }),
  },
});