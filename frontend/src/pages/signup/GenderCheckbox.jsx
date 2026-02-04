const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex gap-4">
      
      <label
        className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded border ${
          selectedGender === "male" ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-800 border-gray-300"
        }`}
      >
        <input
          type="radio"
          name="gender"
          value="male"
          checked={selectedGender === "male"}
          onChange={() => onCheckboxChange("male")}
          className="hidden"
        />
        <span>Male</span>
      </label>

     
      <label
        className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded border ${
          selectedGender === "female" ? "bg-pink-500 text-white border-pink-500" : "bg-white text-gray-800 border-gray-300"
        }`}
      >
        <input
          type="radio"
          name="gender"
          value="female"
          checked={selectedGender === "female"}
          onChange={() => onCheckboxChange("female")}
          className="hidden"
        />
        <span>Female</span>
      </label>
    </div>
  );
};

export default GenderCheckbox;
