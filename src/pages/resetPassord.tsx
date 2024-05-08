const ResetPassword = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 flex flex-col">
        <div className="bg-white">
          <div className="mb-2 flex justify-between text-white h-12 p-5 w-full bg-gray-900 items-center">
            <h4 className="text-center mx-auto font-bold">Reset Password</h4>
            <button onClick={onClose}>X</button>
          </div>
          <div className="px-8 py-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">Old Password</label>
                <input
                  type="password"
                  placeholder="type first name"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold">New Password</label>
                <input
                  type="password"
                  placeholder="type last name"
                  className="bg-[#F6F6F6] px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-gray-900 text-white px-4 py-2 rounded-md">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
