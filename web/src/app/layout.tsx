import ApolloWrapper from "@/lib/apollo-wrapper";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "JWT Authentication",
  description: "JWT Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <div className="flex gap-1 text-blue-600">
            <Link href={"/"}>home</Link>
            <Link href={"/login"}>login</Link>
            <Link href={"/register"}>register</Link>
          </div>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
