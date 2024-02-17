
import Posts from "./../Posts";

export default function MentorPosts({ posts }) {
  return (
    <>
    <div className="border-white-700 xl-mr-[144px] mt-12 ml-20 max-w-3xl flex-grow text-white sm:ml-[73px] xl:ml-[176px]">
        <div className="bg-slate-750 sticky top-0 z-50 mt-[50px] flex items-center border-b border-gray-400 py-2 px-3 text-[#d9d9d9] sm:justify-between"></div>
        <div className="pb-72">
          { posts && posts.map((post) => (<Posts post={post}/>
          ))}
        </div>
    </div>
    </>
  );
}
