import { AuthCard } from "@/features/auth/auth-card";

export default function VerifyOtpPage() {
  return <AuthCard mode="otp" title="Verify OTP" description="Enter the one-time code from your authenticator or secure email." />;
}
