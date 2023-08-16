import { useSession } from "next-auth/react";
import Image from "next/image";

export default function HomeHeader() {
  const { data: session } = useSession();
  return (
    <div className="text-blue-900 flex justify-between">
      <h2 className="mt-0">
        <div className="flex gap-2 items-center">
          <Image
            src={session?.user?.image}
            alt="user image"
            className="w-6 h-6 rounded-md sm:hidden"
            width={24}
            height={24}
          />
          <div>
            Hello, <b>{session?.user?.name}</b>
          </div>
        </div>
      </h2>
      <div className="hidden sm:block">
        <div className="bg-gray-300 flex gap-1 text-black rounded-lg overflow-hidden">
          <Image
            src={session?.user?.image}
            alt=" user image"
            className="w-6 h-6"
            width={14}
            height={14}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </div>
  );
}
