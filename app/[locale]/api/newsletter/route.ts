import siteMetadata from '@/data/siteMetadata'
import { NewsletterAPI } from 'pliny/newsletter'

export const runtime = 'edge'

const handler = NewsletterAPI({
  provider: siteMetadata.newsletter?.provider || 'buttondown',
})

export { handler as GET, handler as POST }
