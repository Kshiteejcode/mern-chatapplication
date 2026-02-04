import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-full w-80 md:w-64">
      <SearchInput />
      <div className="divider my-2 px-3"></div>
      <div className="flex-1 overflow-auto">
        <Conversations />
      </div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
