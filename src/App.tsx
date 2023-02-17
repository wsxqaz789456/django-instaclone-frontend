import { BrowserRouter, Route, Routes } from "react-router-dom";
import useUser from "./hooks/useUser";
import ChangePassword from "./routes/ChangePassword";
import EditAccount from "./routes/EditAccount";
import Feed from "./routes/Feed";
import Hashtag from "./routes/HashTag";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile";
import Search from "./routes/Search";
import SignUp from "./routes/SignUp";
import UploadPost from "./routes/UploadPost";
const App = () => {
  const { isLoggedIn, isLoading, user } = useUser();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={!isLoading ? isLoggedIn ? <Feed /> : <Login /> : null}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route
            path="/signup"
            element={!isLoading ? isLoggedIn ? <Feed /> : <SignUp /> : null}
          />
          <Route path="/:username" element={<Profile />} />
          <Route path="/accounts/edit" element={<EditAccount data={user} />} />
          <Route
            path="/accounts/change-password"
            element={<ChangePassword />}
          />
          <Route path="/posts/upload" element={<UploadPost data={user} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/hashtags/:hashtag" element={<Hashtag />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
