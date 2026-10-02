import "./globals.css";
import localFont from "next/font/local";

const DMSans = localFont({
  src: [
    {
      path: "./fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "./fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-DMSans",
});

const BricolageGrotesque = localFont({
  src: "./fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf",
  weight: "700",
  variable: "--font-BricolageGrotesque",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={DMSans.variable + " " + BricolageGrotesque.variable}
    >
      <head>
        <title>Frontend Mentor | Weather app</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
