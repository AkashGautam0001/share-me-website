import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Spinner = ({ message }) => {
	return (
		<div className="flex flex-col justify-center items-center w-full h-full">
			<MagnifyingGlass
				visible={true}
				height="80"
				width="80"
				ariaLabel="magnifying-glass-loading"
				wrapperStyle={{}}
				wrapperClass="magnifying-glass-wrapper"
				glassColor="#FFFFFF"
				color="#FFFFFFF"
			/>
			<p className="text-lg text-center px-2">{message}</p>
		</div>
	);
};

export default Spinner;
