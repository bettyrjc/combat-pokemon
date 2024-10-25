import { ChangeEvent, forwardRef } from "react";

const SearchIcon = forwardRef<HTMLInputElement, { onChange: (e: ChangeEvent<HTMLInputElement>) => void }>(
  ({ onChange }, ref) => {
    return (
      <div className='flex items-center justify-center h-40 overflow-y-auto'>
        <label className="flex items-center w-1/2 gap-2 input input-bordered">
          <input
            type="text"
            className=" grow"
            placeholder="Busca a tu pokemon"
            ref={ref}
            onChange={onChange}
            onBlur={onChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
    );
  }
);

export default SearchIcon;
