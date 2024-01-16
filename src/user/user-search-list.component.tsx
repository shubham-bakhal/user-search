import { User } from "../interface/user.interface";

interface SearchListProps {
  users: User[];
  selectedItemIndex: number | null;
  handleUserClick: (user: User) => void;
}

const SearchList: React.FC<SearchListProps> = ({
  users,
  selectedItemIndex,
  handleUserClick,
}) => {
  return (
    <ul className="absolute left-0 z-10 bg-white w-max mt-1 border border-gray-300 rounded max-h-72 overflow-y-auto shadow-2xl">
      {users.map((user, index) => (
        <li
          key={user.id}
          onClick={() => handleUserClick(user)}
          className={`py-2 px-4 grid grid-cols-7 gap-4 hover:bg-gray-100 ${
            index === selectedItemIndex ? "bg-gray-200" : ""
          }`}
        >
          <div className="col-span-4 flex items-center gap-2">
            <img
              src={`https://source.boringavatars.com/beam/120/${
                user.name || ""
              }?square`}
              className="w-7 h-7 rounded-full"
            ></img>
            <p className="">{user.name} </p>
          </div>
          <p className="col-span-3 text-xs text-gray-500">{user.email}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
