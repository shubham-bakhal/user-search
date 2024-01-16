import { User } from "../../interface/user.interface";
import CrossIcon from "../icons/cross.icon";

interface UserChipPorps {
  user: User;
  selected?: boolean;
  handleChipRemove: (removedUser: User) => void;
}

const UserChip: React.FC<UserChipPorps> = ({
  user,
  selected,
  handleChipRemove,
}) => {
  return (
    <div
      key={user.id}
      className={`bg-gray-200 m-1 h-8 pr-2 px-0 rounded-full flex items-center gap-1 text-gray-500 ${
        selected ? "border border-blue-500" : ""
      }`}
    >
      <img
        src={`https://source.boringavatars.com/beam/120/${
          user.name || ""
        }?square`}
        className="w-7 h-7 rounded-full"
      ></img>
      <span className="text-sm">{user.name} </span>
      <button onClick={() => handleChipRemove(user)} className="ml-1">
        <CrossIcon />
      </button>
    </div>
  );
};

export default UserChip;
