

const SkeletonStats = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="w-16 h-4 mt-2 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
};

const SkeletonDescription = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
};

const PokemonDetailSkeleton = () => {
  return (
    <div className="px-4 py-5 shadow-lg bg-base-200">
      <div className="flex justify-between mb-6">
        <div className="w-40 h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-40 h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Pokemon Image Skeleton */}
      <div className="flex items-center justify-center">
        <div className="bg-gray-200 rounded w-[200px] h-[200px] animate-pulse"></div>
      </div>

      {/* Title Skeleton */}
      <div className="w-48 h-8 mt-10 bg-gray-200 rounded animate-pulse"></div>

      {/* Descriptions */}
      <div className="flex justify-between mt-4">
        <SkeletonDescription />
        <SkeletonDescription />
        <SkeletonDescription />
      </div>

      {/* Stats Title */}
      <div className="w-40 h-6 mt-3 mb-4 bg-gray-200 rounded animate-pulse"></div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 xl:grid-cols-5">
        <SkeletonStats />
        <SkeletonStats />
        <SkeletonStats />
        <SkeletonStats />
        <SkeletonStats />
      </div>
    </div>
  );
};

export default PokemonDetailSkeleton;