import { createContext, useContext } from 'react';

type PostContextType = {
  postUrl: string;
};

export const PostContext = createContext<PostContextType>({
  postUrl: '',
});

export const usePostContext = (): PostContextType => useContext(PostContext);
