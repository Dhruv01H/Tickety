import React, { useContext, useState } from "react";
import { statesAndDistricts } from "./data";
import { assets } from "../../assets/assets";
import { ProfileCards } from "../../components/component_index";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

function Profile() {
  /* State Management handlers for the dropdown list of states and districts */
  const { user, setUser } = useContext(AppContext);
  console.log(user.name);

  /* State Management handlers to handle dynamic values of input fields and store them */
  const [fullname, setFullname] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "Enter Your Phone Number.");
  const [dob, setDOB] = useState(user?.dob || "2001-01-01"); // Use valid date format YYYY-MM-DD
  const [address, setAddress] = useState(
    user?.address || "Enter Your Address."
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    user?.district || ""
  );
  const [selectedState, setSelectedState] = useState(user?.state || "");
  const [gender, setGender] = useState(user?.gender || "Male");

  const [showPasswordModal, setShowPasswordModal] = useState(false); // Controls visibility of the popup
  const [oldPassword, setOldPassword] = useState(""); // Stores the old password input
  const [newPassword, setNewPassword] = useState(""); // Stores the new password input
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Stores the confirm password input

  /* State Management handlers to handle the edit mode of the profile */
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    setIsEditing(false);
    try {
      const updatedUser = {
        name: fullname,
        username: username,
        email: email,
        phone: phone,
        dob: dob,
        address: address,
        state: selectedState,
        district: selectedDistrict,
        gender: gender,
      };

      const response = await axios.put(
        "http://localhost:8080/api/auth/updatedata",
        updatedUser,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data === "Update Successful") {
        alert("Profile updated successfully!");
        setUser(updatedUser); // ✅ Update UI with new data
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong.");
    }
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true); // Show the password change modal
  };

  const handleSubmitPasswordChange = () => {
    setShowPasswordModal(false); // Hide the password change modal
    //  if (newPassword !== confirmNewPassword) {
    //  alert("New passwords do not match!");
    ///  return;
    // }

    // Implement password change API logic here (Placeholder)
    // alert("Password changed successfully!");
    // setShowPasswordModal(false); // Close modal after success
  };

  return (
    <>
      <div className="px-10 py-6 mt-48 mb-4 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
        <div className="flex flex-col justify-between gap-5 sm:items-center sm:flex-row">
          <h1 className="text-2xl md:text-4xl">
            Hey there! {user.name}
            <span className="text-3xl text-primary md:text-5xl">{}</span>
          </h1>

          {!isEditing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="px-3 text-frost font-medium bg-primary py-1.5 text-lg rounded-lg hover:scale-105 transition-all duration-500"
            >
              Edit Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="px-3 text-frost font-medium bg-quaternary py-1.5 text-lg rounded-lg hover:scale-105 transition-all duration-500"
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="flex flex-col grid-cols-6 gap-10 mt-10 md:grid">
          {/* Left Side Menu For Account Information */}
          <div className="flex flex-col col-span-2 gap-2 mb-16 border-gray-400 lg:pr-10 lg:border-r-2 md:mb-5">
            <h3 className="mb-3 text-lg font-medium">Account Management</h3>

            <img
              src={assets.img1}
              alt="Profile Picture"
              className="mb-6 rounded-lg w-72 h-72 lg:w-80 lg:h-80"
            />

            <div className="flex flex-col gap-1 mb-8">
              <label htmlFor="Password">Old Password</label>
              <input
                type="password"
                name="Password"
                defaultValue={"123456789"}
                readOnly={true}
                placeholder="Pasword"
                className="w-full px-3 py-1.5 border border-gray-400 rounded-md"
              />
            </div>

            <button
              onClick={handleChangePassword}
              className="px-2 py-2 transition-all duration-500 border border-gray-400 rounded-md cursor-pointer hover:bg-primary hover:text-frost"
            >
              Change Password
            </button>
          </div>

          {/* Right Side Menu For Personal Information */}
          <form action="" className="flex flex-col col-span-4 gap-4">
            <h3 className="mb-1 text-lg font-medium">Personal Information</h3>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Fullname">Full Name</label>
                <input
                  type="text"
                  name="Fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  readOnly={!isEditing}
                  placeholder="Fullname"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  name="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  readOnly={!isEditing}
                  placeholder="Username"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Username">E-mail</label>
                <input
                  type="email"
                  name="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!isEditing}
                  placeholder="Email"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Phone">Phone Number</label>
                <input
                  type="tel"
                  name="Phone"
                  value={phone}
                  minLength={10}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value)}
                  readOnly={!isEditing}
                  placeholder="Username"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="DOB">Birth Date</label>
                <input
                  type="date"
                  name="DOB"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  readOnly={!isEditing}
                  placeholder="Date of Birth"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Gender">Gender</label>
                <select
                  name="Gender"
                  id="Gender"
                  value={gender} // ✅ Bind the state to the select value
                  onChange={(e) => setGender(e.target.value)} // ✅ Update state on change
                  disabled={!isEditing} // ✅ Only allow editing when in edit mode
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="State">State</label>
                <select
                  name="State"
                  className="w-full px-3 border rounded-md py-1.5 border-gray-400"
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict("");
                  }}
                >
                  <option value="" disabled>
                    Select a state
                  </option>
                  {Object.keys(statesAndDistricts).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="District">District</label>
                <select
                  name="District"
                  className="w-full px-3 border rounded-md py-1.5 border-gray-400"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedState}
                >
                  <option value="" disabled>
                    Select a district
                  </option>
                  {selectedState &&
                    statesAndDistricts[selectedState].map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="Address">Address</label>
              <textarea
                name="Address"
                id="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                readOnly={!isEditing}
                className="w-full px-3 py-1.5 border border-gray-400 rounded-md"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="mt-10 border-t border-gray-300"></div>
      </div>
      


      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="p-8 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-6 text-2xl font-bold">Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <input
                required
                minLength={8}
                maxLength={14}
                type="password"
                placeholder="Old Password"
                className="w-full px-3 py-2 mb-4 border rounded-md outline-none focus:border-primary"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <input
                required
                minLength={8}
                maxLength={14}
                type="password"
                placeholder="New Password"
                className="w-full px-3 py-2 mb-4 border rounded-md outline-none focus:border-primary"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                required
                minLength={8}
                maxLength={14}
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-3 py-2 mb-8 border rounded-md outline-none focus:border-primary"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button
                className="w-full py-2 text-white transition duration-300 rounded-md cursor-pointer bg-primary hover:bg-secondary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <ProfileCards />
    </>
  );
}

export default Profile;
