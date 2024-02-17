import DP from "./../public/images/Dp.png";
import Image from "next/image";
import sample from "./../public/images/1.jpg";

export default function Posts({ post }) {
  return (
    <>
      <div className="flex cursor-pointer border-b border-gray-500 p-3">
        <Image width={35} height={35} src={post?.authorProfilePic} alt="" className="mr-4 h-12 w-12 rounded-full" />
        <div className="flex w-full flex-col space-y-2">
          <div className="text-[#6e767d]">
            <div className="group inline-block">
              <h4 className="text-[15px] font-bold text-black group-hover:underline sm:text-base">
                {post?.title}
              </h4>
              <span className="text-sm sm:text-[15px]">{post?.author}</span>
            </div>
            <span className="text-sm hover:underline sm:text-[15px]">
              {/* this is where we will implement the time stamp depicting the time of post upload */}
            </span>
            <p className="mt-0.5 text-[15px] text-black sm:text-base ">
              {post?.content}
            </p>
          </div>
          <Image
            width={200}
            height={300}
            src={post?.image}
            alt=""
            className="mr-2 max-h-[700px] max-w-[600px] rounded-2xl object-cover"
          />
        </div>
      </div>
    </>
  );
}
