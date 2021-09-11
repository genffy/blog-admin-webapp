
export interface Category {
  id: number;
  name: string;
  pathname: string;
  pid: number;
  post_cate: number;
}

export interface Tag {
  id: number;
  name: string;
  pathname: string;
  post_tag: number;
}

export interface DisplayUser {
  id: number;
  name: string;
  display_name: string;
}

export interface Page {
  create_time: string;
  id: number;
  is_public: number;
  pathname: string;
  status: number;
  title: string;
  update_time: string;
  user: DisplayUser;
  user_id: number;
}

// export interface User {
//   app_key: null | string;
//   app_secret: null | string;
//   comment_num: number;
//   create_time: string;
//   display_name: string;
//   email: string;
//   id: number; 
//   last_login_time: string;
//   name: string;
//   post_num: number;
//   status: number;
//   type: number;
// }


export interface CheckboxCategory extends Category {
  checked?: boolean;
}

export interface SharedLoading {
  category?: boolean;
  tag?: boolean;
  page?: boolean;
}

export interface SharedStore {
  getCategoryList$: Category[];
  getDefaultCategory$: string[];
  defaultCategory: string;
  categoryList: Category[];
  userList: User[];
  templateList: string[];
  pageList: Page[];
  tagList: Tag[];
  loading: SharedLoading;
  userInfo: User | {};
}

export interface User {
  id?: number;
  username?: string,
  password?: string,
  name?: string;
  display_name?: string;
  type?: number;
  email?: string;
  status?: number;
  create_time?: number;
  create_ip?: string;
  last_login_time?: number;
  last_login_ip?: string;
  app_key?: string | null;
  app_secret?: string | null;
  remember?: boolean;
}

export interface SystemInfo {
  config: any;
  count: {
      cates: number;
      comments: number;
      posts: number;
  };
  versions: {
      platform: string;
      nodeVersion: string;
      v8Version: string;
      mysqlVersion: string;
      thinkjsVersion: string;
      firekylinVersion: string;
      needUpdate: boolean | string;
  };
}

export interface BaseProps {
  sharedStore: SharedStore;
}