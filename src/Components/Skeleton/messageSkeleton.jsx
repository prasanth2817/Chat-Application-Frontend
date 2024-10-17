const MessageSkeleton = () => {
  return (
    <>
      {/* Skeleton for received message */}
      <div className="flex gap-3 items-center">
        <div className="skeleton w-8 h-8 rounded-full shrink-0 md:w-10 md:h-10"></div>
        <div className="flex flex-col gap-1">
          <div className="skeleton h-3 w-32 md:w-40"></div>
          <div className="skeleton h-3 w-24 md:w-40"></div>
        </div>
      </div>

      {/* Skeleton for sent message */}
      <div className="flex gap-3 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="skeleton h-3 w-32 md:w-40"></div>
        </div>
        <div className="skeleton w-8 h-8 rounded-full shrink-0 md:w-10 md:h-10"></div>
      </div>
    </>
  );
};
export default MessageSkeleton;
