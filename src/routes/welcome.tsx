import Login from "@/features/login/login";
import ServerInfo from "@/features/server-info/server-info";

const WelcomePage = () => {
  return (
    <main className="h-screen">
      <div className="container flex flex-col gap-4 h-full py-8">
        <ServerInfo />
        <Login />
      </div>
    </main>
  );
};

export default WelcomePage;
