import { Circle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen gap-x-10">
      {/* <Image
				className="w-32 h-32 "
				src={loader03.src}
				width={150}
				height={150}
				alt="Loading..."
			/> */}
      <Circle className="w-6 h-6 stroke-3 animate-ping stroke-yellow-400" />
      <Circle className="w-6 h-6 stroke-3 animate-ping stroke-red-400" />
      <Circle className="w-6 h-6 stroke-3 animate-ping stroke-green-400" />
      <Circle className="w-6 h-6 stroke-3 animate-ping stroke-blue-400" />
    </div>
  );
};

export default Loading;
