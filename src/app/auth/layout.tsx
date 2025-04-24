import { Card } from "@mui/joy";

const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-full flex-1 bg-sky-900 flex items-center p-4">
        <Card className="w-full md:w-1/2 lg:w-1/3 bg-white h-auto">
          {children}
        </Card>
      </div>
    </div>
  );
};

export default AuthPageLayout;