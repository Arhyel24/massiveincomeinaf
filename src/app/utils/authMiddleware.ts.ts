import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const authMiddleware =
  (handler: (arg0: NextApiRequest, arg1: NextApiResponse) => any) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
      return res
        .status(401)
        .json({ message: "Please log im or contact administrator" });
    }

    return handler(req, res);
  };

export default authMiddleware;
