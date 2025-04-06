import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import Loader from "../../component/layout/Loader/Loader.jsx";
import MetaData from "../../component/layout/MetaData.jsx";
import { UPDATE_PROFILE_RESET } from "../../constants/userContants.jsx";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name,
        email,
      };

      if (avatar) {
        // Convert image to base64
        const reader = new FileReader();
        reader.readAsDataURL(avatar);

        reader.onload = async () => {
          const base64Image = reader.result.split(",")[1];
          formData.avatar = base64Image;

          await dispatch(updateProfile(formData));
        };
      } else {
        await dispatch(updateProfile(formData));
      }
    } catch (error) {
      toast.error(error.message || "Profile update failed");
    }
  };

  const updateProfileDataChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url || "/Profile.png");
    }
  }, [user]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [isUpdated, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Your Profile</h2>

              <form
                className="updateProfileForm"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <div
                    className="avatarPreviewContainer"
                    onClick={handleAvatarClick}
                  >
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <div className="avatarOverlay">
                      <span>Change Photo</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                </div>
                <button
                  type="submit"
                  className="updateProfileBtn"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
