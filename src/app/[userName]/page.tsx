import { PageProps } from "@/.next/types/app/layout";

type CustomPageProps = PageProps & {
  params: { userName: string };
};

const otherUsers = async ({params}: CustomPageProps) => {
  const {userName} = params;

  return <div>current in {userName}  profile</div>
};

export default otherUsers;