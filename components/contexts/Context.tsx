import { LanguageProvider } from "./LanguageContext";
import { LoginProvider } from "./LoginContext";
import { MenuProvider } from "./MenuContext";
import { MockProvider } from "./MockContext";
export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MockProvider>
        <LanguageProvider>
          <LoginProvider>
            <MenuProvider>{children}</MenuProvider>
          </LoginProvider>
        </LanguageProvider>
      </MockProvider>
    </>
  );
}
