import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";
import { TbWorldWww } from "react-icons/tb";

const PinDetail = ({ user }) => {
	const [pins, setPins] = useState(null);
	const [pinDetail, setPinDetail] = useState(null);
	const [comment, setComment] = useState("");
	const [addingComment, setAddingComment] = useState(false);
	const { pinId } = useParams();

	const addComment = () => {
		if (comment) {
			setAddingComment(true);
			client
				.patch(pinId)
				.setIfMissing({ comments: [] })
				.insert("after", "comments[-1]", [
					{
						comment,
						_key: uuidv4(),
						postedBy: {
							_type: "postedBy",
							_ref: user._id,
						},
					},
				])
				.commit()
				.then(() => {
					fetchPinDetails();
					setComment("");
					setAddingComment(false);
				});
		}
	};

	const fetchPinDetails = () => {
		const query = pinDetailQuery(pinId);
		if (query) {
			client.fetch(`${query}`).then((data) => {
				setPinDetail(data[0]);

				if (data[0]) {
					const query1 = pinDetailMorePinQuery(data[0]);

					client.fetch(query1).then((res) => setPins(res));
				}
			});
		}
	};

	useEffect(() => {
		fetchPinDetails();
	}, [pinId]);

	if (!pinDetail) return <Spinner message="Loading pin..." />;

	return (
		<>
			<div
				className="flex xl:flex-row flex-col m-auto bg-white"
				style={{ maxWidth: "1500px", borderRadius: "32px" }}
			>
				<div className="flex justify-center items-center md:items-start flex-initial">
					<img
						src={pinDetail?.image && urlFor(pinDetail?.image).url()}
						alt="user-post"
						className="rounded-t-3xl rounded-b-lg"
					/>
				</div>
				<div className="w-full p-5 flex-1 xl:min-w-620">
					<div className="flex items-center justify-between">
						<div className="flex gap-2 items-center py-3 bg-red-900 text-white border-black hover:bg-red-600 px-5 rounded-lg transition-all duration-600 ">
							<a
								href={`${pinDetail.image?.asset?.url}?dl=`}
								download
								onClick={(e) => e.stopPropagation()}
							>
								<div className="flex text-xs justify-center items-center gap-2 ">
									<FaDownload />
									<h1 className="font-bold">Download</h1>
								</div>
							</a>
						</div>

						<a
							href={pinDetail.destination}
							target="_blank"
							rel="noreferrer"
							className="hover:underline text-blue-900 "
						>
							<div className="flex justify-center items-center gap-2 ">
								<TbWorldWww />
								<h1 className="font-bold">visit site</h1>
							</div>
						</a>
					</div>
					<div>
						<h1 className="text-4xl font-bold break-words mt-3">
							{pinDetail.title}
						</h1>
						<p className="mt-3">{pinDetail.about}</p>
					</div>
					<Link
						to={`user-profile/${pinDetail?.postedBy?._id}`}
						className="flex gap-2 mt-5 items-center bg-white rounded-lg"
					>
						<img
							className="w-8 h-8 rounded-full object-cover"
							src={pinDetail.postedBy?.image}
							alt="user-profile"
						/>
						<p className="font-semibold capitalize">
							{pinDetail.postedBy?.userName}
						</p>
					</Link>
					<h2 className="mt-5 text-2xl bg-gray-100 px-3 py-3 rounded-md">
						Comments{" "}
					</h2>
					<div className="max-h-370 overflow-y-auto">
						{pinDetail?.comments?.map((comment, i) => (
							<div
								className="flex gap-2 mt-5 items-center bg-white rounded-md"
								key={i}
							>
								<img
									src={comment.postedBy?.image}
									alt="user-profile"
									className="w-10 h-10 rounded-full cursor-pointer"
								/>
								<div className="flex flex-col">
									<p className="font-bold">
										{comment.postedBy?.userName}
									</p>
									<p>{comment.comment}</p>
								</div>
							</div>
						))}
					</div>
					<div className="flex flex-wrap mt-6 gap-3">
						<Link to={`/user-profile/${pinDetail.postedBy?._id}`}>
							<img
								className="w-8 h-8 rounded-full cursor-pointer"
								src={pinDetail.postedBy?.image}
								alt="user-profile"
							/>
						</Link>
						<input
							className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-md focus:border-gray-300"
							type="text"
							placeholder="Add a comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<button
							type="button"
							className="bg-red-900 text-white rounded-md px-6 py-2 font-semibold text-base outline-none hover:bg-red-600"
							onClick={addComment}
						>
							{addingComment ? "Posting the comment..." : "Post"}
						</button>
					</div>
				</div>
			</div>

			{pins?.length > 0 ? (
				<>
					<h2 className="text-center font-bold text-2x mt-8 mb-4">
						More like this
					</h2>
					<MasonryLayout pins={pins} />
				</>
			) : (
				<Spinner message="Loading more pins.." />
			)}
		</>
	);
};

export default PinDetail;
