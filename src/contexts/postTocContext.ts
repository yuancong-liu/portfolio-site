import { createContext, useContext } from 'react';

type PostTocContextType = {
  toc: boolean;
};

export const PostTocContext = createContext<PostTocContextType>({
  toc: false,
});

export const usePostTocContext = (): PostTocContextType =>
  useContext(PostTocContext);
