const Input = ({ icon: Icon, type, options, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-500" />
      </div>

      {type === "select" ? (
        <select
          {...props}
          className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg border border-gray-700 focus:border-black-500 focus:ring-2 focus:ring-black text-black placeholder-gray-400 transition duration-200 appearance-none"
        >
          {options?.map((option) => (
            <option
              key={option}
              value={option}
              disabled={option === "--select--"}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...props}
          className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg border border-gray-700  text-black placeholder-gray-400 transition duration-200"
        />
      )}
    </div>
  );
};

export default Input;
