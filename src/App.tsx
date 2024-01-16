import { useQuery } from "@tanstack/react-query";
import { User } from "./interface/user.interface";
import { networkService } from "./services";
import UserSearch from "./user/user-search";

function App() {
  const {
    data: Users,
    isLoading: UsersLoading,
    isError: UsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => networkService.get<User[]>("/users"),
  });

  if (UsersLoading) return <div>Loading...</div>;
  if (UsersError) return <div>Error</div>;

  return (
    <div className="mx-auto w-4/6 mt-10">
      <p className="text-blue-600 text-2xl text-center my-4 font-serif font-semibold">
        Pick Users
      </p>
      <UserSearch users={Users} />
    </div>
  );
}

export default App;
