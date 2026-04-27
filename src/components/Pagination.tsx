const Pagination = () => {
  return (
    <div className='flex justify-between items-center mt-4'>
        <button className="px-3 py-1 text-xs  disabled bg-gray-100 text-gray-500  disabled:cursor-not-allowed">Prev</button>
        <div className="flex gap-2">
            <button className="bg-lamaSky px-1">1</button>
            <button className=" px-1">2</button>
            <button className=" px-1">3</button>
            <button className=" px-1">...</button>
            <button className=" px-1">10</button>
        </div>
        <button  className="px-3 py-1 text-xs  bg-gray-200">Next</button>

    </div>
  )
}

export default Pagination