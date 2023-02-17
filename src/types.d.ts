export interface ILoginForm {
  username: string;
  password: string;
}

export interface ILoginVariables {
  username: string;
  password: string;
}

export interface ISignUpForm {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ISignUpVariables {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IComments {
  id: number;
  author: {
    pk: number;
    username: string;
    avatar: string;
  };
  content: string;
  is_mine: boolean;
  likes: like[];
  post: number;
  posted_time: string;
  usertags: usertag[];
}

export interface IFeedData {
  author: {
    avatar: string;
    first_name: string;
    last_name: string;
    pk: number;
    username: string;
  };
  caption: string;
  comments: IComments[];
  comments_count: number;
  created_at: string;
  hashtags: hashtag[];
  image: string;
  is_liked: boolean;
  is_saved: boolean;
  likes: like[];
  likes_count: number;
  location: string;
  pk: number;
  usertags: usertag[];
}

export interface IFeedMainData {
  pk: number;
  author: {
    avatar: string;
    first_name: string;
    last_name: string;
    pk: number;
    username: string;
  };
  image: string;
  is_liked: boolean;
  is_saved: boolean;
  likes_count: number;
  caption: string;
  created_at: string;
  comments_count: number;
  comments: IComments[];
}

export interface ICommentsProps {
  pk: number;
  author: {
    avatar: string;
    first_name: string;
    last_name: string;
    pk: number;
    username: string;
  };
  caption: string;
  comments_count: number;
  comments: IComments[];
}

export interface ICommentProps {
  postId?: number;
  pk?: number;
  author: string;
  caption: string;
  isMine?: boolean;
  avatar?: string;
}
export interface IDeleteComment {
  pk: number;
  postId: number;
}

export interface ICreateComment {
  content: string;
}

export interface ICreateCommnetVariables {
  content: string;
  pk: number;
}

export interface IPostsData {
  image: string;
  comments_count: number;
  likes_count: number;
  pk: number;
}

export interface IProfileData {
  username: string;
  avatar: string;
  bio: string;
  first_name: string;
  last_name: string;
  followers_count: number;
  following_count: number;
  is_me: boolean;
  is_following: boolean;
  last_name: string;
  pk: number;
  posts: IPostsData[];
  saved_posts: IPostsData[];
}

export interface IMordalDataComments {
  author: {
    avatar: string;
    pk: number;
    username: string;
  };
  content: string;
  id: number;
  is_mine: boolean;
  post: number;
  posted_time: string;
}
export interface IModalDataLikes {
  avatar: string;
  first_name: string;
  last_name: string;
  pk: number;
  username: string;
}

export interface IModalData {
  pk: number;
  author: {
    pk: number;
    avatar: string;
    first_name: string;
    last_name: string;
    username: string;
  };
  is_owner: boolean;
  caption: string;
  is_liked: boolean;
  is_saved: boolean;
  comments: IMordalDataComments[];
  comments_count: number;
  image: string;
  likes: IModalDataLikes[];
  likes_count: number;
  location: string;
}

export interface IModalCommentsData {
  pk: number;
  author: {
    first_name: string;
    last_name: string;
    avatar: string;
    pk: number;
    username: string;
  };
  avatar: string;
  caption: string;
  comments: IMordalDataComments[];
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
}

export interface IEditProfileForm {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
}
export interface IGetMePost {
  pk: number;
  comments_count: number;
  likes_count: number;
  image: string;
}

export interface IGetMe {
  avatar: string;
  bio: string;
  first_name: string;
  followers_count: number;
  following_count: number;
  is_following: boolean;
  is_me: boolean;
  last_name: string;
  pk: number;
  username: string;
  posts: IGetMePost[];
}

export interface ISideBar {
  avatar: string;
  bio: string;
  date_joined: string;
  email: string;
  first_name: string;
  last_login: string;
  last_name: string;
  username: string;
}

export interface IProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number | null;
}

export interface IHashtagsResult {
  name: string;
  pk: number;
}

export interface IUsersResult {
  avatar: string;
  first_name: stirng;
  last_name: string;
  pk: number;
  username: string;
}
export interface IHashtagRelatedPosts {
  comments_count: number;
  image: string;
  likes_count: number;
  pk: number;
}

export interface IHashtagData {
  name: string;
  pk: number;
  related_posts: IHashtagRelatedPosts[];
}

export interface IChangePassword {
  old_password: string;
  new_password: string;
  new_password_check: string;
}
export interface IChangePasswordVariables {
  old_password: string;
  new_password: string;
}
