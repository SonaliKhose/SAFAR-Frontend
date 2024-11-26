// // app/some-page/page.js or app/some-component.js

// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// export default function SomePage() {
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (session) {
//       // Handle session data, e.g., storing token in localStorage or cookies
//       console.log("Session data:", session);
//     }
//   }, [session]);

//   if (status === "loading") return <div>Loading...</div>;

//   if (!session) return <div>You are not signed in</div>;

//   return (
//     <div>
//       <p>Welcome, {session.user.name}!</p>
     
//     </div>
//   );
// }
