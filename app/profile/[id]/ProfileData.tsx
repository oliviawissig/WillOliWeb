"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import OWProgress from "@/app/components/OWProgress";
import { OWUser } from "@/app/api/users/[id]/route";

interface ProfileDataProps {
  id: string;
}

const ProfileData = ({ id }: ProfileDataProps) => {
  const [user] = useAuthState(auth);
  const [dbUser, setDbUser] = useState<OWUser>();
  const [loading, setLoading] = useState(true);
  // const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  // const [usernameEdit, setUsernameEdit] = useState(false);
  // const [emailEdit, setEmailEdit] = useState(false);
  // const [displayNameEdit, setDisplayNameEdit] = useState(false);
  // const [newEmail, setNewEmail] = useState("");
  // const [newUsername, setNewUsername] = useState("");
  // const [newDisplayName, setNewDisplayName] = useState("");
  // const [updateLoading, setUpdateLoading] = useState(false);

  // const handleUpdateUsername = async () => {
  //   if (newUsername) {
  //     setUpdateLoading(true);
  //     //update username in firestore DB
  //     const userRef = doc(db, "users", user?.uid!);
  //     await updateDoc(userRef, {
  //       username: newUsername,
  //     });

  //     const docSnap = await getDoc(userRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       return;
  //     }

  //     //update username on OW API
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/update-handshake?username=${newUsername}`,
  //       {
  //         method: "POST",
  //         cache: "no-store",
  //         body: JSON.stringify({
  //           userId: user?.uid,
  //         }),
  //       }
  //     );
  //     foo();
  //     setUpdateLoading(false);
  //     setUsernameEdit(false);
  //   } else {
  //     console.log("NO CHANGES!!");
  //     setUsernameEdit(false);
  //   }
  // };

  // const handleUpdateEmail = async () => {
  //   if (newEmail) {
  //     setUpdateLoading(true);
  //     //update email in firestore auth
  //     updateEmail(auth.currentUser!, newEmail)
  //       .then(() => {
  //         console.log("EMAIL UPDATE SUCCESS");
  //       })
  //       .catch((error) => {
  //         console.log("EMAIL UPDATE FAIL");
  //       });

  //     //update email in firestore DB
  //     const userRef = doc(db, "users", user?.uid!);
  //     await updateDoc(userRef, {
  //       email: newEmail,
  //     });

  //     const docSnap = await getDoc(userRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       return;
  //     }

  //     // //update email on OW API
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/update-handshake?email=${newEmail}`,
  //       {
  //         method: "POST",
  //         cache: "no-store",
  //         body: JSON.stringify({
  //           userId: user?.uid,
  //         }),
  //       }
  //     );
  //     foo();
  //     setUpdateLoading(false);
  //     setEmailEdit(false);
  //   } else {
  //     console.log("NO CHANGES!!");
  //     setEmailEdit(false);
  //   }
  // };

  // const handleUpdateDisplayName = async () => {
  //   if (newDisplayName) {
  //     setUpdateLoading(true);
  //     //update display name in firestore DB
  //     const userRef = doc(db, "users", user?.uid!);
  //     await updateDoc(userRef, {
  //       display_name: newDisplayName,
  //     });

  //     const docSnap = await getDoc(userRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       return;
  //     }

  //     // //update display name on OW API
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/update-handshake?display_name=${newDisplayName}`,
  //       {
  //         method: "POST",
  //         cache: "no-store",
  //         body: JSON.stringify({
  //           userId: user?.uid,
  //         }),
  //       }
  //     );
  //     foo();
  //     setUpdateLoading(false);
  //     setDisplayNameEdit(false);
  //   } else {
  //     console.log("NO CHANGES!!");
  //     setDisplayNameEdit(false);
  //   }
  // };

  // const updateImgUrl = async ({ url }: ImageUrlProps) => {
  //   setBtnLoading(true);
  //   // update doc in firestore
  //   const q = query(collection(db, "users"), where("id", "==", user?.uid));
  //   const userRef = doc(db, "users", user?.uid!);
  //   await updateDoc(userRef, {
  //     image_url: url,
  //   });

  //   const docSnap = await getDoc(userRef);
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     return;
  //   }

  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/update-handshake?image_url=${
  //       docSnap.data().image_url
  //     }`,
  //     {
  //       method: "POST",
  //       cache: "no-store",
  //       body: JSON.stringify({
  //         userId: user?.uid,
  //       }),
  //     }
  //   );
  //   OWLogout();
  //   await startTTH({
  //     userId: user!.uid,
  //     performBEDHandshakeCallback: async (codeA: string) => {
  //       return handleBEDCallback(codeA, user!.uid);
  //     },
  //   });

  //   setBtnLoading(false);
  //   router.push("/");
  // };

  const foo = async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user?.uid}`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      const tempUser = await response.json();
      if (id != tempUser.id) {
        router.push("/404");
      } else {
        setDbUser(tempUser);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    foo();
  }, [user?.uid]);

  if (!dbUser) {
    return (
      <div className="w-1/2 m-auto">
        <OWProgress />
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <OWProgress />
      ) : (
        <div>
          <h1 className="text-center">Your Profile</h1>
          <div className="flex-col">
            <p className="font-bold">
              Username:
              {/* {usernameEdit ? (
                <Button
                  className="p-0 underline"
                  onClick={() => handleUpdateUsername()}
                >
                  {newUsername !== "" ? "save" : "cancel"}
                </Button>
              ) : (
                <Button
                  className="p-0 underline"
                  onClick={() => setUsernameEdit(true)}
                >
                  (change)
                </Button>
              )} */}
            </p>
            {/* {usernameEdit ? (
              <div className="flex flex-row w-1/2 mb-5 gap-5">
                <TextField
                  id="outlined-basic"
                  label="New Username"
                  variant="outlined"
                  onChange={(e) => setNewUsername(e.target.value)}
                />{" "}
                {usernameEdit && updateLoading && <OWProgress />}
              </div>
            ) : (
              <p>{dbUser.username}</p>
            )} */}
            <p>{dbUser.username}</p>
          </div>
          <div className="flex-col">
            <p className="font-bold">
              Email:
              {/* {emailEdit ? (
                <Button
                  className="p-0 underline"
                  onClick={() => handleUpdateEmail()}
                >
                  {newEmail !== "" ? "save" : "cancel"}
                </Button>
              ) : (
                <Button
                  className="p-0 underline"
                  onClick={() => setEmailEdit(true)}
                >
                  (change)
                </Button>
              )} */}
            </p>
            {/* {emailEdit ? (
              <div className="flex flex-col w-1/2 mb-5 gap-5">
                <TextField
                  id="outlined-basic"
                  label="New Email"
                  variant="outlined"
                  onChange={(e) => setNewEmail(e.target.value)}
                />{" "}
                {emailEdit && updateLoading && <OWProgress />}
              </div>
            ) : (
              <p>{dbUser.email}</p>
            )} */}
            <p>{dbUser.email}</p>
          </div>
          <div className="flex-col">
            <p className="font-bold">
              Display Name:
              {/* {displayNameEdit ? (
                <Button
                  className="p-0 underline"
                  onClick={() => handleUpdateDisplayName()}
                >
                  {newDisplayName !== "" ? "save" : "cancel"}
                </Button>
              ) : (
                <Button
                  className="p-0 underline"
                  onClick={() => setDisplayNameEdit(true)}
                >
                  (change)
                </Button>
              )} */}
            </p>
            {/* {displayNameEdit ? (
              <div className="flex flex-col w-1/2 mb-5 gap-5">
                <TextField
                  id="outlined-basic"
                  label="New Display Name"
                  variant="outlined"
                  onChange={(e) => setNewDisplayName(e.target.value)}
                />{" "}
                {displayNameEdit && updateLoading && <OWProgress />}
              </div>
            ) : (
              <p>{dbUser.display_name}</p>
            )} */}
            <p>{dbUser.display_name}</p>
          </div>
          <p className="font-bold">User ID (primary key):</p>
          <p>{dbUser.id}</p>
          {/* <p className="font-bold">Avatar:</p> */}
          {/* <Image
            className="mb-5"
            src={dbUser.image_url!}
            alt={"User Avatar"}
            width="64"
            height="64"
          /> */}
          {/* <CldUploadWidget
            uploadPreset="zax4qscb"
            options={{
              sources: ["local"],
              multiple: false,
              maxFiles: 1,
            }}
            onSuccess={(result, options) => {
              if (result.event !== "success") return;
              const info = result.info as CloudinaryResult;
              updateImgUrl({ url: info.url });
            }}
          >
            {({ open }) => (
              <OWButton
                disabled={btnLoading ? true : false}
                onClick={() => open()}
                startIcon={<ImageIcon />}
              >
                {btnLoading ? (
                  <CircularProgress color={"inherit"} />
                ) : (
                  "Upload Image"
                )}
              </OWButton>
            )}
          </CldUploadWidget> */}
        </div>
      )}
    </>
  );
};

export default ProfileData;
