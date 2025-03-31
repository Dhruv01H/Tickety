import React, { useContext, useState, useEffect } from "react";
import { statesAndDistricts } from "./data";
import { assets } from "../../assets/assets";
import { ProfileCards } from "../../components/component_index";
import { AppContext } from "../../context/AppContext";
import ProfileLoading from "../../components/LoadingAnimation/ProfileLoading";
import { toast } from "react-toastify";
import axios from "axios";

function Profile() {
  const { user, setUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  
  /* State Management handlers for the dropdown list of states and districts */
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
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setUser(updatedUser);
      } else {
        toast.error("Failed to update profile.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong while updating profile.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true); // Show the password change modal
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/changePassword", {
        email: user.email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        toast.success("Password changed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowPasswordModal(false);
        // Clear the form
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data || "Failed to change password.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    // Simulate loading time and data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ProfileLoading />;
  }

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
                  disabled={!isEditing}
                  placeholder="Fullname"
                  className={`w-full px-3 py-1.5 border border-gray-400 rounded-md ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
              </div>

              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  name="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Username"
                  className={`w-full px-3 py-1.5 border border-gray-400 rounded-md ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                  disabled={true}
                  placeholder="Email"
                  className="w-full px-3 py-1.5 border border-gray-400 rounded-md bg-gray-100 cursor-not-allowed"
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
                  disabled={!isEditing}
                  placeholder="Phone Number"
                  className={`w-full px-3 py-1.5 border border-gray-400 rounded-md ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                  disabled={!isEditing}
                  placeholder="Date of Birth"
                  className={`w-full px-3 py-1.5 border border-gray-400 rounded-md ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
              </div>

              <div className="flex flex-col gap-1 basis-[50%]">
                <label htmlFor="Gender">Gender</label>
                <select
                  name="Gender"
                  id="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-1.5 border border-gray-400 rounded-md ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict("");
                  }}
                  disabled={!isEditing}
                  className={`w-full px-3 py-1.5 border border-gray-400 rounded-md ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!isEditing || !selectedState}
                  className={`w-full px-3 py-1.5 border border-gray-400 rounded-md ${!isEditing || !selectedState ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                disabled={!isEditing}
                className={`w-full px-3 py-1.5 border border-gray-400 rounded-md ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="mt-10 border-t border-gray-300"></div>
      </div>
      


      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="p-8 bg-white rounded-lg shadow-lg w-96 relative">
            <button 
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="mb-6 text-2xl font-bold">Change Password</h2>
            <form onSubmit={handleSubmitPasswordChange}>
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
