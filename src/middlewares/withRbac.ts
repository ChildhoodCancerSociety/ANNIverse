import { NextApiRequest, NextApiResponse } from 'next';
import rbac from './rbac';

const withRbac = (role: string) => (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await rbac(role)(req, res, async () => {
      await handler(req, res);
    });
  };
};

export default withRbac;
