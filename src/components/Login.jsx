import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import parsePhoneNumberFromString from 'libphonenumber-js';
import OtpInput from "otp-input-react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase.config";
import { auth } from "../context/Firebase"
import { useFirebase } from '../context/Firebase';

// import { CgSpinner } from "react-icons/cg";
// import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [user, setUser] = useState(null);
    const [log, setLog] = useState(null);
    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [profiles, setProfile] = useState([]);

    useEffect(() => {
        firebase.listOfClient().then((profiles) => {
            setProfile(profiles.docs.map(doc => doc.data()))
        });
    }, [firebase]);

    const creatorContacts = profiles
        .map(profile => profile.CreatorContact)
        .filter(contact => contact !== null && contact !== undefined); // Filter out null or undefined contacts

    const cleanedContacts = creatorContacts.map(contact => contact.replace("+", ""));

    console.log(creatorContacts);
    console.log(cleanedContacts);

    console.log(firebase.isLoggedIn);
    console.log(phone);

    const sendOtp = async () => {
        try {
            const phoneNumber = parsePhoneNumberFromString(phone, 'IN');
            if (!phoneNumber || !phoneNumber.isValid()) {
                throw new Error('Invalid phone number format.');
            }

            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber.number, recaptcha);
            setUser(confirmation);
            setShowOTP(true);
            toast.success("OTP sent successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    const verifyOtp = async () => {
        try {
            const data = await user.confirm(otp);
            console.log(data);
            setLog(data.user);
            console.log(data.user);
            toast.success("You logged in successfully!");
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (log) {
            const timeout = setTimeout(() => {
                if (cleanedContacts.includes(phone)) {
                    navigate("/HSearch");
                    console.log("Redirect to Search");
                } else {
                    navigate("/CProfile");
                    console.log("Redirect to Profile");
                }
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [log, navigate, cleanedContacts, phone]);

    useEffect(() => {
        if (log) {
            const timeout = setTimeout(() => {
                firebase.checkProfileExists(phone).then((profileExists) => {
                    if (profileExists) {
                        navigate("/HSearch");
                    } else {
                        navigate("/profile");
                    }
                });
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [log, navigate, firebase, phone]);




    // bg-emerald-500
    return (
        <>
            <div className="gilroyBold  flex justify-center items-center h-full bg-[url('https://firebasestorage.googleapis.com/v0/b/hotel-60204.appspot.com/o/Background_Images%2FBG_5.png?alt=media&token=57abe584-558a-4ed2-82f1-cb6bdbf3ef0a')] bg-cover">
                <Toaster toastOptions={{ duration: 4000 }} />
                <div className="backdrop-blur-sm bg-white/30 py-8 p-4 md:p-10 rounded-3xl">
                    <div className="flex justify-center items-center md:mb-3">
                        <h1 className="md:text-5xl text-[2.5rem] font-bold md:text-black text-white/90">Login</h1>
                    </div>

                    {log ? (
                        <h1>Login Succes</h1>
                    ) : (
                        <div>
                            {showOTP ? (
                                <>
                                    <div className="flex justify-center">
                                        <label className="font-bold text-2xl text-black text-center my-2"> Enter your OTP </label>
                                    </div>

                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        OTPLength={6}
                                        otpType="number"
                                        disabled={false}
                                        autoFocus
                                        className="opt-container  text-black my-4   "
                                    ></OtpInput>

                                    <button
                                        className="bg-emerald-700 w-80 flex  items-center justify-center py-2.5 text-white font-medium rounded text-xl mb-6 hover:bg-emerald-900/70"
                                        onClick={verifyOtp}
                                    >Verify OTP</button>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center">
                                        <label className="text-2xl text-black text-center my-2 "> Enter your phone number </label>
                                    </div>
                                    <PhoneInput country={"in"} value={phone} onChange={setPhone} className="mb-6" />

                                    <button
                                        className="bg-emerald-700 w-80 flex  items-center justify-center py-2.5 text-white rounded text-xl mb- hover:bg-emerald-900/70 mb-4"
                                        onClick={sendOtp}
                                    >Send OTP
                                    </button>

                                    <div id="recaptcha" className="mb-4"></div>
                                </>
                            )}
                            <div className="flex justify-center items-center">
                                <button onClick={firebase.signinWithGoogle} className="w-80  md:font-['gilroy] bg-white text-black/80 border border-gray-300 rounded-md p-1 flex items-center justify-center text-xl md:text-2xl my-2">
                                    <div className="flex items-center">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/webcraft-b6ba7.appspot.com/o/google.png?alt=media&token=e5d9b6f8-a355-4db0-a108-3e50c4e68b30" alt="Google Logo" className="w-12 h-12 mr-2" />
                                        Login in with Google
                                    </div>
                                </button>
                            </div>
                        </div>

                    )}

                </div>

            </div>
        </>

    );
};

export default Login;
