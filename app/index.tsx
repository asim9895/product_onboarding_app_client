import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const App = () => {
  const { authenticated }: { authenticated: boolean } = useSelector(
    (state: any) => state.user
  );
  return (
    <SafeAreaView>
      {authenticated ? (
        <Redirect href={"/dashboard"} />
      ) : (
        <Redirect href={"/sign-in"} />
      )}
    </SafeAreaView>
  );
};

export default App;
