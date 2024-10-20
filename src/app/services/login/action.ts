'use server';
import { Session } from "next-auth";
import { signIn, signOut } from "../../../../auth";
import { getUserByEmail } from "../users/action";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    console.log(response);

    // Check for success or failure
    if (response?.error) {
      console.error("Login failed:", response.error);
      return {
        success: false,
        message: response.error,
      };
    }

    if (response?.ok) {
      return {
        success: true,
        message: "Login successful",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred during login",
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function getCurrentUser(session: Session | null) {
  const currentUser = await getUserByEmail(String(session?.user?.email));
  return currentUser;
}