import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider";

const spacegrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://localhost:3000"),

	title:'Brian Muigai',

	description:
		"A user form for registering user and for users to login",
	openGraph: {
		title: "Brian Muigai",
		description:
			"A user form for registering user and for users to login.",
		url: "https://localhost:3000",
		siteName: "Brian Muigai",
		images: "/og.png",
		type: "website",
	},
	keywords: ["daily web coding", "Brianmuigai", "dailywebcoding"],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spacegrotesk.className}>    <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider></body>
    </html>
  );
}