import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LoginIcon from "@mui/icons-material/Login";
import { OverridableComponent } from "@mui/types";
import { SvgIconTypeMap } from "@mui/material";

const defaultAvatar = "./../images/defaultAvatar.png";

type TdropdownItem = {
  onClick: () => void;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  title: string;
};

interface IDropdownItem {
  item: TdropdownItem;
}

const DropdownItem: React.FC<IDropdownItem> = ({ item }) => (
  <button className="text-gray-700 flex items-center" onClick={item.onClick}>
    {item.icon}
    <p className="ml-2">{item.title}</p>
  </button>
);

interface IDropdownContent {
  dropdownItems: TdropdownItem[];
}

const DropdownContent: React.FC<IDropdownContent> = ({ dropdownItems }) => {
  return (
    <div className="bg-white w-full absolute p-4 shadow-lg rounded-lg mt-2">
      {dropdownItems.map((item, i) => {
        return (
          <div className="mt-1" key={i}>
            <DropdownItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

const AvatarDropdown: React.FC = () => {
  const node = useRef<HTMLDivElement>(null);
  const auth = useContext(AuthContext);
  const { authState } = auth;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownItems = [
    {
      title: "Log Out",
      icon: LoginIcon,
      onClick: auth.logout,
    },
  ];

  const handleClick = (e: MouseEvent) => {
    if (!node.current!.contains(e.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={node}>
      <button
        // ref={node} // TODO recheck the dropdown logic
        className="flex rounded-full items-center py-2 px-3 bg-gradient focus:outline-none shadow-lg"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={authState.userInfo.avatar || defaultAvatar}
          className="rounded-full w-6 border-2 border-white"
          alt="Avatar"
        />
        <div className="px-3">
          <p className="text-white">{authState.userInfo.firstName}</p>
        </div>
        <div className="mr-1 text-white">
          <ArrowDropDownIcon />
        </div>
      </button>

      {dropdownOpen && (
        <div className="relative">
          <DropdownContent dropdownItems={dropdownItems} />
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
