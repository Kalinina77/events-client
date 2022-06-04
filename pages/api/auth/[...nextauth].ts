import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";


const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',

      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) =>  NextAuth(req, res, options);


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    console.log(session);

    context.res.setHeader("location", "/auth/new-account");

    context.res.statusCode = 302;

    context.res.end();
  }

  return { props: {} };
};
