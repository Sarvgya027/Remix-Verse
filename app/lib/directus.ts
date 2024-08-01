import { authentication, createDirectus, rest } from "@directus/sdk"

const directus = createDirectus(process.env.DIRECTUS_URL || '').with(rest()).with(authentication('json'));

export default directus;