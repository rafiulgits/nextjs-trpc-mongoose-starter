import type { CreateNextContextOptions } from '@trpc/server/adapters/next';


export interface CreateInnerContextOptions
  extends Partial<CreateNextContextOptions> {
  locale: string;
}

export async function createInnerTRPCContext(opts?: CreateInnerContextOptions) {
  return {
    ...opts,
  };
}

export const createTRPCContext = async (opts?: CreateNextContextOptions) => {
  const acceptLanguage = opts?.req.headers['accept-language'];
  const locale = acceptLanguage?.includes('en') ? 'en' : 'sv';


  const innerContext = await createInnerTRPCContext({
    req: opts?.req,
    locale,
  });

  return {
    ...innerContext,
    req: opts?.req,
  };
};