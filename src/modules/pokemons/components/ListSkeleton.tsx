
const ListSkeleton = () => {
  return (

    <div className="w-full col-span-2 px-5">
      <div className='flex items-center justify-center h-20 mt-10 mb-10 overflow-y-auto bg-gray-300 skeleton'></div>
      <div className="flex flex-wrap justify-center gap-5 overflow-scroll min-h-[700px] max-h-[1200px]">
        {
          Array.from({ length: 20 }).map(() => (
            <div className="flex flex-col gap-4 bg-gray-300 w-52 skeleton">
              <div className="w-full h-32 "></div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default ListSkeleton