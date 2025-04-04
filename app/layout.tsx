import "@/styles/globals.css"
import { ReactNode } from "react";
import { Navbar } from '@/components/Navbar' // El navbar va en un archivo separado
import { Footer } from '@/components/Footer' // El footer va en un archivo separado
import { AuthProvider } from "@/app/context/AuthContext"

const Layout =  ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 container mx-auto pt-16 px-4"> {/* Espacio para evitar que el Navbar tape el contenido */}
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
