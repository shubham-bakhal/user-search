import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { User } from "../interface/user.interface";
import UserChip from "../shared/components/user-chip.component";
import SearchList from "./user-search-list.component";

interface UserSearchProps {
  users: User[];
}

const UserSearch: React.FC<UserSearchProps> = ({ users }) => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toBeRemoved, setToBeRemoved] = useState<User | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          !chips.includes(user) &&
          user.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, chips, users]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedItemIndex(null);
  };

  const handleUserClick = (user: User) => {
    setChips((prevChips) => [...prevChips, user]);
    setInputValue("");
    setToBeRemoved(null);
    setSelectedItemIndex(null);
    inputRef.current?.focus();
  };

  const handleChipRemove = (removedUser: User) => {
    setChips((prevChips) => prevChips.filter((user) => user !== removedUser));
    setSelectedItemIndex(null);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      setSelectedItemIndex(null);
      const lastChip = chips[chips.length - 1];
      if (toBeRemoved === lastChip) {
        if (lastChip) {
          handleChipRemove(lastChip);
          setToBeRemoved(null);
        }
      } else {
        setToBeRemoved(lastChip);
      }
    } else if (e.key === "ArrowDown") {
      setSelectedItemIndex((prevIndex) =>
        prevIndex === null
          ? 0
          : Math.min(prevIndex + 1, filteredUsers.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedItemIndex((prevIndex) =>
        prevIndex === null
          ? filteredUsers.length - 1
          : Math.max(prevIndex - 1, 0)
      );
    } else if (e.key === "Enter" && selectedItemIndex !== null) {
      handleUserClick(filteredUsers[selectedItemIndex]);
      setSelectedItemIndex(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center border-b-2 border-blue-600">
        {chips.map((user) => (
          <UserChip
            user={user}
            handleChipRemove={handleChipRemove}
            selected={toBeRemoved === user}
          />
        ))}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Add new user"
            className="p-2 rounded outline-none ring-0 focus:ring-0 focus:border-blue-600"
          />
          {showDropdown && (
            <SearchList
              users={filteredUsers}
              handleUserClick={handleUserClick}
              selectedItemIndex={selectedItemIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
