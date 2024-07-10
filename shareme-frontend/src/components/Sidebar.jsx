import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

import logo from "../assets/pictahub.png";
import { categories } from "../utils/data";

const Sidebar = ({ user, closeToggle }) => {
	const handleCloseSidebar = () => {
		if (closeToggle) closeToggle(false);
	};
	const isNotActiveStyle =
		"flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
	const isActiveStyle =
		"flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

	return (
		<div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210  hide-scrollbar">
			<div className="flex flex-col ">
				<Link
					to="/"
					className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
					onClick={handleCloseSidebar}
				>
					<img
						src={logo}
						alt="logo"
						className="w-full"
					/>
				</Link>
				<div className="flex flex-col gap-5">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? isActiveStyle : isNotActiveStyle
						}
						onClick={handleCloseSidebar}
					>
						<RiHomeFill />
						Home
					</NavLink>
					<h3 className="mt-2 px-5 text-base 2xl:text-xl bg-slate-50 font-bold py-4">
						Discover categories
					</h3>
					{categories
						.slice(0, categories.length - 1)
						.map((category) => (
							<NavLink
								to={`/category/${category.name}`}
								className={({ isActive }) =>
									isActive ? isActiveStyle : isNotActiveStyle
								}
								onClick={handleCloseSidebar}
								key={category.name}
							>
								<img
									src={category.image}
									className="w-8 h-8 rounded-full shadow-sm"
									alt="category"
								/>
								{category.name}
							</NavLink>
						))}
				</div>
			</div>
			<div className="h-80">Hey</div>
			{user && (
				<Link
					to={`user-profile/${user._id}`}
					className="fixed left-0 bottom-0 flex items-center bg-gray-100 rounded-tr-md shadow-lg min-w-210 hover:bg-gray-100"
					onClick={handleCloseSidebar}
				>
					<img
						src={user.image}
						className="w-10 h-10 rounded-full mx-4 my-4"
						alt="user-profile"
					/>
					<div className="flex flex-col">
						<p className="px-2">{user.userName}</p>
						<p className="text-xs flex gap-2 text-red-900 items-center justify-between">
							@
							{user.userName
								.split(" ")
								.join("")
								.toLowerCase()
								.trim()}
							<IoIosArrowForward />
						</p>
					</div>
				</Link>
			)}
		</div>
	);
};

export default Sidebar;
