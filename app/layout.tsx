import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./assets/images/favicon-32x32.png"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
