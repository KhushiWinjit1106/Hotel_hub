import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";




const FirebaseContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyDmUIcm4kPoZF8YI307wzivjSWY3-mYuHk",
    authDomain: "hotel-60204.firebaseapp.com",
    projectId: "hotel-60204",
    storageBucket: "hotel-60204.appspot.com",
    messagingSenderId: "419924901635",
    appId: "1:419924901635:web:25316be4232420aa62b336",
    measurementId: "G-P1JCSDB7FD",
};

export const useFirebase = () => useContext(FirebaseContext); // Context hook ready
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();


export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // console.log(user)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        })
    }, []);

    const isLoggedIn = user ? true : false;

    console.log(user)

    const getUserDetails = () => {
        if (isLoggedIn && user) {
            const { displayName, email  } = user;
            return { displayName, email };
        }
        return null;
    };

    const signOut = () => {
        // Sign out user
        auth.signOut().then(() => {
            setUser(null);
            navigate.push("/login");
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };


    const signinWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user profile exists
            const userProfileRef = doc(firestore, "Profiles", user.uid);
            const userProfileSnap = await getDoc(userProfileRef);

            if (userProfileSnap.exists()) {
                navigate("/HSearch");
            } else {
                navigate("/Cprofile");
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const getCurrentUser = () => {
        if (!user) return null;
        // Check if phoneNumber exists and clean it if it does
        const cleanedPhoneNumber = user.phoneNumber ? user.phoneNumber.replace("+91", "") : null;
        return { ...user, phoneNumber: cleanedPhoneNumber };
    };
    

    const AddNewHotel = async (
        id, fullName, locationUrl, city, pincode, images, whatsappNo, email,
        eventType, eventStrength, meal, audioVisual, invitationService, photographyService, specificTheme, EventFacilities,
        roomType, roomsAvail, roomsArea, bedSizeOrCapacity, roomRates, roomView, numGuests) => {
        const imageUrls = [];
        // Loop through each selected image
        for (const image of images) {
            const imageRef = ref(storage, `uploads/images/${Date.now()}-${image.name}`);
            const uploadResult = await uploadBytes(imageRef, image);
            imageUrls.push(uploadResult.ref.fullPath);
        }

        const newHotelData = {
            id, fullName, locationUrl, city, pincode, imageUrls, whatsappNo, email,
            eventType, eventStrength, meal, audioVisual, invitationService, photographyService, specificTheme, EventFacilities,
            roomType, roomsAvail, roomsArea, bedSizeOrCapacity, roomRates, roomView, numGuests,
            CreatorContact: user.phoneNumber,
        };

        // Remove undefined or empty fields
        const cleanedHotelData = Object.fromEntries(
            Object.entries(newHotelData).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        );

        return await addDoc(collection(firestore, "Hotels"), cleanedHotelData);
    };

    const HotelEdit = async (id, updatedData) => {
        try {
            if (!id) {
                console.error("Hotel ID is undefined or null");
                return null;
            }
    
            console.log(`Hotel ID: ${id}`);
    
            // Fetch all documents in the "Hotels" collection
            const hotelsSnapshot = await getDocs(collection(firestore, "Hotels"));
    
            // Check if the provided ID matches any document ID in the collection
            let hotelDocRef = null;
    
            hotelsSnapshot.forEach(doc => {
                const data = doc.data();
                console.log(`Document data: ${JSON.stringify(data)}`);
                console.log(`Document reference path: ${doc.ref.path}`);
                // Ensure both the id in data and the id being compared are strings
                if (data.id.toString() === id.toString()) {
                    hotelDocRef = doc.ref;
                }
            });
    
            if (!hotelDocRef) {
                console.error("No such hotel exists!");
                return;
            }
    
            console.log("Hotel Doc Ref:", hotelDocRef.path);
    
            // Update Firestore document with the new data
            await updateDoc(hotelDocRef, updatedData);
    
            console.log("Hotel updated successfully:", updatedData);
        } catch (error) {
            console.error("Error updating hotel document:", error);
            throw error;
        }
    };
    
    const CreateNewProfile = async (name, city, pincode, contact, email) => {
        return await addDoc(collection(firestore, "Profiles"), {
            name, city, pincode, contact, email,
            CreatorContact: user.phoneNumber,
        });
    };


    const listOfClient = () => {
        return getDocs(collection(firestore, "Profiles"))
    };

    // console.log(user)

    const listOfHotels = async () => {
        try {
            const hotelsSnapshot = await getDocs(collection(firestore, "Hotels"));
            hotelsSnapshot.forEach(doc => {
                // console.log(`Hotel ID: ${doc.id}, Hotel Data:`, doc.data());
            });
            return getDocs(collection(firestore, "Hotels"))
        } catch (error) {
            console.error("Error listing hotels:", error);
        }
    };



    // const getImageURL = async (paths) => {
    //     // Array to store promises for fetching download URLs
    //     const imageURLPromises = paths.map(path => getDownloadURL(ref(storage, path)));
    //     console.log(imageURLPromises)
    //     // Wait for all promises to resolve
    //     const imageURLs = await Promise.all(imageURLPromises);

    //     return imageURLs;
    // };
    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));
    }

    // const getHotelById = async (hotelId) => {
    //     try {
    //         if (!hotelId) {
    //             console.error("Hotel ID is undefined or null");
    //             return null;
    //         }

    //         // Get the hotel document by its ID
    //         const hotelDoc = doc(firestore, "Hotels", hotelId);
    //         const hotelSnapshot = await getDoc(hotelDoc);

    //         if (hotelSnapshot.exists()) {
    //             // Return the data of the document if it exists
    //             return hotelSnapshot.data();
    //         } else {
    //             console.log("No such document!");
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error("Error getting hotel document:", error);
    //         throw error; // Throw the error for handling in the calling code
    //     }
    // };

    const IntrestedClientForm = async (hotelname, name, city, pincode, contact, email, event, catering, Gathering,adults,children,rooms,travelingWithPets,checkIn,checkOut) => {
        return await addDoc(collection(firestore, "Intrested"), {
            hotelname, name, city, pincode, contact, email, event, catering, Gathering,adults,children,rooms,travelingWithPets,checkIn,checkOut,
            CreatorContact: user.phoneNumber,
        });
    };

    const IntrestedClientData = () => {
        return getDocs(collection(firestore, "Intrested"))
    };



    return <FirebaseContext.Provider value={{
        isLoggedIn,
        signOut,
        signinWithGoogle,
        AddNewHotel,
        listOfHotels,
        getImageURL,
        CreateNewProfile,
        listOfClient,
        // getHotelById,
        getUserDetails,
        getCurrentUser,
        IntrestedClientForm,
        IntrestedClientData,
        HotelEdit,
    }} > {props.children} </FirebaseContext.Provider>
};